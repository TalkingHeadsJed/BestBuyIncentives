#!/usr/bin/env python3
"""Enrich the article registry for the SEO pass (invention-free):
 - hub: from the CSV primary_hub target (authoritative cluster membership)
 - datePublished/dateModified: the real first-authored date of these articles
   in this repo (git: 2026-08-07). No invented historical dates.
 - seoTitle: shorter SERP title only where `<title> | BestBuyIncentives` > 65 chars.
   3 authoritative shortenings from the checklist; others front-load intent by
   trimming at a word boundary (visible H1 = original `title`, unchanged)."""
import csv, json, re, pathlib
REG = pathlib.Path("/app/frontend/src/data/articles.json")
CSV = "/tmp/seo/LINKMAP.csv"
DATE = "2026-08-07"  # real first-live/authored date (this repo), per deployment records
SUFFIX = " | BestBuyIncentives"

def norm(u):
    u = u.split("#")[0].split("?")[0]
    return u[:-1] if (u != "/" and u.endswith("/")) else u

rows = list(csv.DictReader(open(CSV)))
hub_of = {}
for r in rows:
    if r["link_type"] == "primary_hub":
        hub_of[norm(r["source_url"]).lstrip("/")] = norm(r["target_url"]).split("/")[-1]

# authoritative short titles from CLAUDE checklist section E
OVERRIDE = {
    "dealer-groups-measure-customer-incentive-campaign": "Measure Dealer Incentive Campaigns",
    "furniture-store-promotion-ideas-beyond-discounts": "Furniture Promotions Beyond Discounts",
    "choose-vertical-for-customer-incentive-campaign": "Choose the Right Incentive Campaign Vertical",
}

def shorten(title, limit=45):
    if len(title) <= limit:
        return title
    cut = title[:limit]
    if " " in cut:
        cut = cut[:cut.rfind(" ")]
    return re.sub(r"[\s\-–—,:]+$", "", cut)

data = json.load(open(REG))
n_hub = n_seo = 0
for a in data:
    s = a["slug"]
    if s in hub_of:
        a["hub"] = hub_of[s]; n_hub += 1
    a["datePublished"] = DATE
    a["dateModified"] = DATE
    rendered = a["title"] + SUFFIX
    if s in OVERRIDE:
        a["seoTitle"] = OVERRIDE[s]; n_seo += 1
    elif len(rendered) > 65:
        a["seoTitle"] = shorten(a["title"]); n_seo += 1

REG.write_text(json.dumps(data, ensure_ascii=False, indent=0) + "\n", encoding="utf-8")
from collections import Counter
print("hub assigned:", n_hub, "/", len(data), "| seoTitle set:", n_seo)
print("hub distribution:", dict(Counter(a.get("hub") for a in data)))
missing = [a["slug"] for a in data if "hub" not in a]
print("articles WITHOUT hub:", missing if missing else "none")
