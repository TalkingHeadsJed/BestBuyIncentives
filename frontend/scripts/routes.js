// Single source of truth for prerendered routes + sitemap generation.
// BlueHost cannot run Node, so this only runs in the build container.

const RESOURCE_SLUGS = [
  "stop-discounting-start-closing",
  "the-buyers-remorse-killer",
  "how-to-position-a-vacation-incentive-in-a-close",
  "compensation-plans-that-actually-motivate",
  "running-a-21-day-blitz-campaign",
  "differentiating-on-experience-not-price",
];

const STATIC_ROUTES = [
  "/",
  "/about",
  "/programs",
  "/industries",
  "/case-studies",
  "/resources",
  "/faq",
  "/travel-incentives-vs-discounting",
  "/contact",
];

const ROUTES = [
  ...STATIC_ROUTES,
  ...RESOURCE_SLUGS.map((s) => `/resources/${s}`),
];

module.exports = { ROUTES, STATIC_ROUTES, RESOURCE_SLUGS };
