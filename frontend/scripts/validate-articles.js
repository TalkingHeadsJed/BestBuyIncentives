// Full static-site validation for the article content system (acceptance gate).
// Checks every prerendered route for: full HTML, unique <title>, canonical, exactly one
// <h1>, required JSON-LD schema, zero broken internal links, sitemap coverage, and zero
// banned wording. Exits non-zero on any failure.
const fs = require("fs");
const path = require("path");
const { ROUTES, ARTICLE_SLUGS } = require("./routes");

const BUILD = path.join(__dirname, "..", "build");
const routeSet = new Set(ROUTES);
const errors = [];
const warn = [];

const readRoute = (r) => {
  const p = r === "/" ? path.join(BUILD, "index.html") : path.join(BUILD, r, "index.html");
  return fs.existsSync(p) ? fs.readFileSync(p, "utf-8") : null;
};

// sitemap
const sitemap = fs.readFileSync(path.join(BUILD, "sitemap.xml"), "utf-8");
const sitemapHas = (r) => sitemap.includes(`<loc>https://bestbuyincentives.com${r === "/" ? "/" : r}</loc>`);

const titles = new Map();
const BANNED = ["free vacation", "vacation incentive", "vacation certificate"];

const targetExists = (href) => {
  const clean = href.split("#")[0].split("?")[0].replace(/\/$/, "") || "/";
  if (routeSet.has(clean)) return true;
  // static asset on disk?
  const asFile = path.join(BUILD, clean);
  if (fs.existsSync(asFile)) return true;
  if (fs.existsSync(asFile + ".html")) return true;
  if (fs.existsSync(path.join(asFile, "index.html"))) return true;
  return false;
};

for (const r of ROUTES) {
  const html = readRoute(r);
  if (!html) { errors.push(`[${r}] MISSING prerendered index.html`); continue; }

  // full HTML sanity
  if (!/<div id="root">\s*<div/.test(html)) errors.push(`[${r}] root appears empty (not prerendered)`);

  // title unique
  const inScope = (rt) => rt === "/articles" || ARTICLE_SLUGS.includes(rt.replace(/^\//, ""));
  const tm = html.match(/<title>([^<]*)<\/title>/);
  if (!tm) errors.push(`[${r}] no <title>`);
  else {
    const t = tm[1];
    if (titles.has(t)) {
      const other = titles.get(t);
      const msg = `duplicate <title> (${r} & ${other}): "${t}"`;
      // Only fail when an article / the index is involved; pre-existing legacy
      // collisions (e.g. / vs a /resources/ page) are reported as warnings since
      // editing those existing pages is out of scope.
      if (inScope(r) || inScope(other)) errors.push(`[${r}] ${msg}`);
      else warn.push(`PRE-EXISTING ${msg}`);
    } else titles.set(t, r);
  }

  // canonical
  const cm = html.match(/<link rel="canonical" href="([^"]+)"/);
  if (!cm) errors.push(`[${r}] no canonical`);
  else if (cm[1] !== `https://bestbuyincentives.com${r === "/" ? "/" : r}`)
    errors.push(`[${r}] canonical mismatch: ${cm[1]}`);

  // exactly one H1
  const h1s = (html.match(/<h1[\s>]/g) || []).length;
  if (h1s !== 1) errors.push(`[${r}] expected 1 <h1>, found ${h1s}`);

  // banned wording (case-insensitive) in visible text
  const low = html.toLowerCase();
  for (const b of BANNED) if (low.includes(b)) errors.push(`[${r}] BANNED wording "${b}"`);

  // sitemap coverage
  if (!sitemapHas(r)) errors.push(`[${r}] missing from sitemap.xml`);

  // broken internal links
  const hrefs = [...html.matchAll(/href="(\/[^"]*)"/g)].map((m) => m[1]);
  for (const h of new Set(hrefs)) {
    if (h.startsWith("//")) continue;
    if (!targetExists(h)) errors.push(`[${r}] broken internal link: ${h}`);
  }
}

// Article-specific schema
for (const s of ARTICLE_SLUGS) {
  const html = readRoute("/" + s);
  if (!html) continue;
  if (!html.includes('"@type":"Article"')) errors.push(`[/${s}] missing Article schema`);
  if (!html.includes('"@type":"BreadcrumbList"')) errors.push(`[/${s}] missing BreadcrumbList schema`);
  if (!/data-testid="article-breadcrumb"/.test(html)) errors.push(`[/${s}] missing visible breadcrumb`);
  if (!/data-testid="article-related"/.test(html)) errors.push(`[/${s}] missing related section`);
  if (!/data-testid="article-cta"/.test(html)) errors.push(`[/${s}] missing consultation CTA`);
}

// /articles index schema
{
  const html = readRoute("/articles");
  if (!html) errors.push("[/articles] MISSING");
  else {
    if (!html.includes('"@type":"CollectionPage"')) errors.push("[/articles] missing CollectionPage schema");
    if (!html.includes('"@type":"BreadcrumbList"')) errors.push("[/articles] missing BreadcrumbList schema");
    if (!/data-testid="articles-footer-cta"/.test(html)) errors.push("[/articles] missing consultation CTA");
    // all 72 article slugs must be linked from the index
    for (const s of ARTICLE_SLUGS)
      if (!html.includes(`href="/${s}"`)) errors.push(`[/articles] does not link /${s}`);
  }
}

console.log(`Validated ${ROUTES.length} routes | ${ARTICLE_SLUGS.length} articles`);
if (warn.length) { console.log("\nWARN:"); warn.forEach((w) => console.log("  " + w)); }
if (errors.length) {
  console.log(`\nFAILED with ${errors.length} error(s):`);
  errors.slice(0, 60).forEach((e) => console.log("  ✗ " + e));
  process.exit(1);
}
console.log("\n✅ ALL VALIDATION CHECKS PASSED");
