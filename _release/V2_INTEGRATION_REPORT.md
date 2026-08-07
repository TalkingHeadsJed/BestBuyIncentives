# SALES-FIRST V2 — Local Integration & Validation Report (2026-08-06 package)

Status: **LOCAL integration + QA COMPLETE.** No Save to GitHub, no push, no publish, no deploy.
GitHub reconciliation NOT claimed (remote blog/other updates remain unproven in this workspace — boundary preserved).

## 1. Input verification
- `BestBuyIncentives-All-91-SALES-FIRST-V2-2026-08-06.zip`
- Expected SHA-256 `7B04A42D8DCF6B77E7D3D8D4909C6B1BD05CE1C90D5B063510286E4E67B43BCF`
- Computed  SHA-256 `7b04a42d8dcf6b77e7d3d8d4909c6b1bd05ce1c90d5b063510286e4e67b43bcf` → **MATCH ✓** (335,690 bytes)
- Superseded `...Sales-Forward-Republish...zip` was NOT used.

## 2. Backups (recoverable)
- `/app/_release/backup/static-site-pre-v2-1786079831.tgz`
- git tag `pre-v2-local-HEAD`, git branch `backup/pre-v2-local` (plus earlier `pre-p13-*` refs).

## 3. Route inventory (before → after)
- Current overlay routes: 91. V2 routes: 91.
- **Added: 0. Removed: 0. Replaced (content in place): 91/91** — identical slug set, so this is a pure content republish.

## 4. What was integrated
- Swapped the overlay source in the one-step assembly (`_release/assemble.py` `OVERLAY = _release/v2`) and rebuilt.
- V2 sales-first article HTML/content, metadata, internal links, JSON-LD schema, sitemap, `assets/bbi-seo.css` + `bbi-conversion.js`, and downloads integrated.
- New/updated downloads shipped: `..._Discounted-Travel-Voucher_One-Page-Guide.pdf`, `..._Revenue_Dashboard.xlsx`, `..._Sales-Team_Training-Script.txt` (+ existing Closing Playbook PDF).
- Exactly **2 improved meta descriptions** vs the prior overlay (matches handoff): `/evaluate-discounted-travel-voucher`, `/explain-discounted-travel-voucher-to-customer`.

## 5. Preserved (unchanged by this pass) — explicit report
- **React routes NOT part of the 91-page overlay:** `/contact`, `/privacy`, `/terms`, `/compliance` — all present.
- First-party `/api/consultation` PHP package + hidden `api/.htaccess` — present.
- Audience Lab pixel — present in **all 96** HTML pages; still suppressed during React prerender (`prerender.js` aborts `idpixel.app`).
- Genuine Apache 404 (`.htaccess`, no SPA fallback; `404.html` `noindex,follow`), 10 legacy 301 redirects (V2 redirects file is byte-identical to prior), dir-serve rules — preserved.
- Navigation/footer corrections on React pages (plain hard-nav `<a>`, valid routes only) — preserved.
- `images/` (81 MB) and all existing assets — preserved.
- **Videos:** untouched. No video files exist in the assembled site or were modified; V2 excluded `VSL_STUDIO_PRO_SCRIPTS/` and `## Video transcript` sections. No reshoot required.

## 6. Full QA — 95/95 routes, 0 issues (`_release/validation-report.json`)
- 91 overlay + 4 React routes each: own HTML, unique `<title>` (95 unique, 0 dupes), exactly 1 `<h1>`, canonical, `/contact` CTA, pixel, approved terminology.
- JSON-LD schema present on sampled pages; sitemap 95 locs all resolve; legacy 301 targets all exist; playbook PDF present + linked + `resource_download` wired.
- Genuine 404 verified (random path has no backing file); `404.html` is `noindex,follow`.
- Responsive render check (Chrome, desktop 1440 + mobile 390): home, article, vertical — **0 page errors**; leaked CTA labels confirmed rendered as real buttons.

## 7. Sales-content gate — 91/91 PASS (`_release/sales-content-audit.json`)
Audited all 91 overlay pages (superset of the 72 articles):
- product term "discounted travel voucher" present: **91/91**
- positive commercial-benefit bridge present: **91/91**
- consultation path (`/contact` link): **91/91**
- prohibited terms (`free vacation` / `vacation incentive` / `vacation certificate`): **0 pages**
Objection language present only in a constructive, offer-favorable frame (no prohibited terminology; benefit bridge + consultation path on every page).

## 8. Terminology / credential audits
- Web3Forms / old access key / endpoint: **0** everywhere (incl. compiled JS).
- Prohibited legacy terms: **0**. Approved "discounted travel voucher": all pages.
- Editorial-note leaks: 18 `Primary/Secondary CTA:` labels on 8 pages (present in V2 too) auto-converted to real `<a class="button">` by assembly step 10; post-build count = 0.

## 9. Deliverable artifacts + hashes
- Site: `/app/static-site` (96 HTML pages).
- Archive `BestBuyIncentives-static-site-V2-DELIVERABLE.tgz` = `37088148ca6d9dbfbd5ccbddc980779456a887e741f4d104f2ea48f40a0f52b5`
- `deploy-private/` (cron + env template) unchanged from Priority-13 packaging.
- Reports: this file, `validation-report.json`, `sales-content-audit.json`; screenshots `v2-*` in `_release/screenshots/`.

## 10. Conflicts
- None. 1:1 slug replacement; shared infra files (`sitemap.xml`, `.htaccess`, redirects) reconciled additively by the assembly.

## 11. NOT done (by instruction / capability)
- No Save to GitHub, no push, no publish, no deploy.
- GitHub remote reconciliation NOT performed (no remote/credentials here); the remote's newer updates remain unverified locally — see `GITHUB_RECONCILIATION.md`.
- Bluehost live gates (PHP/CRM/idempotency/spam/retry/SLA/PII, live Apache 404/301) remain open — see `BLUEHOST_DEPLOY_CHECKLIST.md`.
