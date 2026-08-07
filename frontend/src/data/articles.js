// ─────────────────────────────────────────────────────────────────────────────
// AUTHORITATIVE ARTICLE REGISTRY
// The single source of truth is `src/data/articles.json`. Add or remove an entry
// there (by hand, or by re-running _release/gen_articles.py) and EVERYTHING derives
// from it automatically:
//   • React routes            → src/App.js maps ARTICLE_SLUGS
//   • Prerender + sitemap      → scripts/routes.js requires articles.json
//   • /articles index page     → src/pages/Articles.jsx maps ARTICLES + CATEGORIES
//   • Related-article links    → getRelated() below (from `category` metadata)
// See ARTICLE_CONTENT_MANAGEMENT.md for the full add/remove workflow.
// ─────────────────────────────────────────────────────────────────────────────
import ARTICLES_JSON from "@/data/articles.json";

export const ARTICLES = ARTICLES_JSON;
export const ARTICLE_SLUGS = ARTICLES.map((a) => a.slug);

// Curated display order; only categories that actually contain articles are shown.
const CATEGORY_ORDER = [
  "Objection Handling",
  "Closing Techniques",
  "Travel Vouchers",
  "Incentive Strategy",
  "Industry Playbooks",
  "Metrics & ROI",
];
export const CATEGORIES = CATEGORY_ORDER.filter((c) => ARTICLES.some((a) => a.category === c));

export const getArticle = (slug) => ARTICLES.find((a) => a.slug === slug);

export const articlesByCategory = (category) =>
  ARTICLES.filter((a) => a.category === category);

// Related articles computed from registry metadata: same category first (in registry
// order), then topped up with others. Deterministic so prerender === client render.
export function getRelated(slug, n = 4) {
  const current = getArticle(slug);
  if (!current) return [];
  const sameCat = ARTICLES.filter((a) => a.slug !== slug && a.category === current.category);
  const others = ARTICLES.filter((a) => a.slug !== slug && a.category !== current.category);
  return [...sameCat, ...others].slice(0, n).map((a) => ({ to: `/${a.slug}`, label: a.title }));
}
