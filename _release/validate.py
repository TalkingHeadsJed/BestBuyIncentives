#!/usr/bin/env python3
import re, json, pathlib, collections

SITE = pathlib.Path("/app/static-site")
REL = pathlib.Path("/app/_release")
manifest = json.loads((REL/"all91/bundle-manifest.json").read_text())
overlay_routes = [p["destination_url"] for p in manifest["pages"]]
react_routes = ["/contact", "/privacy", "/terms", "/compliance"]

EDITORIAL = ["Suggested internal links", "Required tracking", "Required child pages",
             "Form fields", "Thank-you state", "Thank-you page", "TODO", "Lorem ipsum",
             "Primary CTA:", "Secondary CTA:", "Target keyword", "Meta description:", "Slug:"]
PROHIBITED = ["free vacation", "vacation incentive", "vacation certificate"]

def rel_to_file(url):
    if url == "/":
        return SITE/"index.html"
    return SITE/url.strip("/")/"index.html"

report = {"routes": [], "issues": [], "titles": {}, "summary": {}}
titles = collections.Counter()

for url in overlay_routes + react_routes:
    f = rel_to_file(url)
    r = {"url": url, "file": str(f.relative_to(SITE)), "exists": f.exists()}
    if not f.exists():
        r["status"] = "MISSING"; report["issues"].append(f"MISSING file for {url}")
        report["routes"].append(r); continue
    html = f.read_text(encoding="utf-8", errors="ignore")
    title = (re.search(r"<title>(.*?)</title>", html, re.S) or [None, ""])[1].strip()
    h1s = re.findall(r"<h1[\s>]", html)
    canon = re.search(r'<link rel="canonical" href="([^"]*)"', html)
    r["title"] = title
    r["h1_count"] = len(h1s)
    r["canonical"] = canon.group(1) if canon else None
    r["has_cta_contact"] = ('href="/contact' in html)
    r["has_pixel"] = ("idpixel.app" in html)
    r["approved_term"] = ("discounted travel voucher" in html.lower())
    leaks = [e for e in EDITORIAL if e.lower() in html.lower()]
    proh = [p for p in PROHIBITED if p.lower() in html.lower()]
    r["editorial_leaks"] = leaks
    r["prohibited_terms"] = proh
    titles[title] += 1
    # gate checks
    if len(h1s) != 1: report["issues"].append(f"{url}: h1_count={len(h1s)}")
    if not title: report["issues"].append(f"{url}: missing title")
    if not r["canonical"]: report["issues"].append(f"{url}: missing canonical")
    if not r["has_cta_contact"]: report["issues"].append(f"{url}: no /contact CTA")
    if not r["has_pixel"]: report["issues"].append(f"{url}: missing pixel")
    if leaks: report["issues"].append(f"{url}: EDITORIAL LEAK {leaks}")
    if proh: report["issues"].append(f"{url}: PROHIBITED TERM {proh}")
    report["routes"].append(r)

# duplicate titles
dupes = {t: c for t, c in titles.items() if c > 1}
if dupes: report["issues"].append(f"DUPLICATE titles: {dupes}")

# sitemap integrity
sm = (SITE/"sitemap.xml").read_text()
locs = re.findall(r"<loc>https://bestbuyincentives.com(.*?)</loc>", sm)
missing_sm = [l for l in locs if not rel_to_file(l).exists()]
if missing_sm: report["issues"].append(f"sitemap URLs with no file: {missing_sm}")

# redirect destinations exist
csv = (REL/"all91/redirects-all-91.csv").read_text().splitlines()[1:]
redir_missing = []
for line in csv:
    parts = line.split(",")
    if len(parts) < 2: continue
    dest = parts[1]
    if dest.endswith(".xml"): continue
    if not rel_to_file(dest).exists(): redir_missing.append(dest)
if redir_missing: report["issues"].append(f"redirect targets missing: {redir_missing}")

# playbook pdf
pdf = SITE/"downloads/BestBuyIncentives_High-Ticket_Closing_Playbook.pdf"
report["summary"]["playbook_pdf_present"] = pdf.exists()
report["summary"]["playbook_links_pdf"] = ('BestBuyIncentives_High-Ticket_Closing_Playbook.pdf' in (SITE/"high-ticket-closing-playbook/index.html").read_text())

report["summary"].update({
    "total_routes_checked": len(report["routes"]),
    "overlay_routes": len(overlay_routes),
    "react_routes": len(react_routes),
    "unique_titles": len(titles),
    "sitemap_locs": len(locs),
    "issues_count": len(report["issues"]),
})

(REL/"validation-report.json").write_text(json.dumps(report, indent=2))
print(json.dumps(report["summary"], indent=2))
print("\nISSUES (" + str(len(report["issues"])) + "):")
for i in report["issues"][:50]:
    print(" -", i)
