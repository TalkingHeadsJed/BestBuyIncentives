const puppeteer = require("puppeteer-core");
const CHROME = process.env.CHROME_PATH || "/usr/bin/google-chrome";
const routes = [
  "/travel-incentives-vs-discounting",
  "/travel-incentives-vs-gift-cards",
  "/travel-incentives-vs-cash-rebates",
  "/",
  "/faq",
];
(async () => {
  const browser = await puppeteer.launch({
    executablePath: CHROME,
    headless: "new",
    args: ["--no-sandbox", "--disable-setuid-sandbox", "--disable-dev-shm-usage", "--disable-gpu"],
  });
  let bad = 0;
  for (const r of routes) {
    const page = await browser.newPage();
    const errs = [];
    page.on("console", (m) => { if (m.type() === "error") errs.push(m.text()); });
    page.on("pageerror", (e) => errs.push(String(e)));
    await page.goto(`http://localhost:4180${r}/`.replace("//?", "/"), { waitUntil: "networkidle2", timeout: 45000 }).catch(() => {});
    await new Promise((res) => setTimeout(res, 1500));
    const hydration = errs.filter((e) => /418|423|425|hydrat|did not match|Minified React error/i.test(e));
    if (hydration.length) { bad++; console.log(`✗ ${r}`); hydration.forEach((e) => console.log("   " + e.slice(0, 160))); }
    else console.log(`✓ ${r} clean`);
    await page.close();
  }
  await browser.close();
  console.log(bad ? `\nFAILED: ${bad} route(s) with hydration errors` : "\nALL CLEAN");
  process.exit(bad ? 1 : 0);
})();
