# BestBuyIncentives — Priority-13 / All-91 Revenue Release — LOCAL Build & Validation Report

Status: **Local assembly + QA COMPLETE.** No GitHub push, no branch, no production deploy.
All work is inside the recoverable Emergent workspace + local backup refs.

## 1. Inputs — SHA-256 verified against the manifest (all match)
| Package | SHA-256 | Result |
|---|---|---|
| Priority-13-Apache-Release.zip | e4cb845afe8de6ec58c2a3502fa0c981ba1c487de426ca21f78024cf3d1b0690 | MATCH |
| All-91-Apache-Overlay.zip | 0fe2f4276dad182ac56debfbfb80be3af2c736306bc792ca9caeb4a826a9c091 | MATCH |
| Reconstructed-React-Conversion-Patch.zip | f00ace6228c37f5ff4805aaae069bd0bf4bb4f800025264d12ffdbb8c10d0276 | MATCH |
| Bluehost-Consultation-API.zip | c3fb5fdc47503bac0215c750167d775d5604f084f43627d6b714ad7ea7e251d3 | MATCH |

## 2. Deliverable artifacts (local)
- `/app/static-site/` — finished hybrid site (86 MB, 96 HTML pages).
- `/app/deploy-private/` — cron worker + `PRIVATE_ENVIRONMENT.example` + API README + test harness (must live OUTSIDE `public_html`).
- Archives + hashes:
  - `BestBuyIncentives-static-site-DELIVERABLE.tgz` = `5af742bc36f979393d905edf908ad83ffcfd62cef4e045a082273dc58d368f98`
  - `BestBuyIncentives-deploy-private-DELIVERABLE.tgz` = `c46f944c78afc162df4df8a2ceb89000befcbc5f0445d67692ab7fbf9d781521`
- Machine-readable per-route report: `/app/_release/validation-report.json`
- Screenshots: `/app/_release/screenshots/` (home, article, vertical, contact, legal — desktop + mobile).

## 3. Architecture (per your decision A)
- **Primary site = 91 prebuilt static overlay pages** (own `assets/bbi-seo.css` + `bbi-conversion.js`), flat slug routes.
- **React retained ONLY for** `/contact` (interactive form + Calendly + attribution) and `/privacy` `/terms` `/compliance`.
- React source patch merged over the authoritative `src/` (it was a superset of prior local work). Prerender route list trimmed to the 4 retained routes (`frontend/scripts/routes.js`).
- Header/Footer on the retained React pages were re-pointed to **plain `<a>` hard-navigation** to valid routes (React Router would otherwise intercept clicks to overlay routes and 404 client-side).

## 4. Validation results — 95/95 routes, 0 issues
- 91 overlay routes + 4 React routes all return their own HTML file with: unique `<title>` (95 unique, **0 duplicates** — the old SPA homepage-shadow bug is gone), exactly **1 `<h1>`**, a `<link rel=canonical>`, a `/contact` CTA, the pixel, and approved terminology.
- Sitemap: 95 `<loc>` entries, **every one maps to a real file**.
- Legacy 301 redirect destinations: **all exist**.
- Playbook page exposes the PDF and `bbi-conversion.js` emits `resource_download`. PDF present at `/downloads/BestBuyIncentives_High-Ticket_Closing_Playbook.pdf`.

## 5. Audits
- **Web3Forms / secrets:** 0 references anywhere (incl. compiled JS bundle) — `web3forms`=0, endpoint=0, old key `43646412…`=0.
- **Prohibited legacy terms** (`free vacation`, `vacation incentive`, `vacation certificate`): **0** across all HTML.
- **Approved term** `discounted travel voucher`: present on all 95 pages.
- **Editorial-note leaks:** none. Fixed a real defect — 18 visible `Primary/Secondary CTA:` editorial labels on 8 industry/partner pages were converted into real `<a class="button">` CTAs (see `_release/assemble.py` step 10). Also checked: `Suggested internal links`, `Required tracking`, `Required child pages`, `Form fields`, `Thank-you state`, `Target keyword`, `Slug:`, `Meta description:` = 0.
- **Audience Lab pixel:** present in **all 96** HTML pages (92 overlay/404 injected by assembly + 4 React via `public/index.html`). **Suppressed during React prerender** — `frontend/scripts/prerender.js` line 59 aborts `idpixel.app` requests so no pageviews fire from the build container while the `<script>` still ships to real visitors.

## 6. Apache configuration (`static-site/.htaccess`)
- HTTPS + non-www canonical 301 kept.
- **No catch-all SPA rewrite.** Unknown paths have no physical file/dir → genuine Apache 404 → `ErrorDocument 404 /404.html` (`404.html` is `noindex,follow`). Verified locally that a random path has no backing file.
- Real files + route directories serve normally; extensionless canonical routes serve their `index.html` **without a redirect** (`DirectorySlash Off` + rule 3). Real API dir serves `index.php` without redirect (rule 4).
- 10 legacy 301s baked in (old `travel-incentives-vs-*` and `resources/*` slugs → new destinations; `sitemap_index.xml` → `sitemap.xml`).

## 7. First-party consultation API (packaged, NOT run)
- `static-site/api/consultation/index.php` + hidden `static-site/api/.htaccess` (Options -Indexes, header hardening).
- Cron worker `deploy-private/cron/process-consultation-queue.php` kept OUTSIDE public web root.
- Verified by source read (not executed): same-origin JSON POST ≤32 KB, requires matching `submission_id` + `Idempotency-Key`, honeypot + rate-limit + option/field/email/attribution validation, returns **202 only after a durable queue/CRM record exists**, idempotent replay returns the existing record, operational logs store only time+hash+state (**no PII**), CRM token stays server-side.

## 8. Gates that CANNOT be verified locally (require Bluehost — YOURS to run)
Local PHP/CRM/Apache are not available here, so these remain open and are **not claimed as passed**:
- Live PHP execution + durable record creation, idempotent replay dedupe, invalid/spam rejection, CRM delivery + retry cron, priority SLA timing, PII-free logs on the server.
- Live Apache 404 status code + 301 redirect behavior on the real host.
- Live contact submission end-to-end (`/api/consultation` only exists on Bluehost; on the Emergent preview the form cannot reach a backend — expected).

## 9. Recoverable backups / rollback refs
- git tag `pre-p13-local-HEAD`, git branch `backup/pre-p13-local` (both at pre-release HEAD).
- Tarballs in `/app/_release/backup/` (static-site, frontend/src, worktree).
- See `BLUEHOST_DEPLOY_CHECKLIST.md` (§ Rollback) and `GITHUB_RECONCILIATION.md`.

## 10. External dependency — NOT done locally
Newer GitHub blog posts have not been reconciled (no remote/credentials in this workspace). See `GITHUB_RECONCILIATION.md` for the exact remaining steps and where blog files insert.
