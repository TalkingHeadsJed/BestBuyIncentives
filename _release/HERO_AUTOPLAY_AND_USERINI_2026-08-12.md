# Hero Autoplay Fix + api/.user.ini — Implementation Report (2026-08-12)

Two fixes from the uploaded prompts. Restored design + all pages preserved. No GitHub op;
not deployed.

**Deliverable:** `/app/original-site/` (120 pages + PHP `/api` + `/downloads`)
**Archive SHA-256:** `ec3eeb229c1d8647bdbd4421d9d86e4b24f27736129c5d853f9b065bd8dd8731` (~99 MB, 120 index.html)
**Prev SHA-256:** `c096d15d01b029408a85b46938b29bfc7e8faf8d25a895cc241e58535033e364`

## 1. Hero video autoplay (muted survives prerender)
Problem: React does not serialize the `muted` boolean attribute, so the prerendered static
HTML shipped `<video autoplay ...>` WITHOUT `muted` — browsers block autoplay, hero looked
frozen on the live site.
Fixes (both applied):
- **Durable (build):** `frontend/scripts/prerender.js` now post-processes every page and
  re-injects `muted` into any `<video>` tag that has `autoplay` but lacks `muted`. Verified in
  emitted HTML: `build/index.html` and `original-site/index.html` hero-bg tag now ends
  `... autoplay="" loop="" playsinline="" preload="auto" muted>`. Both autoplay videos on the
  home page (hero background + VSL preview) carry `muted`; 0 autoplay videos lack it across the
  whole build. The user-triggered modal video (no autoplay) is untouched (keeps sound).
- **Belt-and-suspenders (runtime):** `frontend/src/components/home/Hero.jsx` — added a `ref` +
  `useEffect` on both the hero-bg and VSL-preview videos that sets `v.muted = true` and calls
  `v.play().catch(()=>{})` on mount, so autoplay is forced after hydration regardless.

## 2. api/.user.ini shipped in the deploy
- `original-site/api/.user.ini` created with EXACTLY:
  `auto_prepend_file="/home1/sybxwpmy/bbi-private/bbi-env.php"`
  This makes PHP-FPM load the private env bootstrap (which sets BBI_* secrets from OUTSIDE the
  web root) before every `/api/*` script, so the consultation + playbook-lead endpoints stop
  returning 503 for missing config and can durably accept leads.
- The secret itself is NOT in the repo — `.user.ini` only references the path to `bbi-env.php`
  (which lives outside public_html and is not part of this repo).
- Included in the packaged deliverable (verified `original-site/api/.user.ini` is in the tar)
  and preserved by the build→original-site sync (dotfiles copied via `cp -r api/. api/`).
- Hardened `original-site/api/.htaccess` to also deny serving `.user.ini` over HTTP
  (`^(?:\.env|\.user\.ini|.*\.(?:log|json|bak|sql))$`).

## Gates (all pass — 120 routes)
- `validate-articles.js` → ALL VALIDATION CHECKS PASSED.
- `hydration-articles.js` → ALL 120 CLEAN (the Hero ref/useEffect introduced no #418).
- Acceptance greps: hero-bg `<video>` contains `muted`; 0 autoplay videos missing `muted`;
  `api/.user.ini` present with exact content and in the tarball.

## Changed / new files
- `frontend/scripts/prerender.js` — muted re-injection transform.
- `frontend/src/components/home/Hero.jsx` — ref/useEffect muted-autoplay on both autoplay videos.
- `original-site/api/.user.ini` (NEW) — PHP auto_prepend bootstrap.
- `original-site/api/.htaccess` — deny serving `.user.ini`.
- `original-site/**` regenerated (120); `DEPLOY_THIS_ORIGINAL_SITE.txt` hash bumped.
