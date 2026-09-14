import { Helmet } from "react-helmet-async";

const SITE_URL = "https://bestbuyincentives.com";
const DEFAULT_IMAGE = `${SITE_URL}/images/hero-seminar.png`;
const SITE_NAME = "BestBuyIncentives";
const LOGO = `${SITE_URL}/images/logo.svg`;

// Stable identity nodes referenced by @id across all page schema.
export const ORG_ID = `${SITE_URL}/#organization`;
export const WEBSITE_ID = `${SITE_URL}/#website`;
// One stable Person entity for author Karl Kramer, referenced by @id everywhere.
export const PERSON_ID = `${SITE_URL}/authors/karl-kramer/#person`;
export const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": PERSON_ID,
  name: "Karl Kramer",
  url: `${SITE_URL}/authors/karl-kramer`,
  image: `${SITE_URL}/images/authors/karl-kramer.png`,
  jobTitle: "CEO",
  description:
    "Karl Kramer has spent more than three decades helping salespeople and sales organizations improve closing rates through travel incentives.",
  worksFor: { "@id": ORG_ID },
  sameAs: ["https://www.linkedin.com/in/karl-kramer-34803516a/"],
  knowsAbout: [
    "sales closing incentives",
    "discounted travel vouchers",
    "high-ticket sales",
    "customer incentive programs",
    "sales promotions",
    "margin protection",
  ],
};
const BASE_SCHEMA = [
  {
    "@context": "https://schema.org", "@type": "Organization", "@id": ORG_ID,
    name: "Best Buy Incentives",
    alternateName: ["Karl Kramer & Company", "Karl Kramer & Company, Inc."],
    legalName: "Karl Kramer & Company, Inc.",
    url: `${SITE_URL}/`,
    logo: { "@type": "ImageObject", "@id": `${SITE_URL}/#logo`, url: LOGO, width: 512, height: 512 },
    image: { "@id": `${SITE_URL}/#logo` },
    foundingDate: "1992",
    email: "karl@bestbuyincentives.com",
    telephone: "+1-866-843-8003",
    address: {
      "@type": "PostalAddress",
      streetAddress: "3089 Shore Road",
      addressLocality: "Bellmore",
      addressRegion: "NY",
      postalCode: "11710",
      addressCountry: "US",
    },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+1-866-843-8003",
      contactType: "sales",
      areaServed: ["US", "CA"],
      availableLanguage: "English",
    },
    sameAs: [
      "https://www.youtube.com/@Bestbuyincentives",
      "https://www.facebook.com/profile.php?id=61591196589436",
      "https://www.instagram.com/best_buy_incentives/",
    ],
    description: "Best Buy Incentives helps high-ticket sales teams use customer-facing discounted travel vouchers to create urgency, protect margin, and close more qualified sales.",
    disambiguatingDescription: "B2B sales-incentive provider of discounted travel vouchers and vacation certificates for high-ticket sales teams. Not affiliated with Best Buy Co., Inc., the electronics retailer.",
  },
  {
    "@context": "https://schema.org", "@type": "WebSite", "@id": WEBSITE_ID,
    url: `${SITE_URL}/`, name: "Best Buy Incentives", inLanguage: "en-US",
    publisher: { "@id": ORG_ID },
  },
];

/**
 * Per-page SEO manager: <title>, meta, canonical, OG, Twitter, JSON-LD.
 */
// Core pages keep a brand suffix; all other routes drop it (base titles are <=60 chars).
const CORE_PATHS = new Set([
  "/", "/about", "/programs", "/industries", "/case-studies", "/resources",
  "/articles", "/faq", "/contact",
  "/travel-incentives-vs-discounting", "/travel-incentives-vs-gift-cards", "/travel-incentives-vs-cash-rebates",
  "/authors/karl-kramer",
]);
const BRAND_SUFFIX = "Best Buy Incentives";
// Centralized title/description rewrites (keeps titles <=60 and metas <=155).
const PAGE_META_OVERRIDES = {
  "/programs": {
    title: "Vacation Certificate Programs",
    description: "Vacation certificate programs for high-ticket sales teams. Enjoy a Great Escape and more. Book a call to see the destinations your customers can choose.",
  },
  "/industries": {
    title: "Industries We Serve",
    description: "Sales incentive programs for auto dealers, jewelers, furniture, home improvement, boat and RV, roofing, and wedding businesses. Close more without discounting.",
  },
  "/resources": { title: "The Closer's Library: Sales Playbooks" },
  "/articles": {
    title: "Sales Closing & Incentive Guides",
    description: "Practical guides on closing high-ticket sales, handling price objections, and using discounted travel vouchers as customer incentives, organized by topic.",
  },
  "/faq": {
    title: "Travel Incentive Program FAQ",
    description: "Straight answers on how discounted travel voucher programs work, how customers redeem, how fast you launch, and what results sales teams report.",
  },
  "/contact": { title: "Plan a Sales Incentive Campaign" },
  "/case-studies": { title: "Case Studies: Documented Sales Lift" },
  "/travel-incentives-vs-discounting": {
    title: "Travel Incentives vs. Discounting",
    description: "Travel incentive certificates vs. discounting for high-ticket sales: margin impact, close rate, perceived value, and referrals compared head to head.",
  },
  "/travel-incentives-vs-gift-cards": {
    title: "Travel Incentives vs. Gift Cards",
    description: "Travel incentive certificates vs. gift cards as a sales reward: perceived value, emotional pull, margin impact, and why a vacation out-closes a gift card.",
  },
  "/travel-incentives-vs-cash-rebates": {
    title: "Travel Incentives vs. Cash Rebates",
    description: "Travel incentive certificates vs. cash rebates: margin impact, perceived value, buyer behavior, and why a vacation beats cash back at the close.",
  },
  "/incentive-revenue-dashboard": {
    description: "A spreadsheet to model close rate, margin, discounting, and attributable revenue from an incentive campaign before you run it.",
  },
};

export default function Seo({
  title,
  description,
  path = "/",
  image = DEFAULT_IMAGE,
  type = "website",
  noIndex = false,
  schema,
}) {
  const ov = PAGE_META_OVERRIDES[path] || {};
  const effTitle = ov.title !== undefined ? ov.title : title;
  if (ov.description !== undefined) description = ov.description;
  // Guarantee every meta description is <= 155 chars (trim the trailing clause at a word boundary).
  if (description && description.length > 155) {
    let cut = description.slice(0, 153);
    const sp = cut.lastIndexOf(" ");
    if (sp > 120) cut = cut.slice(0, sp);
    description = cut.replace(/[\s,;:.]+$/, "") + ".";
  }
  let fullTitle;
  if (path === "/") fullTitle = `${effTitle} | Best Buy Incentives by Karl Kramer & Co.`;
  else if (CORE_PATHS.has(path)) fullTitle = effTitle ? `${effTitle} | ${BRAND_SUFFIX}` : BRAND_SUFFIX;
  else fullTitle = effTitle || BRAND_SUFFIX;
  const canonical = `${SITE_URL}${path}`;
  const schemas = Array.isArray(schema) ? schema : schema ? [schema] : [];
  const allSchemas = [...BASE_SCHEMA, ...schemas];

  return (
    <Helmet prioritizeSeoTags>
      <title>{fullTitle}</title>
      {description && <meta name="description" content={description} />}
      <link rel="canonical" href={canonical} />
      {noIndex ? (
        <meta name="robots" content="noindex, nofollow" />
      ) : (
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1" />
      )}

      {/* Open Graph */}
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:title" content={fullTitle} />
      {description && <meta property="og:description" content={description} />}
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={image} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:locale" content="en_US" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      {description && <meta name="twitter:description" content={description} />}
      <meta name="twitter:image" content={image} />

      {allSchemas.map((s, i) => (
        <script key={i} type="application/ld+json">
          {JSON.stringify(s)}
        </script>
      ))}
    </Helmet>
  );
}

// Reusable schema builders
export const breadcrumbSchema = (items) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: items.map((it, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: it.name,
    item: `${SITE_URL}${it.path}`,
  })),
});

export const faqSchema = (faqs) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
});

export const articleSchema = ({ title, description, image, slug, minutes }) => ({
  "@context": "https://schema.org",
  "@type": "Article",
  headline: title,
  description,
  image: image?.startsWith("http") ? image : `${SITE_URL}${image}`,
  author: { "@id": ORG_ID },
  publisher: { "@id": ORG_ID },
  mainEntityOfPage: `${SITE_URL}/resources/${slug}`,
  timeRequired: `PT${minutes}M`,
});

export const productSchema = ({ name, description, image, slug }) => ({
  "@context": "https://schema.org",
  "@type": "Product",
  name,
  description,
  image: image?.startsWith("http") ? image : `${SITE_URL}${image}`,
  brand: { "@type": "Brand", name: SITE_NAME },
  offers: {
    "@type": "AggregateOffer",
    priceCurrency: "USD",
    availability: "https://schema.org/InStock",
    seller: { "@type": "Organization", name: SITE_NAME },
    url: `${SITE_URL}/programs`,
  },
});
