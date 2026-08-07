#!/usr/bin/env python3
import re, json, pathlib
SITE = pathlib.Path("/app/static-site")
manifest = json.loads(pathlib.Path("/app/_release/v2/bundle-manifest.json").read_text())
routes = [p["destination_url"] for p in manifest["pages"]]

BENEFIT = [
    "close more", "close rate", "close the sale", "closing advantage", "closing tool",
    "protect margin", "protects margin", "protect your margin", "preserve margin", "margin",
    "differentiat", "memorable", "add value", "adds value", "added value",
    "without discounting", "without lowering", "without cutting", "urgency", "reason to buy",
    "profit", "win the", "stand out", "higher-value", "high-ticket", "increase sales",
    "drive sales", "competitive edge", "buy now", "boost", "grow revenue", "revenue",
]
PROHIBITED = ["free vacation", "vacation incentive", "vacation certificate"]

def f(url):
    return SITE/"index.html" if url == "/" else SITE/url.strip("/")/"index.html"

rows, fails = [], []
for url in routes:
    p = f(url)
    h = p.read_text(encoding="utf-8", errors="ignore")
    low = h.lower()
    # visible text only (strip tags) for term/benefit detection
    text = re.sub(r"<script.*?</script>", " ", low, flags=re.S)
    text = re.sub(r"<style.*?</style>", " ", text, flags=re.S)
    visible = re.sub(r"<[^>]+>", " ", text)
    product = "discounted travel voucher" in visible
    benefit = [b for b in BENEFIT if b in visible]
    consult = ('href="/contact' in low)
    proh = [t for t in PROHIBITED if t in visible]
    ok = product and benefit and consult and not proh
    rows.append({"url": url, "product": product, "benefit_hits": len(benefit),
                 "consultation_path": consult, "prohibited": proh, "pass": ok})
    if not ok:
        fails.append((url, {"product": product, "benefit": len(benefit), "consult": consult, "proh": proh}))

summary = {
    "pages_audited": len(rows),
    "product_present": sum(r["product"] for r in rows),
    "benefit_bridge_present": sum(bool(r["benefit_hits"]) for r in rows),
    "consultation_path_present": sum(r["consultation_path"] for r in rows),
    "prohibited_terms_pages": sum(bool(r["prohibited"]) for r in rows),
    "passed": sum(r["pass"] for r in rows),
    "failed": len(fails),
}
pathlib.Path("/app/_release/sales-content-audit.json").write_text(
    json.dumps({"summary": summary, "rows": rows}, indent=2))
print(json.dumps(summary, indent=2))
print("FAILS:", fails if fails else "none")
