# Entity Disambiguation & Schema Fix — Implemented 2026-08-14

## Defect
Every rendered page carried TWO conflicting `#organization` nodes (and two `#website` nodes):
1. A static block in `frontend/public/index.html` — name "BestBuyIncentives", **logo = `/images/hero-seminar.png`** (a seminar photo, not the logo), plus a personal LinkedIn in `sameAs` and an unverifiable `aggregateRating`.
2. The canonical block injected on every page by `frontend/src/components/site/Seo.jsx` (BASE_SCHEMA) — name "Best Buy Incentives", logo `logo.svg`.

Same `@id`, different definitions → entity ambiguity for Google/AI crawlers.

## Fix
- **`public/index.html`**: Removed the duplicate `Organization` and `WebSite` JSON-LD blocks (dropped the hero-image logo, personal LinkedIn, and aggregateRating). Kept the `Service` block (references the canonical `#organization` `@id`).
- **`Seo.jsx` `BASE_SCHEMA`** is now the single canonical source of truth:
  - `Organization` `@id #organization`: name "Best Buy Incentives", legalName, url, **logo = `ImageObject` `@id #logo` → `/images/logo.svg`**, contact/address, and `sameAs` = organization profiles ONLY (YouTube, Facebook, Instagram). Description = spec-approved copy.
  - `WebSite` `@id #website`: name "Best Buy Incentives", `publisher` → `#organization`.
- **`Seo.jsx` `articleSchema`** (used by `/resources/<slug>` pages): `author` and `publisher` now reference `{ "@id": ORG_ID }` instead of inline Organizations with `logo.png` → removes stray org nodes.
- **`Footer.jsx`**: Added visible disambiguation sentence — "Best Buy Incentives is a B2B sales-incentive provider for high-ticket sales teams." (renders site-wide).

## Verification
- Programmatic audit of ALL 120 prerendered pages: exactly **1 Organization + 1 WebSite** node each, 0 JSON-LD parse errors, org logo is `logo.svg` (never hero/`logo.png`), `sameAs` org-only (no LinkedIn).
- `validate-articles.js`: ALL PASS (120 routes, 0 broken links, sitemap 120/120).
- `hydration-articles.js`: ALL 120 CLEAN.
- Screenshot: footer disambiguation text confirmed visible.
- `original-site/` re-synced (PHP `api/` + `.user.ini` preserved) and repackaged.

## Deliverable
`_release/BestBuyIncentives-ORIGINAL-DESIGN-DELIVERABLE.tgz`
SHA-256 = `6a3e3c515fa47ade1671271919b1946a101e41104c37fa5751f9488c48484d7f`
