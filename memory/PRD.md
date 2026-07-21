# BestBuyIncentives.com — PRD

## Problem Statement
Replace the old, poorly-designed BestBuyIncentives.com site with a modern, bold, sales-focused authority site (Hormozi/Acquisition.com/Grant Cardone style). Goals: lead-gen, showcasing offerings, booking demos. Audience: B2B business owners & sales leaders.

## Hard Requirements
- **100% static site** hostable on standard BlueHost / Pair.com shared hosting.
- **ZERO Emergent dependencies** — no tracking, no PostHog, no "Made with Emergent" badge, no preview URLs baked into the bundle.
- Theme: Yellow (#FFD300) / Black / White. NO GREEN. Light, photo-dominant, minimal dense text.
- Client-side ROI calculator, Calendly embed, contact/newsletter forms via Web3Forms.

## Tech Stack
- React (CRA + craco), Tailwind CSS. Static export only. No backend, no MongoDB.
- Forms: Web3Forms (`https://api.web3forms.com/submit`). Key hardcoded in `src/lib/api.js`: `43646412-eb6a-4348-bc8d-6c587d26701d`.
- All images self-hosted under `/public/images` (no Unsplash hotlinks).
- VSL video self-hosted at `/public/vsl.mp4`.

## Deployment
- Final upload-ready build: `/app/pair-static-site/` (mirror of `/app/frontend/build/`).
- Delivery: user uses "Save to GitHub", downloads, uploads contents of `pair-static-site/` to host root.
- `.htaccess` included for React Router on Apache.
- NOTE: Web3Forms key is domain-restricted; forms fail on preview URL, work once the live domain is added to Web3Forms "Allowed Domains".

## Changelog
- **2026-06-16 (prior session):** Static conversion, client-side ROI calc, Web3Forms integration, phone `866-843-8003`, localized 32 images, scrubbed Emergent scripts/badges/PostHog.
- **2026-06 (this session):**
  - Replaced VSL placeholder with final video from Vimeo (`vimeo.com/1208569860`). Downloaded, compressed to 720p H.264 (~33MB, faststart), self-hosted at `/public/vsl.mp4`. Runtime label updated to 03:51.
  - Replaced Santorini/Greece testimonial photo with new couple image (`/images/testimonial-greece.png`).
  - Updated FAQ: "How are these offers possible?" → "Can I use one of the certificates for myself?" with new answer.
  - Removed `process.env.REACT_APP_BACKEND_URL` inlining from bundle (hardcoded Web3Forms key) — production bundle now fully free of `emergentagent.com`/`posthog` strings.
  - Rebuilt and synced `/app/pair-static-site/`.

## Backlog
- P1: Address visual/functional feedback once tested on live BlueHost/Pair.com domain.
- P1: Confirm Calendly booking URL is the client's real one.
