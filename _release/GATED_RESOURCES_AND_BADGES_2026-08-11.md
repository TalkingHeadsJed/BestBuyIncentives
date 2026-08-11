# Play Badges + 3 More Gated Resources — Implementation Report (2026-08-11)

Two revenue/UX upgrades. Restored black/yellow design and all existing pages preserved.
No GitHub op. Not deployed.

**Deliverable:** `/app/original-site/` (**120** pages + PHP `/api` + `/downloads` [4 assets])
**Archive SHA-256:** `c096d15d01b029408a85b46938b29bfc7e8faf8d25a895cc241e58535033e364` (~99 MB, 120 index.html)
**Prev SHA-256:** `2619f26c1891bbcb36b3b6acd18c7911d449572c5ed2237d80be3e49754dea9d`

## 1. Play badge on video article cards
- Article cards that have a `video` now show a yellow "▶ VIDEO" pill.
- `Articles.jsx` `ArticleCard` and `SeoPages.jsx` `Hub` child cards both badge on `a.video`
  (`data-testid=article-video-badge-<slug>`). Non-video cards are unchanged.

## 2. Three more gated lead-gen downloads (same pattern as the playbook)
New gated pages (each requires a valid business email before the download is revealed, via the
same durable `POST /api/playbook-lead` contract; 120 routes total):

| Route | Asset (asset_id) | File |
|---|---|---|
| `/discounted-travel-voucher-guide` | discounted-travel-voucher-one-page-guide | One-Page-Guide.pdf |
| `/incentive-revenue-dashboard` | revenue-dashboard | Revenue_Dashboard.xlsx |
| `/sales-team-training-script` | sales-team-training-script | Training-Script.txt |

- **Endpoint generalised** with a **server-side asset registry** (FastAPI + PHP): a client can
  only unlock a known `asset_id`; unknown → 422 `field_errors.playbook_asset_id`. The 202
  response returns the correct `download_url` per asset (verified: revenue-dashboard → XLSX).
- **Reused components**: `PlaybookGate` now takes a `copy` prop (per-resource headings/labels,
  playbook copy as defaults); new generic `GatedResourceLanding.jsx` renders any commercial
  entry that has a `gate` object. `App.js` routes `/high-ticket-closing-playbook` →
  `PlaybookLanding`, other `.gate` commercial pages → `GatedResourceLanding`.
- **Assets shipped**: the 3 existing project files copied to `frontend/public/downloads/`
  (now 4 total). Served statically; the gate captures the lead in front of them.
- **Analytics**: same privacy-safe events (playbook_form_start / _error / _lead_accepted /
  _download_click), `playbook_asset_id` distinguishes each resource. Consent → /privacy.
- **Not orphaned**: each new page has inbound links from a relevant topic hub (resource link on
  travel-voucher-deployment / measurement-roi / customer-incentive-strategy), from the playbook
  page's proof, from the sibling gated pages, and from 1 relevant article body link each
  (how-discounted-travel-vouchers-work, improve-sales-velocity,
  train-sales-team-to-present-travel-vouchers). Registered in seoPages/routes/prerender/
  sitemap(120)/schema(WebPage+BreadcrumbList)/related-link eligibility.

## Gates (all pass — 120 routes)
- `validate-articles.js` → **ALL VALIDATION CHECKS PASSED** (1 canonical/page, one H1, JSON-LD,
  0 broken internal links, sitemap 120/120, 0 banned wording, 0 orphans).
- `hydration-articles.js` → **ALL 120 CLEAN** (0 React #418), incl. the 3 new gated pages.
- Prerender check: the 3 gated pages render the form and have NO PDF link (gated) + 1 H1 +
  1 canonical.
- Backend contract (curl): revenue-dashboard → 202 XLSX url; unknown asset → 422; prior
  202/422/405/400/403/idempotent branches still hold.
- Visual: play badges confirmed on /articles cards; `/incentive-revenue-dashboard` renders
  eyebrow "FREE SPREADSHEET" + correct H1/lead/sections/consultation CTA + gated form.

## Changed / new files
- `frontend/src/pages/Articles.jsx`, `frontend/src/pages/SeoPages.jsx` — play badge.
- `frontend/src/components/site/PlaybookGate.jsx` — `copy` prop generalisation.
- `frontend/src/pages/GatedResourceLanding.jsx` (NEW) — generic gated landing.
- `frontend/src/App.js` — route `.gate` commercial pages.
- `frontend/src/data/seoPages.json` — 3 gated commercial entries + hub resource links +
  playbook proof cross-links (via `_release/register_gated_resources.js`).
- `frontend/src/data/articles.json` — 3 article body links (via
  `_release/link_gated_resources_from_articles.js`).
- `frontend/public/downloads/` — 3 assets added (4 total).
- `backend/server.py` + `original-site/api/playbook-lead/index.php` — asset registry.
- `original-site/**` regenerated (120); `DEPLOY_THIS_ORIGINAL_SITE.txt` (hash + 117→120 + 4 assets).
