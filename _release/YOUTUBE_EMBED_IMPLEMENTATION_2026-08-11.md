# YouTube Article Embeds + VideoObject — Implementation Report (2026-08-11)

Scope: embed the authoritative YouTube videos into their corresponding articles and add
`VideoObject` JSON-LD, per `YOUTUBE_FIRST_39_ARTICLE_EMBED_CONTROL.csv` (URLs now populated).
Restored black/yellow design and all existing pages preserved. No GitHub op. Not deployed.

**Deliverable:** `/app/original-site/` (117 pages + PHP `/api` + `/downloads`)
**Archive SHA-256:** `2619f26c1891bbcb36b3b6acd18c7911d449572c5ed2237d80be3e49754dea9d` (~99 MB, 117 index.html)
**Prev SHA-256:** `a5df74a3089bbe9285bdcd2471f6f24ea7e1c059039c1005d448fae9f065b0a6`

## What changed
- **38 articles** now carry a `video` field (verbatim `youtube_video_id` + ISO-8601 `duration`
  from the sheet). Video **25** (`customer-incentive-ideas-to-close-sales`, "NOT FOUND IN
  YOUTUBE STUDIO", blank URL) is intentionally **omitted** — no embed, no schema.
- Each video article renders a **responsive, lazy-loaded, privacy-friendly**
  `youtube-nocookie.com/embed/<id>?rel=0` player at the **top of the body** (after the hero),
  16:9, framed in the existing design (`data-testid="article-video"`). No client JS required.
- Each video article emits a `VideoObject` JSON-LD (in addition to Article + BreadcrumbList):
  `name` = article title, `description` = article description, `duration` = sheet value,
  `embedUrl`/`contentUrl` = the mapped video, `thumbnailUrl` = `i.ytimg.com/vi/<id>/hqdefault.jpg`,
  `uploadDate` = `2026-08-11` (the sheet's authoritative verified date; user-approved),
  `publisher` = Organization @id. **No data invented.**

## Files
- `frontend/src/data/articles.json` — `video` field on 38 articles (via idempotent
  `_release/attach_youtube_videos.js`).
- `frontend/src/pages/Article.jsx` — `videoObjectSchema()` added to the schema array; responsive
  embed rendered at top of body (fixed a figcaption `{expr}` adjacency to avoid React #418).
- `original-site/**` regenerated (117); `DEPLOY_THIS_ORIGINAL_SITE.txt` hash bumped.

## Gates (all pass — 117 routes)
- `validate-articles.js` → **ALL VALIDATION CHECKS PASSED** (unique titles/canonicals — exactly
  1 canonical per page, one H1, JSON-LD present, 0 broken internal links, sitemap 117/117,
  0 banned wording, 0 orphans).
- `hydration-articles.js` → **ALL 117 CLEAN** (0 React #418 / 0 hydration console errors),
  including all 38 embedded pages. (Hydration gate ignores 3rd-party YouTube console noise.)
- Counts verified: `VideoObject` on exactly **38** pages; **0** on video-25 and non-video pages
  (e.g. /about); embeds absent from prerendered non-video pages.
- Visual: preview screenshot confirms the framed player sits correctly below the hero in the
  black/yellow design.

## Notes
- Embeds use `youtube-nocookie.com` + `loading="lazy"` for privacy/perf; the poster loads from
  YouTube at view time. No API keys, no tracking added.
- The remaining video (25) can be embedded later by adding its `youtube_video_id` to
  `_release/attach_youtube_videos.js` once it exists in YouTube Studio.
