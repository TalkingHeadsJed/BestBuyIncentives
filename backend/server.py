from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
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


app.include_router(api_router)
app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
