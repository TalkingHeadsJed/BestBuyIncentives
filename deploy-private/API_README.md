# Bluehost Consultation API

This is the Bluehost/PHP implementation of `deployment/consultation-api-openapi.json`.

## Deployment

1. Confirm the production Bluehost account supports PHP 8.1 or newer and `curl`.
2. Copy `api/` into the existing `public_html/api/` as an overlay.
3. Create a private directory outside `public_html`, owned by the site account and mode `0700`.
4. Configure the variables shown in `PRIVATE_ENVIRONMENT.example` through the hosting control panel or a private server configuration. Do not upload the example file or secrets into `public_html`.
5. Point `BBI_CRM_WEBHOOK_URL` to the approved CRM intake workflow. Without it, valid inquiries are durably queued and emailed but remain `retry_queue_created` until processed.
6. Verify PHP can write the private directory and send notification email.
7. Configure Bluehost cron to run `cron/process-consultation-queue.php` every five minutes with the same private environment. It retries pending CRM delivery with bounded exponential backoff.
8. Merge the React patch, build/prerender, and deploy the finished site output.
9. Run a controlled tagged submission. Require one queue/CRM record, one success event with the same `submission_id`, correct attribution, correct SLA, and no PII in analytics.

The guarded synthetic harness is `tests/runtime-acceptance.mjs`. Run it only on staging with `BBI_STAGING_ORIGIN=https://...` and `BBI_ALLOW_CONTROLLED_SUBMISSION=YES`. It exercises durable acceptance, idempotent replay, mismatched-key rejection, email validation, and honeypot rejection, then prints the exact manual CRM/log evidence still required.

## Security and operations

- The endpoint accepts only same-origin JSON POST requests up to 32 KB.
- It requires a matching body `submission_id` and `Idempotency-Key` header.
- It validates every select option, required field, field length, email, attribution timestamp, honeypot, and rate limit.
- It writes lead data only outside the document root with restrictive permissions.
- Operational logs contain only time, submission hash, and state—not contact PII.
- It returns success only after a durable queue file exists, even if email or CRM delivery is temporarily unavailable.
- The CRM webhook token remains server-side.

Local PHP is not installed in the Codex workspace, so production PHP lint/runtime acceptance remains required on Bluehost or in the authoritative build environment. Static contract validation is provided separately.

## POST /api/playbook-lead (gated High-Ticket Closing Playbook download)

Same first-party, same-origin, durable-acceptance pattern as /api/consultation, used to
gate the playbook PDF behind a business-email lead form.

- Request: JSON + header `Idempotency-Key: <submission_id>`. Required: first_name, last_name,
  work_email (BUSINESS email — free/personal domains rejected), company. Optional: role,
  phone, sales_team_size, sales_use_case. Plus honeypot `website_honeypot` (must be empty),
  `playbook_asset_id`, and full attribution (original/current utm, referrer, landing pages).
- Success: HTTP 202 `{accepted:true, submission_id, durable_state, asset_id, download_url}`.
  The client reveals the PDF ONLY on this durable 202.
- Errors: 400 (idempotency), 422 validation_failed(field_errors)/spam_rejected, 405
  method_not_allowed, 403 origin_rejected, 429 rate_limited, 503 delivery_unavailable.
- Idempotent: same submission_id ⇒ single stored record; replay returns 202 with same state.
- Durability: atomic record written to `$BBI_PRIVATE_STORAGE_DIR/playbook-leads/` OUTSIDE
  public_html; optional CRM webhook; retried by the cron.
- Cron: `*/5 * * * * php deploy-private/cron/process-playbook-queue.php`
- Env: BBI_PRIVATE_STORAGE_DIR, BBI_RATE_LIMIT_SECRET, BBI_SALES_NOTIFICATION_EMAIL,
  optional BBI_CRM_WEBHOOK_URL / BBI_CRM_WEBHOOK_TOKEN.
- Preview mirror: FastAPI `POST /api/playbook-lead` (Mongo `playbook_leads`) implements the
  identical contract for browser E2E testing in the Emergent preview.
