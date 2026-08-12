// Build-time prerenderer: renders every route to <route>/index.html with fully
// hydrated HTML (real headings, body copy, links, footer) + per-route <head>.
// Runs entirely in the build container using the system Chrome.

const path = require("path");
const fs = require("fs");
const http = require("http");
const handler = require("serve-handler");
const puppeteer = require("puppeteer-core");
const { ROUTES } = require("./routes");

const BUILD_DIR = path.join(__dirname, "..", "build");
const PORT = 4173;
const CHROME = process.env.CHROME_PATH || "/usr/bin/google-chrome";

(async () => {
  // Preserve a pristine copy of the CRA shell. The SPA fallback must serve THIS
  // (empty <head>) and never an already-prerendered page, or routes would inherit
  // a previous page's baked-in title/canonical/meta tags.
  const shellPath = path.join(BUILD_DIR, "__shell.html");
  fs.copyFileSync(path.join(BUILD_DIR, "index.html"), shellPath);

  // Static server that serves the CRA build; unknown paths fall back to the shell.
  const server = http.createServer((req, res) =>
    handler(req, res, {
      public: BUILD_DIR,
      rewrites: [{ source: "**", destination: "/__shell.html" }],
    })
  );
  await new Promise((resolve) => server.listen(PORT, resolve));

  const browser = await puppeteer.launch({
    executablePath: CHROME,
    headless: "new",
    args: [
      "--no-sandbox",
      "--disable-setuid-sandbox",
      "--disable-dev-shm-usage",
      "--disable-gpu",
    ],
  });

  for (const route of ROUTES) {
    const page = await browser.newPage();
    await page.setViewport({ width: 1440, height: 900 });

    // Flag prerendering so client-only widgets stay in their static/empty state,
    // keeping the snapshot identical to React's first client render (clean hydration).
    await page.evaluateOnNewDocument(() => {
      window.__PRERENDER__ = true;
    });

    // Skip heavy media so network settles quickly; markup is unaffected.
    await page.setRequestInterception(true);
    page.on("request", (req) => {
      if (req.resourceType() === "media") return req.abort();
      // Don't fire the analytics pixel from the build container; the <script>
      // tag still serializes into the prerendered HTML for real visitors.
      if (/idpixel\.app/.test(req.url())) return req.abort();
      return req.continue();
    });

    const url = `http://localhost:${PORT}${route}`;
    try {
      await page.goto(url, { waitUntil: "networkidle2", timeout: 60000 });
    } catch (e) {
      await page.goto(url, { waitUntil: "domcontentloaded", timeout: 60000 });
    }
    // Wait for the app to render real content + let react-helmet flush the <head>.
    await page.waitForSelector("#root h1", { timeout: 20000 }).catch(() => {});
    await new Promise((r) => setTimeout(r, 900));

    let html = await page.content();
    if (!/^<!doctype html>/i.test(html)) html = "<!doctype html>\n" + html;

    // React does NOT serialize the `muted` boolean attribute into prerendered HTML,
    // which blocks autoplay of autoplay videos on the deployed static site. Re-inject
    // `muted` into every <video> tag that has `autoplay` but is missing `muted`.
    html = html.replace(/<video\b([^>]*)>/gi, (match, attrs) => {
      if (/\bautoplay\b/i.test(attrs) && !/\bmuted\b/i.test(attrs)) {
        return `<video${attrs} muted>`;
      }
      return match;
    });

    const outDir = route === "/" ? BUILD_DIR : path.join(BUILD_DIR, route);
    fs.mkdirSync(outDir, { recursive: true });
    fs.writeFileSync(path.join(outDir, "index.html"), html);
    console.log("\u2713 prerendered", route);
    await page.close();
  }

  await browser.close();
  server.close();
  try {
    fs.unlinkSync(shellPath);
  } catch (_) {}
  console.log("\nPrerendered", ROUTES.length, "routes.");
})().catch((e) => {
  console.error(e);
  process.exit(1);
});
