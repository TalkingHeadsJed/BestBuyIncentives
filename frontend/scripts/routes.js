// Single source of truth for prerendered routes + sitemap generation.
// Article routes are DERIVED from the authoritative registry (src/data/articles.json),
// so adding/removing an article there automatically updates prerender + sitemap.
const path = require("path");
const ARTICLES = require(path.join(__dirname, "..", "src", "data", "articles.json"));
const ARTICLE_SLUGS = ARTICLES.map((a) => a.slug);

const RESOURCE_SLUGS = [
  "stop-discounting-start-closing",
  "the-buyers-remorse-killer",
  "how-to-position-a-vacation-incentive-in-a-close",
  "compensation-plans-that-actually-motivate",
  "running-a-21-day-blitz-campaign",
  "differentiating-on-experience-not-price",
];

const STATIC_ROUTES = [
  "/", "/about", "/programs", "/industries", "/case-studies",
  "/resources", "/articles", "/faq",
  "/travel-incentives-vs-discounting", "/travel-incentives-vs-gift-cards", "/travel-incentives-vs-cash-rebates",
  "/contact", "/privacy", "/terms", "/compliance",
];

const ROUTES = [
  ...STATIC_ROUTES,
  ...RESOURCE_SLUGS.map((s) => '/resources/' + s),
  ...ARTICLE_SLUGS.map((s) => '/' + s),
];

module.exports = { ROUTES, STATIC_ROUTES, RESOURCE_SLUGS, ARTICLE_SLUGS };
