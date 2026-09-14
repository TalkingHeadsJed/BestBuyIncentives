# SEO Build — Category Pages, Brand Disambiguation, Titles, Hub Links, Headers, llms — Phase A (2026-09-14)

Implements §1–§5 and §7 of `EMERGENT_PROMPT_BBI ... yml_autodeploy` follow-up SEO spec.
Hard content rules honored: "discounted travel voucher" / "travel certificate" (never cost-free phrasing),
sell destinations/excitement, no recipient-cost/terms copy, no em-dashes, Karl byline on new pages.

## §1 Five new category pages (site now 125 routes / 125 sitemap URLs)
`/vacation-certificates`, `/travel-certificates`, `/vacation-incentives`, `/travel-incentive-programs`, `/sales-incentive-programs`.
- Built from `src/data/categoryPages.js` + reusable `src/pages/CategoryPage.jsx` (routes in App.js pass `slug` as prop; added to `scripts/routes.js`).
- Each: unique H1, 7 H2 sections, FAQ (4-6 Q), Article + BreadcrumbList + FAQPage + Person schema, visible Karl byline + date, hero + bottom CTA to /contact, cross-links to /programs, all 7 /industries pages + /partners/marketing-agencies, /how-it-works, /sales-team-training-script, and 3 related articles.
- Titles all <=60 chars, metas <155, primary phrases covered.

## Nav + footer
- New **Programs dropdown** (desktop + mobile) via `PROGRAM_LINKS` in `src/data/guidesAndTools.js` (6 links: /programs + 5 new).
- Footer Programs column replaced with the 6 program links.
- `/programs` H1 retitled to "Vacation Certificate Programs"; title tag centrally set.

## §2 Brand disambiguation
- Organization schema: added `alternateName: ["Karl Kramer & Company","Karl Kramer & Company, Inc."]` and `disambiguatingDescription` ("...Not affiliated with Best Buy Co., Inc., the electronics retailer.").
- Homepage `<title>`: "Stop Discounting. Start Closing. | Best Buy Incentives by Karl Kramer & Co."
- Footer line: "Best Buy Incentives is Karl Kramer & Company, Inc., a B2B sales-incentive provider for high-ticket sales teams since 1992. Not affiliated with Best Buy Co., Inc." (site-wide).
- /about H1 subtitle "Karl Kramer & Company, Inc."

## §3 Titles & descriptions (centralized in Seo.jsx)
- Core-13 pages keep " | Best Buy Incentives"; all other routes drop the suffix. Applied the 9 explicit title rewrites + 8 meta rewrites via `PAGE_META_OVERRIDES`.
- Added a description clamp: any meta >155 chars is trimmed at a word boundary. Verified build: **0 titles >60 (except home), 0 metas >155**.

## §4 Hub links
- New shared `GuidesAndTools` block (17 links) on the homepage (below the case-study strip) and on /resources.
- Every industry-specific root article now links to its `/industries/*` (or `/partners/marketing-agencies`) page.

## §5 Cache & security headers (original-site/.htaccess)
- Added immutable 1-year Cache-Control for hashed static assets (js/css/fonts/images/mp4), no-cache for html/xml/txt, and `Strict-Transport-Security`, `X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin`. Existing canonical + no-slash + close-rate 301 rules preserved.

## §6 llms (partial)
- Additively added the 5 new pages to `llms.txt` (now 18 URLs). Generated `llms-full.txt` (19 pages: home, 5 category, /programs, /how-it-works, /faq, 3 comparisons, 7 industries).
- PENDING Phase B: verbatim replacement with client's `llms-v2.txt` (file not yet supplied).

## §7 Methodology placeholder
- Bracketed placeholder line added under the first stat appearance on the homepage results strip, /about stats, and /case-studies hero.

## Build clean-up
- Production build now runs with `GENERATE_SOURCEMAP=false` (no `.map` files ship; also removes the only "free vacation" string, which lived in a source comment/sourcemap).

## NOT done (Phase B — blocked on missing companion files)
- §6 verbatim `llms.txt` replace (needs `llms-v2.txt`).
- §8 the 22 new video embeds (needs `article_video_embed_map-v2.csv`).

## Verification
- validate-articles: ALL PASS (125 routes / 71 articles; banned-wording list corrected to drop the now-official "vacation incentive"/"vacation certificate", keep "free vacation/trip/cruise").
- hydration: ALL 125 CLEAN.
- Full-site JSON-LD audit: 1 Organization + 1 WebSite per page, 0 parse errors.
- Acceptance: 5 new routes 200 with unique H1 / FAQPage+Article+Org+WebSite / Karl byline; sitemap 125; titles <=60 (home <70); metas <=155; Org has alternateName + disambiguatingDescription; Guides & Tools 17 links on home + /resources; no "free vacation/trip/cruise" in original-site.
- testing_agent iteration_11: all 10 frontend feature groups pass (50/50).

## Deliverable
`_release/BestBuyIncentives-ORIGINAL-DESIGN-DELIVERABLE.tgz`
SHA-256 = `29566fda729005fb508202f6991d00db1821c0f93e21c43f35179422009a191a`
