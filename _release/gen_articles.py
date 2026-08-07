#!/usr/bin/env python3
"""Extract CONTENT ONLY from the 72 V2 sales-first articles and emit React data.
Strips V2 layout/header/footer/CSS and '## Video transcript' sections.
Rewrites internal links to targets that exist in original-site (else unwraps)."""
import re, json, html, pathlib

V2 = pathlib.Path("/app/_release/v2")
slugs = [s for s in pathlib.Path("/tmp/articles72.txt").read_text().split() if s]

# Targets that exist in the original-site React app (root-slug articles added below).
EXISTING = {"", "about", "programs", "industries", "case-studies", "resources", "faq",
            "contact", "privacy", "terms", "compliance",
            "travel-incentives-vs-discounting", "travel-incentives-vs-gift-cards",
            "travel-incentives-vs-cash-rebates"}
RES_SLUGS = {"stop-discounting-start-closing", "the-buyers-remorse-killer",
             "how-to-position-a-vacation-incentive-in-a-close",
             "compensation-plans-that-actually-motivate",
             "running-a-21-day-blitz-campaign",
             "differentiating-on-experience-not-price"}
VALID = EXISTING | set(slugs)

def norm(href):
    m = re.match(r"^/([^?#]*)", href or "")
    if not m:
        return None
    return m.group(1).rstrip("/")

def rewrite_links(fragment):
    """Keep <a> only if target exists; else unwrap to plain text."""
    def repl(m):
        href = m.group("href"); inner = m.group("inner")
        t = norm(href)
        if t is None:
            return inner
        if t in RES_SLUGS:
            return f'<a href="/resources/{t}">{inner}</a>'
        if t in VALID:
            return f'<a href="/{t}">{inner}</a>'
        # external links stay as-is
        if href.startswith("http") or href.startswith("mailto") or href.startswith("tel"):
            return m.group(0)
        return inner  # unwrap unknown internal target
    return re.sub(r'<a [^>]*href="(?P<href>[^"]*)"[^>]*>(?P<inner>.*?)</a>', repl, fragment, flags=re.S)

articles = []
issues = []

# Category taxonomy (keyword precedence). Keep in sync with _release/build_registry.py.
CAT_RULES = [
    ("Industry Playbooks", ["car-dealership", "car-sales", "dealership", "dealer-groups",
        "dealerships", "boat-rv", "furniture", "jewelry", "jewelers", "roofing", "hvac",
        "home-improvement", "window-remodeling", "wedding-event", "marketing-agencies",
        "in-home", "service-lane"]),
    ("Travel Vouchers", ["travel-voucher", "travel-vouchers", "discounted-travel-voucher",
        "discounted-travel-vouchers", "how-discounted-travel", "evaluate-discounted-travel",
        "explain-discounted-travel", "present-discounted-travel", "launch-customer-travel",
        "train-sales-team-to-present-travel"]),
    ("Objection Handling", ["objection", "handle-", "shop-around", "think-about-it",
        "your-price-is-too-high", "asks-for-a-discount", "price-objection", "resolve-an-objection"]),
    ("Metrics & ROI", ["close-rate", "conversion-rate", "measure", "-roi", "metrics",
        "sales-velocity", "cost-of-delay", "margin-leakage", "discount-frequency",
        "calculate-sales-close", "recipient-costs", "true-cost-of-discounting"]),
    ("Closing Techniques", ["closing", "close-more", "trial-close", "ask-for-the-sale",
        "urgency", "reason-to-buy", "revive-a-deal", "stall", "shorten", "limited-time",
        "scarcity", "sales-cycle", "buy-now"]),
]
def categorize(slug):
    for cat, kws in CAT_RULES:
        if any(kw in slug for kw in kws):
            return cat
    return "Incentive Strategy"

for slug in slugs:
    h = (V2/slug/"index.html").read_text(encoding="utf-8", errors="ignore")
    def unesc(s):
        # Fully decode HTML entities (handles double-encoding like &amp;#39;).
        prev = None
        while s != prev:
            prev = s
            s = html.unescape(s)
        return s
    title = unesc(re.search(r"<title>(.*?)</title>", h, re.S).group(1).strip())
    desc = unesc((re.search(r'<meta name="description" content="([^"]*)"', h) or [None, ""])[1].strip())
    canon = (re.search(r'<link rel="canonical" href="([^"]*)"', h) or [None, ""])[1]
    h1 = unesc(re.sub(r"<[^>]+>", "", re.search(r"<h1[^>]*>(.*?)</h1>", h, re.S).group(1)).strip())
    eyebrow_m = re.search(r'<div class="eyebrow">(.*?)</div>', h, re.S)
    eyebrow = unesc(re.sub(r"<[^>]+>", "", eyebrow_m.group(1)).strip()) if eyebrow_m else "High-ticket sales closing tools"

    body = re.search(r'<article[^>]*>(.*?)</article>', h, re.S).group(1)
    # strip Video transcript section (from that h2 to end)
    body = re.split(r'<h2[^>]*>\s*Video transcript\s*</h2>', body, flags=re.I)[0]
    # extract + remove the inline "Related reading:" paragraph
    related = []
    rel_m = re.search(r'<p>\s*Related reading:.*?</p>', body, re.S | re.I)
    if rel_m:
        for a in re.finditer(r'<a [^>]*href="([^"]*)"[^>]*>(.*?)</a>', rel_m.group(0), re.S):
            t = norm(a.group(1))
            label = re.sub(r"<[^>]+>", "", a.group(2)).strip()
            if t in RES_SLUGS:
                related.append({"to": f"/resources/{t}", "label": label})
            elif t in VALID and t:
                related.append({"to": f"/{t}", "label": label})
        body = body.replace(rel_m.group(0), "")
    body = rewrite_links(body).strip()

    low = re.sub(r"<[^>]+>", " ", body + " " + title + " " + desc).lower()
    for bad in ("free vacation", "vacation incentive", "vacation certificate"):
        if bad in low:
            issues.append(f"{slug}: PROHIBITED '{bad}'")
    if "discounted travel voucher" not in low:
        issues.append(f"{slug}: product term missing")
    if "<h1" in body:
        issues.append(f"{slug}: body contains an H1")

    articles.append({"slug": slug, "title": title, "description": desc, "h1": h1,
                     "eyebrow": eyebrow, "category": categorize(slug),
                     "excerpt": desc, "bodyHtml": body})

# Write the authoritative registry as JSON. NOTE: after (re)generating, run
#   node scripts/normalize-bodyhtml.js
# to entity-normalize bodyHtml so prerender hydrates cleanly (see docs).
pathlib.Path("/app/frontend/src/data/articles.json").write_text(
    json.dumps(articles, ensure_ascii=False, indent=0) + "\n", encoding="utf-8")

print("registry written: src/data/articles.json — articles:", len(articles))
print("issues:", issues if issues else "none")
from collections import Counter
for c, n in Counter(a["category"] for a in articles).most_common():
    print(f"  {n:3}  {c}")
