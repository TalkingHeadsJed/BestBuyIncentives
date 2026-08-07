#!/usr/bin/env python3
"""One-time migration: current articles.js -> authoritative registry src/data/articles.json.
Adds `category` (keyword rules) + `excerpt`; drops hardcoded `related` (now computed from
category at render/build time). bodyHtml is preserved as-is (already entity-normalized)."""
import json, re, pathlib

SRC = pathlib.Path("/app/frontend/src/data/articles.js")
OUT = pathlib.Path("/app/frontend/src/data/articles.json")

txt = SRC.read_text()
data = json.loads(txt[txt.index("["):txt.rindex("]") + 1])

# Category assignment by keyword precedence. Every article resolves to exactly one.
RULES = [
    ("Industry Playbooks", [
        "car-dealership", "car-sales", "dealership", "dealer-groups", "dealerships",
        "boat-rv", "furniture", "jewelry", "jewelers", "roofing", "hvac",
        "home-improvement", "window-remodeling", "wedding-event", "marketing-agencies",
        "in-home", "service-lane",
    ]),
    ("Travel Vouchers", [
        "travel-voucher", "travel-vouchers", "discounted-travel-voucher",
        "discounted-travel-vouchers", "how-discounted-travel", "evaluate-discounted-travel",
        "explain-discounted-travel", "present-discounted-travel", "launch-customer-travel",
        "train-sales-team-to-present-travel",
    ]),
    ("Objection Handling", [
        "objection", "handle-", "shop-around", "think-about-it", "your-price-is-too-high",
        "asks-for-a-discount", "price-objection", "resolve-an-objection",
    ]),
    ("Metrics & ROI", [
        "close-rate", "conversion-rate", "measure", "-roi", "metrics", "sales-velocity",
        "cost-of-delay", "margin-leakage", "discount-frequency", "calculate-sales-close",
        "recipient-costs", "true-cost-of-discounting",
    ]),
    ("Closing Techniques", [
        "closing", "close-more", "trial-close", "ask-for-the-sale", "urgency",
        "reason-to-buy", "revive-a-deal", "stall", "shorten", "limited-time", "scarcity",
        "sales-cycle", "buy-now",
    ]),
]
FALLBACK = "Incentive Strategy"

def categorize(slug):
    for cat, kws in RULES:
        if any(kw in slug for kw in kws):
            return cat
    return FALLBACK

registry = []
for a in data:
    slug = a["slug"]
    registry.append({
        "slug": slug,
        "title": a["title"],
        "description": a["description"],
        "h1": a.get("h1") or a["title"],
        "eyebrow": a.get("eyebrow") or "High-ticket sales closing tools",
        "category": categorize(slug),
        "excerpt": a["description"],
        "bodyHtml": a["bodyHtml"],
    })

OUT.write_text(json.dumps(registry, ensure_ascii=False, indent=0) + "\n", encoding="utf-8")

from collections import Counter
dist = Counter(a["category"] for a in registry)
print("registry written:", OUT, "articles:", len(registry))
for c, n in dist.most_common():
    print(f"  {n:3}  {c}")
