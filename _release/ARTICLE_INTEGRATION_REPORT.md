# Restored Site + Maintainable Articles — Integration Report

**Date:** 2026-08-07
**Deliverable:** `/app/original-site/` (93 pre-rendered HTML pages + PHP `/api`)
**Archive:** `/app/_release/BestBuyIncentives-ORIGINAL-DESIGN-DELIVERABLE.tgz`
**SHA-256:** `065dc99e5ffd3e38d0b761d1d3cb1e999b968c63637a59f804cd951b78b268b8`

---

## 0. Baseline gate (verified FIRST)

Compared the current source against the authoritative pre-redesign commit
**`pre-p13-local-HEAD` (37844e2)**.

* All design/layout files (`Home`, `Programs`, `ProgramsShowcase`, `ROICalculator`,
  `IndustriesGrid`, `Header`, `Resources`, `FAQ`, `Comparison`, hero + UI components) are
  **byte-identical** to pre-p13 (they do not appear in `git diff`).
* **Contamination found & fixed:** `Footer.jsx` had drifted to an overlay/V2-era version
  with **broken internal links** (`/how-it-works/`, `/sales-closing-incentives/`,
  `/customer-incentive-programs/`, `/customer-incentive-comparisons/`, a `/downloads/*.pdf`)
  and had dropped the original newsletter form + Programs column. **Restored to the exact
  pre-p13 footer**, with only two authorized deltas: legal links → real `/privacy` `/terms`
  `/compliance` routes, and the one new "Sales Resources" → `/articles` link.
* All other diffs vs pre-p13 are the previously-approved deltas (consultation PHP API,
  legal pages, and the mandated "discounted travel voucher" terminology, which also removes
  all prohibited "free vacation / vacation incentive / vacation certificate" wording).

## 1. Authoritative article registry

`frontend/src/data/articles.json` is the single source of truth (fields incl. `slug`,
`title`, `description`, `h1`, `eyebrow`, `category`, `excerpt`, `bodyHtml`). Everything
derives from it automatically:

| Consumer | How it derives |
|---|---|
| React routes | `src/App.js` maps `ARTICLE_SLUGS` from `src/data/articles.js` (wraps the JSON) |
| Prerender + sitemap | `scripts/routes.js` `require`s `articles.json` |
| `/articles` index + filters | `src/pages/Articles.jsx` maps `ARTICLES` / `CATEGORIES` |
| Related articles | `getRelated()` — same `category` first, deterministic |

Add/remove one entry ⇒ its route, prerender page, index card, sitemap URL and related-link
eligibility all update on the next build. Workflow documented in
`/app/ARTICLE_CONTENT_MANAGEMENT.md`. Generator `_release/gen_articles.py` + normalizer
`scripts/normalize-bodyhtml.js` keep the registry consistent.

## 2. Navigation & footer (authorized additions only)

* Desktop **and** mobile nav: added **"Sales Resources" → `/articles`** via the existing
  `NAV_LINKS` data array — `Header.jsx` itself is unchanged from pre-p13, so styling is native.
* Footer: one restrained **"Sales Resources"** link in the existing Company column.

## 3. `/articles` index

Restored black/yellow design. Dark hero + single `<h1>`, 6 topic filters
(Objection Handling, Closing Techniques, Travel Vouchers, Incentive Strategy,
Industry Playbooks, Metrics & ROI), all 72 grouped with title + excerpt + link, and a
consultation CTA. Pre-rendered with full SEO: unique title/description, canonical
`/articles`, **CollectionPage** + **BreadcrumbList** JSON-LD.

## 4. Every article page

Visible **breadcrumb** (Home › Sales Resources › Category), **registry-computed related
articles**, and a **consultation CTA**. `Article` + `BreadcrumbList` JSON-LD. Video
transcript sections stripped at generation time.

## 5. Validation (all green) — see `frontend/scripts/validate-articles.js`

```
Validated 93 routes | 72 articles
✅ ALL VALIDATION CHECKS PASSED
```

* 72/72 articles **and** `/articles` produce full static HTML.
* Unique `<title>` + canonical + exactly one `<h1>` + required JSON-LD on every route.
  (One PRE-EXISTING legacy collision — `/` vs `/resources/stop-discounting-start-closing`
  — is reported as a warning; both are unchanged pre-p13 pages, out of article scope.)
* **Zero broken internal links** across all 93 routes.
* Sitemap coverage: 93/93 URLs (incl. `/articles` + all 72).
* **Zero** "free vacation / vacation incentive / vacation certificate" wording.
* **Zero hydration / console errors** — `scripts/hydration-articles.js`: `ALL 93 CLEAN`.

## 6. Proof pre-existing pages are unchanged

`<main>` content of all 16 pre-existing pages (`/`, `/about`, `/programs`, `/industries`,
`/case-studies`, `/resources`, `/faq`, `/contact`, `/privacy`, `/terms`, `/compliance`,
3 comparisons, 2 resource articles) is **byte-identical** to the prior deliverable
(`/contact` allowing only the permitted random submission UUID). The only rendered
differences site-wide are the authorized header nav link and the restored footer.

## 7. GitHub

The user authorized pushing this verified version. **No git remote is configured in this
workspace**, so remote fetch/reconciliation cannot be performed here — pushing is done via
Emergent's **"Save to GitHub"** button, which handles the remote. Nothing was auto-pushed.
Not deployed to Bluehost (not authorized).

## Safety refs
Baseline tag `pre-p13-local-HEAD` (37844e2). Previous states preserved:
`pre-original-restore-preserved`, `pre-v2-local-HEAD`, `sales-first-v2-local-preserved`.
