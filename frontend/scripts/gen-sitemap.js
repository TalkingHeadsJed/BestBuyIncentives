// Regenerates sitemap.xml from the shared route list so it never drifts.
const fs = require("fs");
const path = require("path");
const { ROUTES } = require("./routes");

const SITE = "https://bestbuyincentives.com";

const priority = (r) =>
  r === "/" ? "1.0"
  : r === "/articles" ? "0.9"
  : r.startsWith("/resources/") ? "0.6"
  : r === "/programs" ? "0.9"
  : /^\/[a-z0-9-]+$/.test(r) && !["/about","/programs","/industries","/case-studies","/resources","/faq","/contact","/privacy","/terms","/compliance","/articles"].includes(r) ? "0.7"
  : "0.8";
const changefreq = (r) => (r === "/" || r === "/resources" || r === "/articles" ? "weekly" : "monthly");

const urls = ROUTES.map(
  (r) =>
    `  <url>\n    <loc>${SITE}${r === "/" ? "/" : r}</loc>\n    <changefreq>${changefreq(
      r
    )}</changefreq>\n    <priority>${priority(r)}</priority>\n  </url>`
).join("\n");

const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;

for (const target of [
  path.join(__dirname, "..", "build", "sitemap.xml"),
  path.join(__dirname, "..", "public", "sitemap.xml"),
]) {
  try {
    fs.writeFileSync(target, xml);
  } catch (_) {}
}
console.log("\u2713 sitemap generated with", ROUTES.length, "urls");
