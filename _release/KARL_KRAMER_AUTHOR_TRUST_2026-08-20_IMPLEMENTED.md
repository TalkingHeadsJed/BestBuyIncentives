# Karl Kramer Author Trust (E-E-A-T) — Implemented 2026-08-20

## Goal
Attribute every article to a single, real, credentialed human author (Karl Kramer, CEO of Best Buy Incentives) with a dedicated author page and one stable `Person` schema entity — strengthening E-E-A-T for Google and AI crawlers. Retire the generic "Editorial Team" author + "Reviewed by Karl Kramer" pattern.

## What changed
- **New stable Person entity** (`src/components/site/Seo.jsx`): `PERSON_ID = .../authors/karl-kramer/#person` + `personSchema` (name, url, image, jobTitle CEO, description, `worksFor` → `#organization` `@id`, `sameAs` LinkedIn, `knowsAbout`). Used identically everywhere.
- **Author identity data** (`src/data/author.js`): single source of truth for visible name, title line, photo, bio (short + long), and areas of expertise.
- **Article pages** (`src/pages/Article.jsx`):
  - Article schema `author` now `{ "@id": PERSON_ID }`; `reviewedBy` removed (Karl is author, not author+reviewer); `publisher` stays `#organization`. The full `personSchema` node is included in each article's graph so the `@id` resolves.
  - Visible byline: author photo + "By **Karl Kramer**, CEO of Best Buy Incentives" (links to `/authors/karl-kramer`) + "Published … · Updated …".
  - End-of-article author box: photo + name + short bio + "Read Karl's full profile" link.
- **New author page** (`src/pages/AuthorKarlKramer.jsx`, route `/authors/karl-kramer`): dark hero (photo, name, title, LinkedIn), full bio, areas of expertise, resource links (library → /articles, how vouchers work → /programs, discuss → /contact), and a fully crawlable list of all 72 articles grouped by category. Self-canonical, unique title/meta, `Person` + `BreadcrumbList` schema.
- **Routing/sitemap**: added route in `src/App.js` and `/authors/karl-kramer` to `scripts/routes.js` (prerender + sitemap now 121 URLs).
- **Photo**: `public/images/authors/karl-kramer.png` (800×800), rendered with explicit width/height + descriptive alt.
- **QA gate updated** (`scripts/validate-articles.js`): now enforces author = Karl Kramer Person `@id`, presence of the Person node + author box + author-page link, and FAILS if `reviewedBy` is present.

## Verification
- Full-site audit of ALL 121 pages: still exactly 1 Organization + 1 WebSite each, 0 JSON-LD parse errors.
- 7 sampled article pages: author = Person `@id`, Person node present (1), `reviewedBy` absent, visible byline links to author page.
- `validate-articles.js`: ALL PASS (121 routes, 72 articles).
- `hydration-articles.js`: ALL 121 CLEAN (fixed a React #418 on the author page caused by `{expr}` adjacent to a whitespace text node in resource-link labels).
- Screenshots confirm the author page and article byline/author box render correctly and on-brand.

## Deliverable
`_release/BestBuyIncentives-ORIGINAL-DESIGN-DELIVERABLE.tgz`
SHA-256 = `c406eec5ac1d19a046fae7a7ed166a67355cc9b1366e32dd270ed30d5e0eed51`
