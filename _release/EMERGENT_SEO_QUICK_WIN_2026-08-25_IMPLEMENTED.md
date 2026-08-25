# Emergent SEO Quick Win — Implemented 2026-08-25

Executes the consolidation, meta, worked-example, internal-linking, and image tasks from
`EMERGENT_SEO_QUICK_WIN_IMPLEMENTATION_2026-08-25.md`, plus a client image swap on Case Studies.

## 1. Close-rate consolidation
- **Retired** `/how-to-calculate-sales-close-rate` (removed from `articles.json` → dropped from routes, sitemap, related-reading, index; 71 articles now, site 120 routes).
- **Canonical winner** `/close-rate-vs-conversion-rate` enriched: "How to calculate close rate (formula)" with worked numeric example (24/100 = 24%), opportunity-definition/cohort guidance, and "What is a good close rate for sales?" citing HubSpot's average close rate **29%** and win rate **21%**, ending in a commercial bridge to `/high-ticket-sales-incentives`. `dateModified` bumped to 2026-08-25.
- **301 redirect** added to `.htaccess`: `^how-to-calculate-sales-close-rate/?$ → /close-rate-vs-conversion-rate/` (both slash variants, single hop, placed after the HTTPS/non-www canonical rule).
- **Internal links** to the retired URL rewritten with descriptive anchors in: `build-incentive-business-case-for-leadership`, `how-to-measure-incentive-roi`, `true-cost-of-discounting-high-ticket-sale`, and the winner itself. Validator confirms **0 references remain**.
> Note: The network-level 301 is an Apache/`.htaccess` behavior verified in the deliverable. It cannot be exercised in the Emergent preview (React dev server serves the SPA for all paths); in preview the retired path renders the SPA NotFound.

## 2. Meta descriptions
Verified the 4 target pages already carry exactly one server-rendered meta description matching the approved copy — no change needed.

## 3. Title / H1
`/sales-closing-questions-examples`: title + H1 → "The Best Sales Closing Questions for Every Stage of the Deal" (Seo appends "| BestBuyIncentives"). og/twitter/headline/breadcrumb/card all derive from these fields, so all update consistently.

## 4. Worked examples
Added dialogue-style worked examples to `/sales-closing-questions-examples` (hesitation → decision) and `/trial-close-questions-examples` (trial-close ladder before the final close), inserted at the spec's anchor points.

## 5. Commercial → article authority
Added a `bridge` HTML paragraph (rendered by `SeoPages.jsx`, `data-testid="commercial-bridge"`) to the 3 commercial pages (`/sales-closing-incentives`, `/high-ticket-sales-incentives`, `/discounted-travel-vouchers-for-sales`) linking naturally to the two question articles.

## 6. Info → commercial path + analytics
Each of the 4 ranking pages keeps one contextual commercial link (within the first third) plus the existing consultation CTA near the conclusion. These commercial links carry `data-analytics="contextual-commercial-link"`; a delegated click listener in `App.js` pushes a non-PII `contextual_commercial_click` dataLayer event (page path, destination, link text) — distinct from generic navigation.

## 7. Case Studies imagery (client request)
Replaced the three certificate photos on `/case-studies` (and the 2 detail pages) with business-type photos by vertical: Furniture showroom, Luxury auto showroom, Jewelry store (`/images/case-studies/*.png`, 1448×1086, fit the 4:3 card containers).

## Verification
- `validate-articles.js`: ALL PASS (120 routes, 71 articles, 0 broken links, sitemap 120/120) — gate updated to require the Karl Kramer Person `@id` author, author box, no `reviewedBy`.
- `hydration-articles.js`: ALL 120 CLEAN.
- Full-site JSON-LD audit: every page still exactly 1 Organization + 1 WebSite, 0 parse errors.
- Retired route absent from build + sitemap; `.htaccess` 301 present; close-rate page shows formula/29%/21%; analytics attribute present on all 4 ranking pages; new title verified; Case Studies screenshot confirms new images.

## Deliverable
`_release/BestBuyIncentives-ORIGINAL-DESIGN-DELIVERABLE.tgz`
SHA-256 = `2ca9beafd1d5d996f27d434750d31098829ca268523177eda5e759adb630d876`
