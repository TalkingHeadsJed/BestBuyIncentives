#!/usr/bin/env python3
"""Assemble the hybrid Priority-13/All-91 static-site deliverable."""
import os, re, shutil, pathlib

ROOT = "/app"
REL = f"{ROOT}/_release"
OVERLAY = f"{REL}/all91"
APIZIP = f"{REL}/api"
BUILD = f"{ROOT}/frontend/build"
SITE = f"{ROOT}/static-site"
PRIVATE = f"{ROOT}/deploy-private"
PIXEL = '<script src="https://cdn.idpixel.app/v1/idp-analytics-6a6259b025409f3b40903a4f.min.js" defer></script>'

# 1. Fresh static-site from the overlay (primary site).
if os.path.exists(SITE):
    shutil.rmtree(SITE)
shutil.copytree(OVERLAY, SITE)

# 2. Remove editorial/manifest docs that must NOT ship publicly.
for junk in ["VISUAL_QA.md", "bundle-manifest.json", "validation-latest.json", "redirects-all-91.csv"]:
    p = os.path.join(SITE, junk)
    if os.path.exists(p):
        os.remove(p)

# 3. Overlay React build output for the retained interactive routes + assets.
shutil.copytree(f"{BUILD}/static", f"{SITE}/static", dirs_exist_ok=True)
shutil.copytree(f"{BUILD}/images", f"{SITE}/images", dirs_exist_ok=True)
for route in ["contact", "privacy", "terms", "compliance"]:
    shutil.copytree(f"{BUILD}/{route}", f"{SITE}/{route}", dirs_exist_ok=True)
for f in ["favicon.ico", "manifest.json", "asset-manifest.json"]:
    src = f"{BUILD}/{f}"
    if os.path.exists(src):
        shutil.copy2(src, f"{SITE}/{f}")

# 4. Package the first-party PHP API into public /api (hidden .htaccess included).
shutil.copytree(f"{APIZIP}/api", f"{SITE}/api", dirs_exist_ok=True)

# 5. Cron worker + env template + README go OUTSIDE public_html.
if os.path.exists(PRIVATE):
    shutil.rmtree(PRIVATE)
os.makedirs(f"{PRIVATE}/cron", exist_ok=True)
shutil.copy2(f"{APIZIP}/cron/process-consultation-queue.php", f"{PRIVATE}/cron/")
shutil.copy2(f"{APIZIP}/PRIVATE_ENVIRONMENT.example", f"{PRIVATE}/")
shutil.copy2(f"{APIZIP}/README.md", f"{PRIVATE}/API_README.md")
if os.path.exists(f"{APIZIP}/tests/runtime-acceptance.mjs"):
    os.makedirs(f"{PRIVATE}/tests", exist_ok=True)
    shutil.copy2(f"{APIZIP}/tests/runtime-acceptance.mjs", f"{PRIVATE}/tests/")

# 6. Inject the Audience Lab pixel into every HTML page that doesn't already have it.
injected = 0
for path in pathlib.Path(SITE).rglob("*.html"):
    html = path.read_text(encoding="utf-8", errors="ignore")
    if "idpixel.app" in html:
        continue
    if "</head>" in html:
        html = html.replace("</head>", f"    {PIXEL}\n</head>", 1)
        path.write_text(html, encoding="utf-8")
        injected += 1
print(f"pixel injected into {injected} overlay/404 pages")

# 7. Sitemap: overlay 91 canonical URLs + the retained React routes.
sitemap = pathlib.Path(SITE, "sitemap.xml").read_text()
extra = ""
for r, pr in [("/contact", "0.9"), ("/privacy", "0.3"), ("/terms", "0.3"), ("/compliance", "0.3")]:
    extra += (f"  <url>\n    <loc>https://bestbuyincentives.com{r}</loc>\n"
              f"    <changefreq>monthly</changefreq>\n    <priority>{pr}</priority>\n  </url>\n")
sitemap = sitemap.replace("</urlset>", extra + "</urlset>")
pathlib.Path(SITE, "sitemap.xml").write_text(sitemap)

# 8. robots.txt referencing the canonical sitemap.
pathlib.Path(SITE, "robots.txt").write_text(
    "User-agent: *\nAllow: /\n\n"
    "Sitemap: https://bestbuyincentives.com/sitemap.xml\n"
)
print("assembly complete")
