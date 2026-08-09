# Playbook Gated Lead-Gen Download — Implementation Report (2026-08-09)

Scope: convert the High-Ticket Closing Playbook page into a lead-generating GATED
download. A valid **business email** (+ name + company) is required before the PDF
download link is revealed. A first-party, same-origin endpoint durably accepts the lead
(idempotent, attribution-preserving) BEFORE the download shows. Privacy-safe analytics fire
in a strict order. Restored black/yellow design and all existing pages preserved. No GitHub
op. Not deployed.

**Deliverable:** `/app/original-site/` (**117** pre-rendered pages + PHP `/api` + `/downloads`)
**Archive:** `/app/_release/BestBuyIncentives-ORIGINAL-DESIGN-DELIVERABLE.tgz`
**SHA-256:** `a5df74a3089bbe9285bdcd2471f6f24ea7e1c059039c1005d448fae9f065b0a6` (~99 MB, 117 index.html)

---

## 1. Exact API contract — `POST /api/playbook-lead` (first-party, same-origin)

Request headers: `Content-Type: application/json`, `Idempotency-Key: <submission_id>`
Request body (JSON):
```
submission_id            string  required, ^[A-Za-z0-9][A-Za-z0-9._:-]{15,99}$, must equal Idempotency-Key
first_name               string  required
last_name                string  required
work_email               string  required, must be a business email (free/personal domains rejected)
company                  string  required
role                     string  optional
phone                    string  optional
sales_team_size          enum    optional ["","1","2–5","6–20","21–50","51+"]
sales_use_case           enum    optional (fixed list)
playbook_asset_id        string  e.g. "high-ticket-closing-playbook"
website_honeypot         string  must be empty (spam trap)
# attribution (preserved verbatim):
original_landing_page, original_referrer, original_source, original_medium,
original_campaign, original_content, original_term, first_seen_at,
converting_page, converting_referrer, latest_source, latest_medium,
latest_campaign, latest_content, latest_term, page_type, conversion_method
```

Responses (clearly distinguished success / validation / server):
| Status | error_code | retryable | Meaning |
|---|---|---|---|
| **202** | — | — | `{accepted:true, submission_id, durable_state:"crm_created"\|"retry_queue_created", asset_id, download_url}` — DURABLE acceptance; client may now reveal download |
| 400 | validation_failed | false | invalid JSON / missing-or-mismatched Idempotency-Key |
| 413 | validation_failed | false | body too large (>32 KB) |
| 422 | validation_failed | false | missing/invalid fields → includes `field_errors{}`; non-business email → `field_errors.work_email` |
| 422 | spam_rejected | false | honeypot filled |
| 405 | method_not_allowed | false | non-POST |
| 429 | rate_limited | true | >15 requests / 15 min per IP (PHP) |
| 403 | origin_rejected | false | cross-origin request |
| 503 | delivery_unavailable | true | durable storage/config failure (retry) |

Idempotency: a replay with the same `submission_id` returns **202** with the same
`durable_state` and creates **no duplicate** (verified: 1 record after replay).

Client rule (frontend): reveal the download ONLY when `status===202 && accepted===true &&
submission_id` matches. Any other outcome keeps the gate closed.

## 2. Two implementations of the same contract

- **Preview (testable now):** FastAPI route in `backend/server.py`. Durable store =
  Mongo `playbook_leads` (unique index on `submission_id`); optional CRM webhook
  (`BBI_CRM_WEBHOOK_URL`), else `retry_queue_created`. Same-origin guard recognises the
  request's forwarded host and the Emergent preview suffixes.
- **Production (Bluehost):** `original-site/api/playbook-lead/index.php` — mirrors the proven
  consultation endpoint: origin/method/size guards, HMAC rate-limit, honeypot, atomic
  `fopen('x')` durable record OUTSIDE public_html, sales email, optional CRM webhook, and a
  **5-min retry cron** `deploy-private/cron/process-playbook-queue.php`.

## 3. CRM field mapping (record written / pushed to CRM)

```
lead_type            = "playbook_gated_download"
asset_id             ← playbook_asset_id
qualification_status = "new"
durable_state        = crm_created | retry_queue_created
lead_created_at      = ISO-8601 UTC
contact.first_name   ← first_name
contact.last_name    ← last_name
contact.work_email   ← work_email      (business email)
contact.company      ← company
contact.role         ← role
contact.phone        ← phone
contact.sales_team_size ← sales_team_size
contact.sales_use_case  ← sales_use_case
attribution.*        ← original_*/converting_*/latest_*/first_seen_at/page_type/conversion_method
delivery.crm_attempts / crm_delivered_at / last_error_code
```

## 4. Analytics events (privacy-safe, dataLayer via pushAnalytics — NO PII)

| Event | When | Non-PII params |
|---|---|---|
| `playbook_form_start` | first interaction/submit (once) | page_path, playbook_asset_id |
| `playbook_form_error` | client validation OR server error | page_path, playbook_asset_id, error_code, error_type |
| `playbook_lead_accepted` | ONLY after durable 202 | page_path, playbook_asset_id, durable_state, submission_id |
| `playbook_download_click` | click on revealed PDF link | page_path, playbook_asset_id, submission_id |

`accepted`/`download_click` are never fired before durable success. Verified: dataLayer
contains no email / company / name values.

## 5. Inbound links (not orphaned) + registration

- Hub `/articles/sales-closing` (resource link), commercial pages `/sales-closing-incentives`
  and `/high-ticket-sales-incentives` (proof links), and **6 articles** (contextual body
  links). Registered in `seoPages.json` (commercial), routes.js, prerender, sitemap (117),
  schema (WebPage + BreadcrumbList), related-link eligibility. `App.js` maps the path to
  `PlaybookLanding`.

## 6. Consent / privacy

Concise consent line under the form (`data-testid=playbook-consent`) linking to `/privacy`.
No disclaimer-heavy copy.

## 7. Gates (all pass — 117 routes)

- `validate-articles.js` → **ALL VALIDATION CHECKS PASSED** (unique titles/canonicals, one
  H1, JSON-LD, zero broken links, sitemap 117/117, zero banned wording, zero orphans).
- `hydration-articles.js` → **ALL 117 CLEAN** (0 React #418 / 0 console errors), incl. the
  gated page. (Fixed a `{" "}`/adjacent-node #418 in the consent line and an entity double-escape.)
- True-404: `.htaccess ErrorDocument 404 /404.html`, `/404.html` is `noindex,follow`, no
  catch-all-to-home.
- Backend contract (curl + testing agent): 202 / 422(field_errors) / 422(spam) / 405 /
  400 / 403 / no-origin-202 / idempotent-replay all verified. PDF resolves `200 application/pdf`.
- Frontend (testing agent, iteration_7): gated render (desktop+mobile), client validation,
  business-email enforcement, happy-path 202 → reveal, analytics order + PII scrub, consent
  link, regression pages — 100%.

## 8. Changed files

Frontend:
- `src/pages/PlaybookLanding.jsx` (NEW) — gated landing (hero/sections/gate/proof/CTAs, schema)
- `src/components/site/PlaybookGate.jsx` (NEW) — form, validation, submit, events, reveal
- `src/lib/playbookClient.js` (NEW) — business-email denylist + payload builder
- `src/lib/api.js` — `submitPlaybookLead` (+ attach `field_errors` to errors)
- `src/App.js` — route `/high-ticket-closing-playbook` → `PlaybookLanding`
- `src/data/seoPages.json` — 2nd commercial inbound link (`/high-ticket-sales-incentives`)

Backend / production:
- `backend/server.py` — `POST /api/playbook-lead` (+ 405 handler, robust same-origin guard,
  startup unique index; removed a duplicate `include_router`)
- `original-site/api/playbook-lead/index.php` (NEW) — production endpoint
- `deploy-private/cron/process-playbook-queue.php` (NEW) — retry worker

Release/docs:
- `original-site/**` regenerated (117); `DEPLOY_THIS_ORIGINAL_SITE.txt` (hash + new API + cron);
  this report.

## 9. Deployment notes (Bluehost — NOT deployed here)

1. Upload `original-site/*` to `public_html/` (keep hidden `.htaccess`, `404.html`, `api/.htaccess`).
2. Set env OUTSIDE public_html: `BBI_PRIVATE_STORAGE_DIR` (chmod 700), `BBI_RATE_LIMIT_SECRET`
   (≥32 chars), `BBI_SALES_NOTIFICATION_EMAIL`, optional `BBI_CRM_WEBHOOK_URL`/`_TOKEN`.
3. Add both 5-min crons (`process-consultation-queue.php`, `process-playbook-queue.php`).
4. The PDF at `/downloads/BestBuyIncentives_High-Ticket_Closing_Playbook.pdf` is served
   statically; the gate captures the lead in front of it (standard gated-content UX).
5. No Web3Forms, no exposed keys; endpoint is same-origin `/api/playbook-lead`.
