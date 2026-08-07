// Normalize every article's bodyHtml to the EXACT string the browser produces
// when it parses + re-serializes innerHTML. This guarantees the prerendered
// snapshot (captured via puppeteer page.content()) is byte-identical to what
// React sets via dangerouslySetInnerHTML on the client -> clean hydration (no #418).
const fs = require("fs");
const path = require("path");
const puppeteer = require("puppeteer-core");
const CHROME = process.env.CHROME_PATH || "/usr/bin/google-chrome";
const DATA = path.join(__dirname, "..", "src", "data", "articles.js");

(async () => {
  const src = fs.readFileSync(DATA, "utf-8");
  const start = src.indexOf("[");
  const end = src.lastIndexOf("]") + 1;
  const data = JSON.parse(src.slice(start, end));

  const browser = await puppeteer.launch({
    executablePath: CHROME,
    headless: "new",
    args: ["--no-sandbox", "--disable-setuid-sandbox", "--disable-dev-shm-usage", "--disable-gpu"],
  });
  const page = await browser.newPage();
  await page.setContent("<!doctype html><html><body><div id=x></div></body></html>");

  let changed = 0;
  for (const a of data) {
    if (!a.bodyHtml) continue;
    const normalized = await page.evaluate((html) => {
      const d = document.getElementById("x");
      d.innerHTML = html;
      return d.innerHTML;
    }, a.bodyHtml);
    if (normalized !== a.bodyHtml) changed++;
    a.bodyHtml = normalized;
  }
  await browser.close();

  let out = "// AUTO-GENERATED from the 72 approved V2 sales-first articles (content only).\n";
  out += "export const ARTICLES = " + JSON.stringify(data, null, 0) + ";\n";
  out += "export const ARTICLE_SLUGS = ARTICLES.map((a) => a.slug);\n";
  fs.writeFileSync(DATA, out, "utf-8");
  console.log("bodyHtml normalized. changed:", changed, "of", data.length);
})();
