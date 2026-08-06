// Under the Priority-13/All-91 release, the 91 prebuilt static overlay pages are
// the primary site. React is retained ONLY for the interactive /contact form and
// the legal routes. Those are the only routes we prerender + copy into static-site.
const STATIC_ROUTES = ["/contact", "/privacy", "/terms", "/compliance"];

const RESOURCE_SLUGS = [];

const ROUTES = [...STATIC_ROUTES];

module.exports = { ROUTES, STATIC_ROUTES, RESOURCE_SLUGS };
