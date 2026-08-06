#!/usr/bin/env python3
import re, pathlib
SITE = pathlib.Path("/app/static-site")
# <p><strong>Primary CTA: LABEL</strong> → <code>URL</code></p>  ->  real button
pat = re.compile(
    r'<p>\s*<strong>\s*(?:Primary|Secondary)\s+CTA:\s*(?P<label>.*?)\s*</strong>\s*(?:&rarr;|→|-&gt;|->)\s*<code>\s*(?P<url>[^<]*?)\s*</code>\s*</p>',
    re.S)
total = 0
for f in SITE.rglob("*.html"):
    html = f.read_text(encoding="utf-8", errors="ignore")
    if "Primary CTA" not in html and "Secondary CTA" not in html:
        continue
    new, n = pat.subn(
        lambda m: f'<p><a class="button" data-position="body" href="{m.group("url")}">{m.group("label")}</a></p>',
        html)
    if n:
        f.write_text(new, encoding="utf-8")
        total += n
        print(f"{f.relative_to(SITE)}: {n} CTA note(s) -> button")
print("total replaced:", total)
# leftover check
left = [str(f.relative_to(SITE)) for f in SITE.rglob("*.html")
        if "Primary CTA" in f.read_text(errors="ignore") or "Secondary CTA" in f.read_text(errors="ignore")]
print("pages still containing the label:", left)
