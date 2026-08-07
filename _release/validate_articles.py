#!/usr/bin/env python3
import re, json, pathlib, collections
SITE = pathlib.Path("/app/original-site")
slugs = [s for s in pathlib.Path("/tmp/articles72.txt").read_text().split() if s]
issues = []; titles = collections.Counter()
for slug in slugs:
    f = SITE/slug/"index.html"
    if not f.exists():
        issues.append(f"{slug}: MISSING"); continue
    h = f.read_text(errors="ignore")
    title = (re.search(r"<title>(.*?)</title>", h, re.S) or [None, ""])[1].strip()
    desc = re.search(r'<meta name="description" content="([^"]*)"', h)
    canon = re.search(r'<link rel="canonical" href="([^"]*)"', h)
    og = re.search(r'<meta property="og:title"', h)
    tw = re.search(r'<meta name="twitter:card"', h)
    h1s = re.findall(r"<h1[\s>]", h)
    art = ('"@type":"Article"' in h.replace(" ", ""))
    bc = ('"@type":"BreadcrumbList"' in h.replace(" ", ""))
    cta = ('href="/contact"' in h)
    pixel = ("idpixel.app" in h)
    related = ('data-testid="article-related"' in h) or ('Related reading' in h)
    low = re.sub(r"<[^>]+>", " ", h).lower()
    proh = [t for t in ("free vacation","vacation incentive","vacation certificate") if t in low]
    titles[title]+=1
    if not title: issues.append(f"{slug}: no title")
    if not desc: issues.append(f"{slug}: no description")
    if not (canon and canon.group(1).endswith(f"/{slug}")): issues.append(f"{slug}: canonical wrong ({canon.group(1) if canon else None})")
    if not og: issues.append(f"{slug}: no og")
    if not tw: issues.append(f"{slug}: no twitter")
    if len(h1s)!=1: issues.append(f"{slug}: h1 count={len(h1s)}")
    if not art: issues.append(f"{slug}: no Article schema")
    if not bc: issues.append(f"{slug}: no Breadcrumb schema")
    if not cta: issues.append(f"{slug}: no /contact CTA")
    if not pixel: issues.append(f"{slug}: no pixel")
    if proh: issues.append(f"{slug}: PROHIBITED {proh}")
dupes={t:c for t,c in titles.items() if c>1}
if dupes: issues.append(f"DUPLICATE titles: {dupes}")
# sitemap covers all 72
sm=(SITE/"sitemap.xml").read_text()
for slug in slugs:
    if f"<loc>https://bestbuyincentives.com/{slug}</loc>" not in sm:
        issues.append(f"{slug}: not in sitemap")
print("articles validated:", len(slugs))
print("unique titles:", len(titles))
print("issues:", len(issues))
for i in issues[:40]: print("  -", i)
