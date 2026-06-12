"""BestBuyIncentives backend API tests."""
import os
import pytest
import requests

BASE_URL = os.environ.get("REACT_APP_BACKEND_URL")
if not BASE_URL:
    # Fallback to reading the frontend .env file
    env_path = "/app/frontend/.env"
    if os.path.exists(env_path):
        with open(env_path) as f:
            for line in f:
                if line.startswith("REACT_APP_BACKEND_URL="):
                    BASE_URL = line.split("=", 1)[1].strip().strip('"')
                    break

assert BASE_URL, "REACT_APP_BACKEND_URL must be set"
BASE_URL = BASE_URL.rstrip("/")
API = f"{BASE_URL}/api"


@pytest.fixture(scope="module")
def session():
    s = requests.Session()
    s.headers.update({"Content-Type": "application/json"})
    return s


# ---- Health ----
class TestHealth:
    def test_root(self, session):
        r = session.get(f"{API}/")
        assert r.status_code == 200, r.text
        data = r.json()
        assert data.get("ok") is True
        assert "BestBuyIncentives" in data.get("message", "")

    def test_health_email_disabled(self, session):
        r = session.get(f"{API}/health")
        assert r.status_code == 200, r.text
        data = r.json()
        assert data["status"] == "ok"
        assert data["email_enabled"] is False  # placeholder key


# ---- Leads ----
class TestLeads:
    def test_create_lead_full_payload(self, session):
        payload = {
            "full_name": "TEST Jane Doe",
            "email": "test_jane@example.com",
            "company": "TEST Acme Motors",
            "role": "VP Sales",
            "phone": "555-555-1212",
            "team_size": "10-25",
            "industry": "Auto",
            "avg_deal_size": "$10K",
            "message": "Interested in incentives.",
            "source": "website-test",
        }
        r = session.post(f"{API}/leads", json=payload)
        assert r.status_code == 200, r.text
        lead = r.json()
        assert lead["full_name"] == payload["full_name"]
        assert lead["email"] == payload["email"]
        assert lead["company"] == payload["company"]
        assert lead["role"] == payload["role"]
        assert "id" in lead and isinstance(lead["id"], str) and len(lead["id"]) > 0
        assert "created_at" in lead

        # Verify persistence via GET /api/leads
        r2 = session.get(f"{API}/leads")
        assert r2.status_code == 200
        leads = r2.json()
        assert any(l["id"] == lead["id"] for l in leads), "Created lead not found in list"

    def test_create_lead_minimal_payload(self, session):
        payload = {
            "full_name": "TEST Minimal",
            "email": "test_minimal@example.com",
            "company": "TEST Min Co",
        }
        r = session.post(f"{API}/leads", json=payload)
        assert r.status_code == 200, r.text
        lead = r.json()
        assert lead["full_name"] == payload["full_name"]
        assert lead["source"] == "website"  # default

    def test_create_lead_invalid_email(self, session):
        payload = {
            "full_name": "TEST Bad",
            "email": "not-an-email",
            "company": "TEST Bad Co",
        }
        r = session.post(f"{API}/leads", json=payload)
        assert r.status_code == 422, r.text


# ---- Newsletter ----
class TestNewsletter:
    def test_newsletter_valid_and_idempotent(self, session):
        email = "test_newsletter_dedupe@example.com"
        r1 = session.post(f"{API}/newsletter", json={"email": email})
        assert r1.status_code == 200, r1.text
        d1 = r1.json()
        assert d1["email"] == email
        assert "id" in d1

        r2 = session.post(f"{API}/newsletter", json={"email": email})
        assert r2.status_code == 200
        d2 = r2.json()
        # Idempotent: same id returned
        assert d2["id"] == d1["id"], "Newsletter signup should be idempotent"

    def test_newsletter_invalid_email(self, session):
        r = session.post(f"{API}/newsletter", json={"email": "nope"})
        assert r.status_code == 422


# ---- ROI ----
class TestROI:
    def test_roi_calculation_math(self, session):
        payload = {
            "reps": 12,
            "avg_deal_size": 8500,
            "monthly_deals_per_rep": 8,
            "current_close_rate": 28,
            "uplift_pct": 22,
        }
        r = session.post(f"{API}/roi/calculate", json=payload)
        assert r.status_code == 200, r.text
        d = r.json()
        # monthly_deals = 96
        assert abs(d["monthly_deals"] - 96) < 0.5
        # current_closed = 26.88
        assert abs(d["current_closed_per_month"] - 26.88) <= 0.3
        # new_close_rate ~ 34.16
        assert abs(d["new_close_rate"] - 34.16) <= 0.3
        # new_closed ~ 32.79
        assert abs(d["new_closed_per_month"] - 32.79) <= 0.3
        # monthly_added_revenue ~ 50,235 (1% tolerance)
        assert abs(d["monthly_added_revenue"] - 50235) / 50235 <= 0.01
        # annual_added_revenue ~ 602,820 (1% tolerance)
        assert abs(d["annual_added_revenue"] - 602820) / 602820 <= 0.01

    def test_roi_invalid_input(self, session):
        r = session.post(f"{API}/roi/calculate", json={
            "reps": 0,  # below ge=1
            "avg_deal_size": 100,
            "monthly_deals_per_rep": 5,
            "current_close_rate": 25,
        })
        assert r.status_code == 422
