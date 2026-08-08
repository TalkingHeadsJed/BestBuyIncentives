#!/usr/bin/env python3
"""Insert the validated contextual internal links (SEO_CONTEXTUAL_INTERNAL_LINK_MAP_72.csv)
into article bodyHtml as natural in-context sentences. conversion_cta rows are satisfied by
the article's existing final CTA (not inserted). Enforces: no self-links, max 2 links per
target per page, no duplicate href already present in the same paragraph."""
import csv, json, re, pathlib, html
REG = pathlib.Path("/app/frontend/src/data/articles.json")
CSV = "/tmp/seo/LINKMAP.csv"

def norm(u):
    u = u.split("#")[0].split("?")[0]
    return u[:-1] if (u != "/" and u.endswith("/")) else u

TEMPLATES = {
    "primary_hub": ' For the complete framework, see our <a href="{t}">{a}</a>.',
    "transactional_owner": ' Teams ready to act can explore <a href="{t}">{a}</a>.',
    "same_cluster_sibling": ' It also helps to read <a href="{t}">{a}</a>.',
    "proof_or_process": ' For a worked example, see <a href="{t}">{a}</a>.',
    "proof": ' For a documented result, see <a href="{t}">{a}</a>.',
    "vertical_money_page": ' This applies directly to <a href="{t}">{a}</a>.',
    "related_vertical_page": ' See also <a href="{t}">{a}</a>.',
}
DEFAULT_TPL = ' Related: <a href="{t}">{a}</a>.'

arts = {a["slug"]: a for a in json.load(open(REG))}
rows = list(csv.DictReader(open(CSV)))

inserted = 0
skipped_cta = 0
unmatched = []
per_target = {}  # (slug,target) -> count

def find_section_p_end(body, section):
    """Return index of </p> of the first <p> after the heading whose text == section."""
    m = re.search(r"<h[23][^>]*>\s*" + re.escape(section) + r"\s*</h[23]>", body)
    start = m.end() if m else 0
    pm = re.search(r"</p>", body[start:])
    return (start + pm.start()) if pm else None

for r in rows:
    lt = r["link_type"].strip()
    if lt == "conversion_cta":
        skipped_cta += 1
        continue
    s = norm(r["source_url"]).lstrip("/")
    t = norm(r["target_url"])
    anchor = r["anchor_text"].strip()
    a = arts.get(s)
    if not a:
        unmatched.append((s, t, "no source")); continue
    if t == "/" + s:
        unmatched.append((s, t, "self-link")); continue
    key = (s, t)
    if per_target.get(key, 0) >= 2:
        continue
    body = a["bodyHtml"]
    if f'href="{t}"' in body:  # already linked somewhere on the page
        per_target[key] = per_target.get(key, 0) + 1
        continue
    ctx = r["insertion_context"]
    sm = re.search(r'section\s+"([^"]+)"', ctx)
    pos = find_section_p_end(body, sm.group(1)) if sm else None
    if pos is None:
        pm = re.search(r"</p>", body)  # fall back to intro paragraph
        pos = pm.start() if pm else None
    if pos is None:
        unmatched.append((s, t, "no <p>")); continue
    sentence = TEMPLATES.get(lt, DEFAULT_TPL).format(t=t, a=html.escape(anchor, quote=True))
    a["bodyHtml"] = body[:pos] + sentence + body[pos:]
    per_target[key] = per_target.get(key, 0) + 1
    inserted += 1

REG.write_text(json.dumps(list(arts.values()), ensure_ascii=False, indent=0) + "\n", encoding="utf-8")
print("inserted:", inserted, "| cta(reuse existing):", skipped_cta, "| unmatched:", len(unmatched))
for u in unmatched[:20]:
    print("  UNMATCHED", u)
