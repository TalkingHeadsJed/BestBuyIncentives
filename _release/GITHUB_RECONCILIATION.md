# GitHub Reconciliation — Newer Remote Blog Posts (EXTERNAL DEPENDENCY, not done locally)

## Why this is still open
This Emergent workspace has **no git remote configured** (`git remote -v` empty, no URL in
`.git/config`) and no GitHub credentials, so I **cannot fetch/pull** the remote or see the newer
blog commits from here. GitHub sync happens only through the chat UI buttons
**"Pull from GitHub" / "Save to GitHub"**, and "Save to GitHub" **pushes without auto-merging** —
so saving now could overwrite/orphan your newer remote blogs. Nothing has been pushed.

## Current local state
- Local HEAD at assembly time: `d9f0439`.
- Recoverable refs: git tag `pre-p13-local-HEAD`, branch `backup/pre-p13-local`, tarballs in `/app/_release/backup/`.

## The site's content model (so you know exactly where blogs go)
The 91 pages are **flat, top-level slug routes** — e.g. `/cost-of-delay-in-sales/index.html`,
`/sales-closing-techniques-high-ticket-purchases/index.html`. There is **no `/blog` or `/resources`
hub**; articles interlink via in-body "related" links and the footer. So each new blog is a
self-contained static page at its own slug.

## Where a reconciled blog file must be inserted (per blog)
1. **Page file:** `static-site/<blog-slug>/index.html`
   - Must include, like the other overlay pages: unique `<title>`, meta description, `<link rel=canonical>`,
     Open Graph, JSON-LD, exactly one `<h1>`, `/assets/bbi-seo.css` + `/assets/bbi-conversion.js`,
     a `/contact/?content=<id>` CTA, approved terminology (**"discounted travel voucher"**; never
     "free vacation" / "vacation incentive" / "vacation certificate"), and the Audience Lab pixel in `<head>`.
   - If the pulled blog lacks the pixel, re-run the injection in `/app/_release/assemble.py` (step 6) — it
     adds the pixel to any HTML missing it.
2. **Sitemap:** add `<url><loc>https://bestbuyincentives.com/<blog-slug></loc>…</url>` to `static-site/sitemap.xml`.
3. **Interlinks:** add a link to the new blog from ≥1 relevant existing page + the footer "Proof & resources"
   column (`frontend/src/components/site/Footer.jsx`) if it should appear site-wide.
4. **Redirects:** if the blog previously lived at a different URL, add a 301 in `static-site/.htaccess`.

## Exact remaining GitHub steps (you drive; I cannot from here)
1. In the chat input: **GitHub → "Pull from GitHub"**, select the bestbuyincentives repo/branch with the newer blogs.
   - This may revert my in-progress Priority-13 source changes; that's fine — all four release ZIPs are retained
     in `/app/_release`, and the whole build is reproducible via `python3 _release/assemble.py`
     (after `cd frontend && cp -r /app/_release/reactpatch/src/. src/ && yarn build && node scripts/prerender.js`).
2. Tell me the pull is done. I will then:
   - Inventory every remote-only blog/content file (report exact paths + counts).
   - Re-apply the release **on top of** the blogs (never overwriting them), re-run build + full validation.
   - Produce a final diff + proof every newer blog is still present and passes the per-route gates.
3. Only after that: **Save to GitHub to a NEW branch** (e.g. `release/priority-13`) → open a PR → review that
   blogs + release both present → merge to `main`. Never a direct overwrite of `main`.

## Merge strategy (recommended)
- Treat blogs as the base; apply the release as an overlay on top.
- Conflict rule: **preserve newer GitHub blog content**; apply release changes for contact/attribution/API/
  terminology/Apache/91-pages. Blogs and release routes are disjoint slugs, so true conflicts should be limited
  to shared files (`sitemap.xml`, `.htaccess`, footer links) — merge those additively.
