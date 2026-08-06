# BestBuyIncentives.com — PRD

## Problem Statement
Replace the old BestBuyIncentives.com site with a modern, bold, sales-focused authority site (Hormozi/Acquisition.com style). Goals: lead-gen, showcasing offerings, booking demos. Audience: B2B business owners & sales leaders. **SEO is the primary traffic channel** — must be indexable by search engines AND AI assistants (ChatGPT, Claude, Perplexity, etc.).

## Hard Requirements
- **100% static site** hostable on standard Apache shared hosting (BlueHost). No Node/npm on server.
- **ZERO Emergent dependencies** — no tracking, PostHog, badges, preview URLs, localhost, or emergentagent CDNs in output.
- Theme: Yellow (#FFD300) / Black / White. NO GREEN. Photo-dominant.
- Client-side ROI calculator, Calendly embed, contact/newsletter forms via Web3Forms.
- Canonical domain: `https://bestbuyincentives.com` (non-www, HTTPS, no trailing slash except root).

## Tech Stack
- React 19 (CRA + craco), Tailwind, framer-motion, react-fast-marquee, sonner, react-helmet-async.
- **Build-time prerendering** (puppeteer-core + system Chrome) → every route ships as real static HTML with hydration.
- Forms: Web3Forms (key hardcoded in `src/lib/api.js`). Video: self-hosted `/public/vsl.mp4`. Images: self-hosted `/public/images`.

## SEO / AI Architecture (added this session)
- `scripts/routes.js` — single source of truth for all 14 routes (shared by prerender + sitemap).
- `scripts/prerender.js` — serves the CRA build, sets `window.__PRERENDER__`, renders each route in headless Chrome, writes `<route>/index.html` with fully-rendered content + per-route Helmet head (title/description/canonical/OG/JSON-LD).
- `scripts/gen-sitemap.js` — regenerates `sitemap.xml` from the route list.
- `src/hooks/useHydrated.js` — returns false during prerender + first client render, true after; used to make client-only/measurement widgets (Marquee, Toaster, Radix Select, Radix Slider, Calendly) render a static version first so hydration is mismatch-free.
- `public/robots.txt` — explicitly allows GPTBot, OAI-SearchBot, ChatGPT-User, ClaudeBot, anthropic-ai, Claude-Web, PerplexityBot, Perplexity-User, Google-Extended, Bingbot, Amazonbot, Applebot(-Extended), CCBot, Meta-ExternalAgent, cohere-ai + sitemap ref.
- `public/llms.txt` — curated Markdown index of the site for LLMs.
- `public/index.html` — global JSON-LD: Organization (legalName, address, contactPoint 866-843-8003, sameAs socials), Service, WebSite. Per-page meta injected by Helmet (deduped — no static per-page tags).
- New `/faq` page (`src/pages/FAQ.jsx`) — answers rendered as always-visible text + FAQPage schema (high value for AI citation). Linked in footer.
- `public/.htaccess` — canonical HTTPS+non-www 301, extensionless→`/index.html` serving (DirectorySlash Off), SPA fallback, HTML no-cache, host-neutral (no Pair.com/BlueHost names).

## Build & Deploy
Build pipeline (container only): `yarn build && node scripts/gen-sitemap.js && node scripts/prerender.js` → output synced to `/app/static-site/`.
Deploy: "Save to GitHub" → upload **contents of `/app/static-site/`** (incl. hidden `.htaccess`) to `public_html`.
Web3Forms: add live domain to "Allowed Domains" so forms send.

## Verification (this session)
- All 14 routes: unique title/description/canonical, real `<h1>`+body+footer in raw HTML (no JS needed) — acceptance test passes via curl-equivalent.
- All 14 routes hydrate with **0 React errors** (verified in headless Chrome).
- No emergentagent/posthog/localhost strings. ROI calc, sliders, marquee, animations unchanged (no visual change).

## Changelog
- 2026-06 (earlier): Static conversion, Web3Forms, phone 866-843-8003, localized images, scrubbed Emergent.
- 2026-06 (this session): Final Vimeo VSL (user's compressed 16.6MB 720p), new Greece testimonial image, FAQ copy change, video-badge "Member Access", full SEO prerendering + AI optimization (above), renamed output folder to `static-site`.
- 2026-06 (this session, cont.): Expanded `/faq` to 20 buyer/AI-style questions in 6 categories (`FAQ_PAGE` in content.js) — answers visible + full FAQPage JSON-LD (20 questions) for answer-engine citation. Calendly embed URL left untouched (`calendly.com/bestbuyincentives5/30min`).
- 2026-06 (this session, cont.): Added visible "FAQ" link to top nav (NAV_LINKS). Built new comparison page `/travel-incentives-vs-discounting` (`src/pages/Comparison.jsx`) — head-to-head table + FAQPage schema + breadcrumb, linked in footer, prerendered, added to sitemap (now 15 routes). Verified by testing agent (frontend, 100% pass, iteration_4.json) with 0 issues; hydration clean across all routes.
- 2026-06 (this session, cont.): Added "Compare" dropdown in top nav (desktop hover + mobile section, `Header.jsx`) and 2 more data-driven comparison pages via `COMPARISONS` map in `src/data/comparisons.js`: `/travel-incentives-vs-gift-cards` and `/travel-incentives-vs-cash-rebates`. All 3 pages prerendered; sitemap now 17 routes. Fixed recurring hydration #418 by wrapping mixed text/expression nodes as single template-literal expressions (`{` ${altLabel}`}`, `{`Travel incentives ${c.label}`}`). Added `scripts/hydration-check.js` (local puppeteer console check) — all routes CLEAN. Rebuilt + prerendered + synced to `/app/static-site` (17 routes, 99M incl. 77M images + 16M vsl.mp4). Verified by testing agent (frontend, 100% pass, iteration_5.json) — 0 issues, 0 console/hydration errors. READY FOR BLUEHOST DELIVERY.
- 2026-07-22: Fixed live `.htaccess` 403 bug on all extensionless routes. Root cause: `DirectorySlash Off` + prerender creating real directories (about/, programs/…) meant the "serve prerendered index" rule (`!-d`) skipped them → Apache 403. Baked the client-provided fix into `frontend/public/.htaccess` (source template) AND `static-site/.htaccess`: a rule placed right after the HTTPS/non-www canonical redirect that serves `/$1/index.html` for a real-directory hit WITHOUT redirecting (keeps no-trailing-slash canonical URL). Now survives future rebuilds + "Save to GitHub".
- 2026-07-22 (content pass): (1) Replaced the flagship certificate flyer with client's new "8 Day & 7 Night Luxury Getaway for 4" banner (`public/images/luxury-getaway-ad.png`, referenced via PROGRAMS[0].image; container aspect changed 4:3→16:10 in ProgramsShowcase + Programs page so the banner text isn't cropped). (2) ROI heading changed to "What can incentives do to your top line?" (`ROICalculator.jsx`). (3) Industries: removed Flooring + Mattress, added E-Commerce Retailers, Travel Clubs, Health Clubs, Employee Rewards (`content.js` INDUSTRIES + new self-hosted photos in `public/images/unsplash/` + `images.js` + `IndustriesGrid.jsx` map + `Industries.jsx` SEO desc + Contact form `INDUSTRIES_OPTS`). (4) Contact form field label "Industry" → "Pick your vertical" (placeholder now "Select one"). Rebuilt + prerendered (17 routes) + synced to `/app/static-site`; verified baked HTML for all changes. READY FOR REDEPLOY.
- 2026-07-22 (Pixel): Added Audience Lab (idpixel) analytics `<script>` to `public/index.html` head; blocked it in `prerender.js` so it doesn't fire from the build container. Verified live: loads 200 + collector 204.
- 2026-07-23 (Priority-13 / All-91 Revenue Release — LOCAL ONLY, not pushed/deployed): Major architecture shift. Verified SHA-256 of 4 client ZIPs (all match). Merged the reconstructed React conversion patch over `src/` (Web3Forms fully removed; new `/api/consultation` contact flow + attribution + analytics events + `/privacy` `/terms` `/compliance` legal pages). Model (A): the **91 prebuilt static overlay pages are now the primary site**; React retained ONLY for `/contact` + legal (prerender route list trimmed in `scripts/routes.js`). Assembled hybrid `/app/static-site` (96 HTML pages, 86MB) via reproducible `/app/_release/assemble.py`: overlay base + React static bundle + contact/legal + images + PHP API into `/api` + pixel injected into all 96 pages + corrected `.htaccess` + CTA-leak fix. Rewrote `Header.jsx`/`Footer.jsx` on the React pages to plain `<a>` hard-nav to valid routes only (removed 404 links + Compare dropdown). New `.htaccess`: genuine 404 (no SPA fallback), `404.html` noindex, dir-serve index.html/index.php without redirect, 10 legacy 301s, HTTPS/non-www. Validation: 95/95 routes, 95 unique titles, 0 issues (`_release/validation-report.json`). Audits: 0 Web3Forms/secrets, 0 prohibited legacy terms, approved "discounted travel voucher" on all, 0 editorial leaks (fixed 18 `Primary/Secondary CTA:` labels → real buttons). PHP consultation API + cron packaged (`deploy-private/` outside public_html). Evidence: `_release/RELEASE_REPORT.md`, `_release/BLUEHOST_DEPLOY_CHECKLIST.md`, `_release/GITHUB_RECONCILIATION.md`, screenshots in `_release/screenshots/`. NOT verified (require Bluehost): live PHP/CRM/idempotency/spam/retry/SLA/PII, live Apache 404/301. OPEN: reconcile newer GitHub remote blogs (no remote/creds in workspace) before any Save to GitHub — see GITHUB_RECONCILIATION.md. Safety refs: tag `pre-p13-local-HEAD`, branch `backup/pre-p13-local`, tarballs in `_release/backup/`.

## Backlog
- P1: Post-launch — verify live SEO audit passes on bestbuyincentives.com; submit sitemap to Google/Bing Search Console.
- P1: Confirm real Calendly booking URL.
- P2: Consider self-hosting Google Fonts to remove the one remaining external font request (not Emergent; kept to avoid visual change).
