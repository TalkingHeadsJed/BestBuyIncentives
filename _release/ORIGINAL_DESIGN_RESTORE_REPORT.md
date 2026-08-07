# ORIGINAL REACT DESIGN — Restore & Rebuild Evidence (LOCAL ONLY)

Status: **Original React SPA presentation rebuilt and PROVEN locally.** No push, no publish, no deploy.

## Objective
Restore the original tracked React website presentation (from `frontend/`, before any all-91 static
overlay/hybrid), NOT using `static-site` as the presentation source, while preserving the conversion
features (contact + legal routes, consultation API, Audience Lab pixel, redirects, genuine 404,
metadata, canonicals, sitemap).

## Last known-good original-design reference
- Commit/tag **`pre-p13-local-HEAD`** = `37844e2` — the original React SPA source before the P13/overlay work.
- Current `frontend/src` already contained every original design page (Home, About, Programs, Industries,
  CaseStudies, Resources, ResourceDetail, FAQ, Comparison) + Contact + Legal. Only 3 files had been
  altered for the hybrid: `scripts/routes.js`, `components/site/Header.jsx`, `components/site/Footer.jsx`.

## What I changed to rebuild the original presentation
- Restored `Header.jsx` + `Footer.jsx` to the full-nav React versions (Programs/Industries/Case Studies/
  Resources/FAQ/About/Compare + Book a Call).
- Restored `scripts/routes.js` to prerender ALL routes: home, about, programs, industries, case-studies,
  resources (+6 article slugs), faq, 3 comparisons, contact, **+ privacy/terms/compliance**.
- Wrote a React-SPA `.htaccess`: HTTPS/non-www canonical, directory-serve `index.html`/`index.php`
  without redirect, **genuine 404** (`ErrorDocument 404 /404.html`, no catch-all rewrite to homepage).
- Added a branded, `noindex,follow` `public/404.html` (original black/yellow style, carries the pixel).
- Rebuilt the full React app: `yarn build && node scripts/gen-sitemap.js && node scripts/prerender.js`
  → **20 routes prerendered**. Packaged into `/app/original-site` and added the first-party PHP API at
  `/api/consultation`.

## Preserved features — verified
- React routes present: `/contact`, `/privacy`, `/terms`, `/compliance` — 200.
- Consultation API: `Contact.jsx` posts to `/api/consultation`; **Web3Forms fully removed** (0 refs incl. JS bundle); PHP endpoint packaged.
- Audience Lab pixel: present in **all 21** HTML pages (20 routes + 404.html); suppressed during prerender.
- Genuine 404: unknown path has no backing file → Apache 404 → branded noindex `404.html`.
- Canonicals: present (home `https://bestbuyincentives.com/`). JSON-LD: 4 schema blocks on home.
- Sitemap: 20 URLs (`gen-sitemap.js` over the full route list). robots.txt + llms.txt retained.
- Redirects: HTTPS/non-www canonical 301 retained (overlay-specific legacy 301s intentionally dropped — every route is now a real React page returning 200).

## Visual proof (original React design, NOT the overlay)
Screenshots in `_release/screenshots/`:
- `orig-home.png` — hero "Stop Discounting. Start Closing." + VSL video + full nav (desktop) — 0 errors.
- `orig-home-mobile.png` — responsive.
- `orig-programs.png` — "Pick the closing weapon." + Enjoy a Great Escape / Luxury Getaway image.
- `orig-comparison.png` — "Travel incentives vs. discounting." head-to-head table.
- `orig-contact.png` — consultation form + Calendly.
All render with the original bold black/yellow React design; nav = Programs/Industries/Case Studies/
Resources/FAQ/About/Compare + BOOK A CALL. 0 page errors.

## Diff vs original (pre-p13) — intended deltas only
`git diff --stat pre-p13-local-HEAD -- frontend/`: `.htaccess` (genuine 404), `sitemap` (+legal),
`routes.js` (+legal), `App.js` (+3 legal routes), `Footer.jsx`, `content.js` (approved terminology),
`lib/api.js` + `lib/consultationClient.js` (consultation API), `Contact.jsx` (consultation form, Web3Forms
removed), `Legal.jsx` (new). No design/layout regressions.

## Note on copy/terminology
The original DESIGN/layout is restored exactly. Copy uses the approved product term **"discounted travel
voucher"** (kept consistent with the prior conversion requirement) rather than reverting to pre-conversion
wording. If you want the literal pre-conversion copy too, say so and I'll restore `content.js` from `pre-p13`.

## Artifacts + hashes
- `/app/original-site/` — original-design Bluehost artifact (21 HTML pages).
- `BestBuyIncentives-ORIGINAL-DESIGN-DELIVERABLE.tgz` = `fe725b1f69185e10da9603b53db5f3019eb8d79379422404231a4f75d049188d`
- Preserved states: `static-site` = restored pre-V2 overlay (untouched here); V2 under tag `sales-first-v2-local-preserved`.
- Safety refs: `pre-original-restore-preserved` (state before this rebuild), `pre-p13-local-HEAD`, `pre-v2-local-HEAD`.

## NOT done (by instruction / capability)
- No Save to GitHub, push, publish, or deploy.
- GitHub reconciliation NOT performed — no git remote/credentials in this workspace; any GitHub-only
  content (there are no blogs locally) cannot be fetched here. Boundary preserved.
- Bluehost live gates (PHP/CRM, live Apache 404/301) remain to be run on the host.
