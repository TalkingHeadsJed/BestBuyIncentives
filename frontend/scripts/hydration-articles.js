const http = require("http");
const handler = require("serve-handler");
const path = require("path");
const puppeteer = require("puppeteer-core");
const { ARTICLE_SLUGS } = require("./routes");
const CHROME = process.env.CHROME_PATH || "/usr/bin/google-chrome";

(async () => {
  const server = http.createServer((q, r) =>
    handler(q, r, { public: path.join(__dirname, "..", "build") })
  );
  await new Promise((res) => server.listen(4180, res));
  const browser = await puppeteer.launch({
    executablePath: CHROME,
    headless: "new",
    args: ["--no-sandbox", "--disable-setuid-sandbox", "--disable-dev-shm-usage", "--disable-gpu"],
  });
  const { ROUTES } = require("./routes");
  const routes = ROUTES;
  let bad = 0;
  for (const r of routes) {
    const page = await browser.newPage();
    const errs = [];
    page.on("console", (m) => { if (m.type() === "error") errs.push(m.text()); });
    page.on("pageerror", (e) => errs.push(String(e)));
    await page.goto(`http://localhost:4180${r}`, { waitUntil: "networkidle2", timeout: 45000 }).catch(() => {});
    await new Promise((res) => setTimeout(res, 1200));
    const hydration = errs.filter((e) => /418|423|425|hydrat|did not match|Minified React error/i.test(e));
    if (hydration.length) { bad++; console.log(`X ${r}`); hydration.forEach((e) => console.log("   " + e.slice(0, 200))); }
    else console.log(`ok ${r}`);
    await page.close();
  }
  await browser.close();
  server.close();
  console.log(bad ? `\nFAILED: ${bad} route(s) with hydration errors` : `\nALL ${routes.length} CLEAN`);
  process.exit(bad ? 1 : 0);
})();
