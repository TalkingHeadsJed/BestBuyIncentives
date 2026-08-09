from fastapi import FastAPI, APIRouter, HTTPException, Request
from fastapi.responses import JSONResponse
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import re
import json
import urllib.parse
import asyncio
import logging
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict, EmailStr
from typing import List, Optional
import uuid
from datetime import datetime, timezone

import resend

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Resend
RESEND_API_KEY = os.environ.get('RESEND_API_KEY', '')
SENDER_EMAIL = os.environ.get('SENDER_EMAIL', 'onboarding@resend.dev')
LEAD_RECIPIENT_EMAIL = os.environ.get('LEAD_RECIPIENT_EMAIL', 'sales@bestbuyincentives.com')
if RESEND_API_KEY and not RESEND_API_KEY.startswith('PLACEHOLDER'):
    resend.api_key = RESEND_API_KEY

app = FastAPI(title="BestBuyIncentives API")
api_router = APIRouter(prefix="/api")

logger = logging.getLogger(__name__)
logging.basicConfig(level=logging.INFO,
                    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s')


# ---------------- Models ----------------

class Lead(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    full_name: str
    email: EmailStr
    company: str
    role: Optional[str] = None
    phone: Optional[str] = None
    team_size: Optional[str] = None
    industry: Optional[str] = None
    avg_deal_size: Optional[str] = None
    message: Optional[str] = None
    source: Optional[str] = "website"
    created_at: str = Field(default_factory=lambda: datetime.now(timezone.utc).isoformat())


class LeadCreate(BaseModel):
    full_name: str
    email: EmailStr
    company: str
    role: Optional[str] = None
    phone: Optional[str] = None
    team_size: Optional[str] = None
    industry: Optional[str] = None
    avg_deal_size: Optional[str] = None
    message: Optional[str] = None
    source: Optional[str] = "website"


class NewsletterSignup(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    email: EmailStr
    created_at: str = Field(default_factory=lambda: datetime.now(timezone.utc).isoformat())


class NewsletterCreate(BaseModel):
    email: EmailStr


class ROIInput(BaseModel):
    reps: int = Field(ge=1, le=10000)
    avg_deal_size: float = Field(ge=0)
    monthly_deals_per_rep: float = Field(ge=0)
    current_close_rate: float = Field(ge=0, le=100)
    uplift_pct: float = Field(default=22, ge=0, le=100)


# ---------------- Email helper ----------------

def _email_enabled() -> bool:
    return bool(RESEND_API_KEY) and not RESEND_API_KEY.startswith('PLACEHOLDER')


async def _send_email(to: str, subject: str, html: str) -> Optional[str]:
    if not _email_enabled():
        logger.info("Email skipped (placeholder key). To=%s Subject=%s", to, subject)
        return None
    try:
        params = {"from": SENDER_EMAIL, "to": [to], "subject": subject, "html": html}
        result = await asyncio.to_thread(resend.Emails.send, params)
        return result.get("id") if isinstance(result, dict) else None
    except Exception as e:  # don't break the form for an email error
        logger.exception("Resend send failed: %s", e)
        return None


def _lead_email_html(lead: Lead) -> str:
    rows = [
        ("Name", lead.full_name),
        ("Email", lead.email),
        ("Company", lead.company),
        ("Role", lead.role or "—"),
        ("Phone", lead.phone or "—"),
        ("Team Size", lead.team_size or "—"),
        ("Industry", lead.industry or "—"),
        ("Avg. Deal Size", lead.avg_deal_size or "—"),
        ("Source", lead.source or "website"),
    ]
    body = "".join(
        f'<tr><td style="padding:8px 12px;border-bottom:1px solid #eee;font-weight:600;width:200px">{k}</td>'
        f'<td style="padding:8px 12px;border-bottom:1px solid #eee">{v}</td></tr>' for k, v in rows
    )
    msg = (lead.message or "").replace("\n", "<br>")
    return f"""
    <div style="font-family:Arial,sans-serif;max-width:640px;margin:auto">
      <h2 style="color:#0A0F17">New Lead — BestBuyIncentives.com</h2>
      <table style="border-collapse:collapse;width:100%;background:#fafafa;border:1px solid #eee">{body}</table>
      <h3 style="margin-top:24px">Message</h3>
      <div style="white-space:pre-wrap;background:#fff;border:1px solid #eee;padding:12px">{msg or '—'}</div>
    </div>
    """


def _autoreply_html(name: str) -> str:
    first = (name.split(' ')[0] if name else "there")
    return f"""
    <div style="font-family:Arial,sans-serif;max-width:640px;margin:auto">
      <h2>Thanks, {first}.</h2>
      <p>Your request to learn how vacation incentives can lift your team's close rate has been received.</p>
      <p>A senior sales consultant will reach out within 1 business day with program pricing, sample certificates, and a customized ROI scenario for your team.</p>
      <p style="margin-top:24px">— The BestBuyIncentives Team</p>
    </div>
    """


# ---------------- Routes ----------------

@api_router.get("/")
async def root():
    return {"message": "BestBuyIncentives API", "ok": True}


@api_router.get("/health")
async def health():
    return {"status": "ok", "email_enabled": _email_enabled()}


@api_router.post("/leads", response_model=Lead)
async def create_lead(payload: LeadCreate):
    lead = Lead(**payload.model_dump())
    await db.leads.insert_one(lead.model_dump())

    # fire-and-forget emails (sequential, but don't fail the request on email errors)
    await _send_email(LEAD_RECIPIENT_EMAIL, f"New Lead: {lead.full_name} — {lead.company}", _lead_email_html(lead))
    await _send_email(lead.email, "We received your request — BestBuyIncentives", _autoreply_html(lead.full_name))

    return lead


@api_router.get("/leads", response_model=List[Lead])
async def list_leads():
    docs = await db.leads.find({}, {"_id": 0}).sort("created_at", -1).to_list(500)
    return [Lead(**d) for d in docs]


@api_router.post("/newsletter", response_model=NewsletterSignup)
async def newsletter_signup(payload: NewsletterCreate):
    # de-dup
    existing = await db.newsletter.find_one({"email": payload.email}, {"_id": 0})
    if existing:
        return NewsletterSignup(**existing)
    signup = NewsletterSignup(email=payload.email)
    await db.newsletter.insert_one(signup.model_dump())
    return signup


@api_router.post("/roi/calculate")
async def calculate_roi(payload: ROIInput):
    monthly_deals = payload.reps * payload.monthly_deals_per_rep
    current_closed = monthly_deals * (payload.current_close_rate / 100.0)
    new_close_rate = min(payload.current_close_rate * (1 + payload.uplift_pct / 100.0), 100.0)
    new_closed = monthly_deals * (new_close_rate / 100.0)
    added_deals = new_closed - current_closed
    monthly_added_revenue = added_deals * payload.avg_deal_size
    annual_added_revenue = monthly_added_revenue * 12
    return {
        "monthly_deals": round(monthly_deals, 1),
        "current_closed_per_month": round(current_closed, 1),
        "new_close_rate": round(new_close_rate, 1),
        "new_closed_per_month": round(new_closed, 1),
        "added_deals_per_month": round(added_deals, 1),
        "monthly_added_revenue": round(monthly_added_revenue, 2),
        "annual_added_revenue": round(annual_added_revenue, 2),
    }


# ---------------- Playbook gated download (lead-gen) ----------------
# First-party, same-origin endpoint mirroring the Bluehost PHP contract so the
# gated download works in preview. Durable acceptance (Mongo) BEFORE the client
# reveals the PDF; idempotent on submission_id; business-email required.

import urllib.request as _urlreq

FREE_EMAIL_DOMAINS = {
    "gmail.com", "googlemail.com", "yahoo.com", "ymail.com", "rocketmail.com",
    "hotmail.com", "hotmail.co.uk", "outlook.com", "live.com", "msn.com",
    "aol.com", "icloud.com", "me.com", "mac.com", "protonmail.com", "proton.me",
    "pm.me", "gmx.com", "gmx.net", "mail.com", "yandex.com", "zoho.com",
    "hey.com", "fastmail.com", "tutanota.com", "hushmail.com",
}
_ALLOWED_ORIGIN_HOSTS = {"bestbuyincentives.com", "www.bestbuyincentives.com"}
_PLAYBOOK_DOWNLOAD_URL = "/downloads/BestBuyIncentives_High-Ticket_Closing_Playbook.pdf"
_TEAM_SIZES = {"", "1", "2–5", "6–20", "21–50", "51+"}
_USE_CASES = {
    "", "Close qualified deals faster", "Increase close rate",
    "Create urgency without deeper discounting", "Re-engage stalled opportunities",
    "Equip a sales team with a closing tool", "Other",
}


def _is_business_email(email: str) -> bool:
    value = (email or "").strip().lower()
    m = re.fullmatch(r"[^\s@]+@([^\s@]+\.[^\s@]+)", value)
    if not m:
        return False
    domain = m.group(1)
    if domain in FREE_EMAIL_DOMAINS:
        return False
    return not any(domain.endswith("." + d) for d in FREE_EMAIL_DOMAINS)


def _clean(value, max_len: int) -> str:
    if not isinstance(value, str):
        return ""
    value = re.sub(r"[\x00-\x08\x0B\x0C\x0E-\x1F\x7F<>]", "", value)
    return value.strip()[:max_len]


def _err(status: int, code: str, message: str, retryable: bool, field_errors=None):
    body = {"accepted": False, "error_code": code, "message": message, "retryable": retryable}
    if field_errors:
        body["field_errors"] = field_errors
    return JSONResponse(status_code=status, content=body)


async def _deliver_to_crm(record: dict) -> str:
    """Attempt CRM webhook; return durable_state. Never raises."""
    webhook = os.environ.get("BBI_CRM_WEBHOOK_URL", "").strip()
    if not webhook:
        return "retry_queue_created"
    try:
        headers = {"Content-Type": "application/json", "Idempotency-Key": record["submission_id"]}
        token = os.environ.get("BBI_CRM_WEBHOOK_TOKEN", "").strip()
        if token:
            headers["Authorization"] = f"Bearer {token}"
        req = _urlreq.Request(webhook, data=json.dumps(record).encode("utf-8"), headers=headers, method="POST")
        code = await asyncio.to_thread(lambda: _urlreq.urlopen(req, timeout=5).getcode())
        return "crm_created" if 200 <= int(code) < 300 else "retry_queue_created"
    except Exception as e:  # durable queue already exists; cron/retry will re-attempt
        logger.warning("Playbook CRM webhook failed: %s", e)
        return "retry_queue_created"


@api_router.post("/playbook-lead")
async def playbook_lead(request: Request):
    # Same-origin guard: enforce only when an Origin header is present. Recognise
    # same-origin robustly by comparing the Origin host to the proxy-forwarded
    # host (ingress may rewrite the preview subdomain), so this never silently
    # blocks lead capture across preview rebrands.
    origin = request.headers.get("origin", "")
    if origin:
        host = (urllib.parse.urlparse(origin).hostname or "").lower()
        fwd = (request.headers.get("x-forwarded-host") or request.headers.get("host") or "")
        fwd_host = fwd.split(",")[0].strip().split(":")[0].lower()
        allowed = (
            host in _ALLOWED_ORIGIN_HOSTS
            or (fwd_host and host == fwd_host)
            or host.endswith(".preview.emergentagent.com")
            or host.endswith(".preview.emergentcf.cloud")
            or host in ("localhost", "127.0.0.1")
        )
        if not allowed:
            return _err(403, "origin_rejected", "Origin rejected.", False)

    raw = await request.body()
    if len(raw) > 32768:
        return _err(413, "validation_failed", "Request size is invalid.", False)
    try:
        data = json.loads(raw or b"{}")
    except Exception:
        return _err(400, "validation_failed", "Invalid JSON.", False)
    if not isinstance(data, dict):
        return _err(400, "validation_failed", "Invalid request.", False)

    submission_id = _clean(data.get("submission_id"), 100)
    idem = request.headers.get("idempotency-key", "")
    if not re.fullmatch(r"[A-Za-z0-9][A-Za-z0-9._:-]{15,99}", submission_id) or submission_id != idem:
        return _err(400, "validation_failed", "Idempotency key is missing or invalid.", False)

    if _clean(data.get("website_honeypot"), 100) != "":
        return _err(422, "spam_rejected", "Request rejected.", False)

    contact = {
        "first_name": _clean(data.get("first_name"), 80),
        "last_name": _clean(data.get("last_name"), 80),
        "work_email": _clean(data.get("work_email"), 254),
        "company": _clean(data.get("company"), 160),
        "role": _clean(data.get("role"), 120),
        "phone": _clean(data.get("phone"), 40),
        "sales_team_size": _clean(data.get("sales_team_size"), 20),
        "sales_use_case": _clean(data.get("sales_use_case"), 120),
    }
    asset_id = _clean(data.get("playbook_asset_id"), 80) or "high-ticket-closing-playbook"

    field_errors = {}
    for f in ("first_name", "last_name", "company", "work_email"):
        if not contact[f]:
            field_errors[f] = "Required."
    if contact["work_email"] and not _is_business_email(contact["work_email"]):
        field_errors["work_email"] = "Enter a valid business email (no personal inboxes)."
    if contact["sales_team_size"] and contact["sales_team_size"] not in _TEAM_SIZES:
        field_errors["sales_team_size"] = "Select a valid option."
    if contact["sales_use_case"] and contact["sales_use_case"] not in _USE_CASES:
        field_errors["sales_use_case"] = "Select a valid option."
    if field_errors:
        return _err(422, "validation_failed", "Complete the required fields.", False, field_errors)

    attribution_fields = [
        "original_landing_page", "original_referrer", "original_source", "original_medium",
        "original_campaign", "original_content", "original_term", "first_seen_at",
        "converting_page", "converting_referrer", "latest_source", "latest_medium",
        "latest_campaign", "latest_content", "latest_term", "page_type", "conversion_method",
    ]
    attribution = {f: _clean(data.get(f), 2048 if ("page" in f or "referrer" in f) else 300) for f in attribution_fields}

    # Idempotent durable acceptance.
    existing = await db.playbook_leads.find_one({"submission_id": submission_id}, {"_id": 0})
    if existing:
        return JSONResponse(status_code=202, content={
            "accepted": True, "submission_id": submission_id,
            "durable_state": existing.get("durable_state", "retry_queue_created"),
            "asset_id": existing.get("asset_id", asset_id),
            "download_url": _PLAYBOOK_DOWNLOAD_URL,
        })

    record = {
        "schema_version": "1.0.0",
        "submission_id": submission_id,
        "lead_type": "playbook_gated_download",
        "asset_id": asset_id,
        "qualification_status": "new",
        "durable_state": "retry_queue_created",
        "lead_created_at": datetime.now(timezone.utc).isoformat(),
        "contact": contact,
        "attribution": attribution,
        "delivery": {"crm_attempts": 0, "crm_delivered_at": None, "last_error_code": None},
    }
    try:
        await db.playbook_leads.insert_one({**record})
    except Exception as e:
        logger.exception("Playbook durable store failed: %s", e)
        return _err(503, "delivery_unavailable", "Request could not be stored.", True)

    durable_state = await _deliver_to_crm(record)
    if durable_state != record["durable_state"]:
        await db.playbook_leads.update_one({"submission_id": submission_id}, {"$set": {
            "durable_state": durable_state,
            "delivery.crm_attempts": 1,
            "delivery.crm_delivered_at": datetime.now(timezone.utc).isoformat(),
        }})

    return JSONResponse(status_code=202, content={
        "accepted": True, "submission_id": submission_id,
        "durable_state": durable_state, "asset_id": asset_id,
        "download_url": _PLAYBOOK_DOWNLOAD_URL,
    })


@api_router.api_route("/playbook-lead", methods=["GET", "PUT", "PATCH", "DELETE"])
async def playbook_lead_method_not_allowed():
    return _err(405, "method_not_allowed", "Use POST.", False)


app.include_router(api_router)
app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event("startup")
async def _ensure_indexes():
    try:
        await db.playbook_leads.create_index("submission_id", unique=True)
    except Exception as e:
        logger.warning("playbook_leads index ensure failed: %s", e)


@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
