# Article Content Management

BestBuyIncentives ships as a **100 % static, pre-rendered** site (React SPA compiled to
static HTML). The 72 sales articles are driven by **one authoritative registry** so an
operator never has to touch routing, the index page, the sitemap, or related links by hand.

---

## 1. The single source of truth

```
frontend/src/data/articles.json
```

It is a JSON **array**; each entry is one article:

| field         | required | purpose                                                                 |
|---------------|----------|-------------------------------------------------------------------------|
| `slug`        | yes      | URL path (`/<slug>`) and the React/prerender route key. Lower-kebab-case. Must be unique. |
| `title`       | yes      | `<title>`, OG/Twitter title, index card title, related-link label.      |
| `description` | yes      | meta description (~150–160 chars, plain text — no HTML entities).        |
| `h1`          | yes      | The visible `<h1>` on the article (falls back to `title`).               |
| `eyebrow`     | yes      | Small stamp label above the H1.                                          |
| `category`    | yes      | Grouping on `/articles`, filter chips, and **related-article eligibility**. Must be one of the categories in `src/data/articles.js` → `CATEGORY_ORDER`. |
| `excerpt`     | yes      | Card summary on `/articles` (plain text).                                |
| `bodyHtml`    | yes      | Article body as an HTML fragment (`<p>`, `<h2>/<h3>`, `<ul>/<ol>`, `<a>`, `<table>`…). **No `<h1>`. No video-transcript section.** Must be entity-normalized (see step 3). |

Everything else is derived automatically from this file:

* **React routes** — `src/App.js` maps `ARTICLE_SLUGS`.
* **Prerender + sitemap routes** — `scripts/routes.js` `require`s `articles.json`.
* **/articles index + filters** — `src/pages/Articles.jsx` maps `ARTICLES` / `CATEGORIES`.
* **Related articles** — `getRelated()` in `src/data/articles.js` (same `category` first, then top-up).

> Valid categories: `Objection Handling`, `Closing Techniques`, `Travel Vouchers`,
> `Incentive Strategy`, `Industry Playbooks`, `Metrics & ROI`.
> To add a new category, add it to `CATEGORY_ORDER` in `src/data/articles.js`.

---

## 2. Add or remove an article (the whole workflow)

### Add
1. Append a new object to `frontend/src/data/articles.json` with all fields above.
2. Entity-normalize the body (step 3).
3. Rebuild + validate (step 4).

### Remove
1. Delete that object from `articles.json`.
2. Rebuild + validate. The route, index entry, sitemap URL and related links disappear on their own.

### Rename a slug
Change `slug` and rebuild. (Optionally add a 301 for the old path in `frontend/public/.htaccess`.)

### Prefer a generator?
`_release/gen_articles.py` regenerates the **entire** registry from the approved source HTML
in `_release/v2/<slug>/index.html`. It strips layout/nav/footer and any `## Video transcript`
section, decodes entities in text fields, and assigns `category` + `excerpt`:

```bash
python3 /app/_release/gen_articles.py          # rewrites articles.json from source
node   /app/frontend/scripts/normalize-bodyhtml.js   # then normalize bodies (step 3)
```

---

## 3. Normalize the body HTML (required for clean hydration)

React 19 validates `dangerouslySetInnerHTML` during hydration, so the stored `bodyHtml`
string must be **byte-identical** to what the browser produces when it parses + re-serializes
that HTML (e.g. `&#39;` must already be `'`). Run:

```bash
cd /app/frontend
node scripts/normalize-bodyhtml.js
```

This round-trips every `bodyHtml` through the browser's own parser and rewrites `articles.json`.
Always run it after editing any `bodyHtml` by hand or regenerating the registry.

Also keep **plain-text** fields (`title`, `description`, `h1`, `eyebrow`, `excerpt`) free of
HTML entities — write the literal character (`'`, `"`, `&`), not `&#39;` / `&quot;` / `&amp;`.

---

## 4. Build & validate

```bash
cd /app/frontend
yarn build                       # compile the React app
node scripts/gen-sitemap.js      # regenerate sitemap.xml from the route list
node scripts/prerender.js        # pre-render every route to <route>/index.html

# validation (all must pass):
node scripts/hydration-articles.js   # 0 hydration / #418 errors on every route
node scripts/validate-articles.js    # metadata/canonical/H1/schema + broken links + banned wording
```

Then repackage the deploy artifact (build output + PHP `/api`) into `/app/original-site`
and refresh the archive + checksum (see `/app/DEPLOY_THIS_ORIGINAL_SITE.txt`).

### Acceptance gate
* 72/72 articles **and** `/articles` produce full static HTML.
* Every page: unique `<title>` + canonical + exactly one `<h1>` + JSON-LD schema.
* Article pages: `Article` + `BreadcrumbList` schema; `/articles`: `CollectionPage` + `BreadcrumbList`.
* Zero broken internal links; every article appears in `sitemap.xml`.
* Zero occurrences of "free vacation" (and the other banned terms).
* Zero hydration / browser-console errors.

---

## 5. Guardrails

* Product term is always **"discounted travel voucher"** — never "free vacation",
  "vacation incentive", or "vacation certificate".
* Never hand-edit files under `/app/original-site/` — it is generated. Edit `frontend/` and rebuild.
* `bodyHtml` must never contain an `<h1>` (the page renders the single H1 from the `h1` field).
