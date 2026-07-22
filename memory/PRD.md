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

## Backlog
- P1: Post-launch — verify live SEO audit passes on bestbuyincentives.com; submit sitemap to Google/Bing Search Console.
- P1: Confirm real Calendly booking URL.
- P2: Consider self-hosting Google Fonts to remove the one remaining external font request (not Emergent; kept to avoid visual change).
