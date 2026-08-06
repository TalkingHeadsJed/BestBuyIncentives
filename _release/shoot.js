const puppeteer = require("puppeteer-core");
const CHROME = process.env.CHROME_PATH || "/usr/bin/google-chrome";
const BASE = "http://localhost:4180";
const OUT = "/app/_release/screenshots";
const fs = require("fs");
fs.mkdirSync(OUT, { recursive: true });

const shots = [
  ["home", "/"],
  ["article", "/sales-closing-techniques-high-ticket-purchases/"],
  ["vertical", "/industries/jewelry-stores/"],
  ["contact", "/contact/"],
  ["legal-privacy", "/privacy/"],
];

(async () => {
  const browser = await puppeteer.launch({
    executablePath: CHROME, headless: "new",
    args: ["--no-sandbox","--disable-setuid-sandbox","--disable-dev-shm-usage","--disable-gpu"],
  });
  for (const [name, path] of shots) {
    for (const [dev, w, h] of [["desktop",1440,900],["mobile",390,844]]) {
      const page = await browser.newPage();
      await page.setViewport({ width: w, height: h });
      const errs = [];
      page.on("pageerror", e => errs.push(String(e)));
      await page.goto(BASE + path, { waitUntil: "networkidle2", timeout: 45000 }).catch(e=>errs.push("nav:"+e.message));
      await new Promise(r=>setTimeout(r,1200));
      const file = `${OUT}/${name}-${dev}.png`;
      await page.screenshot({ path: file, fullPage: false });
      const h1 = await page.evaluate(()=>document.querySelector("h1")?.innerText?.slice(0,60)||"(none)");
      console.log(`${name}-${dev}: h1="${h1}" errs=${errs.length}`);
      await page.close();
    }
  }
  await browser.close();
  console.log("screenshots ->", OUT);
})().catch(e=>{console.error(e);process.exit(1);});
