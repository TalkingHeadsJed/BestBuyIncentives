import { Helmet } from "react-helmet-async";

const SITE_URL = "https://bestbuyincentives.com";
const DEFAULT_IMAGE = `${SITE_URL}/images/hero-seminar.png`;
const SITE_NAME = "BestBuyIncentives";
const LOGO = `${SITE_URL}/images/logo.svg`;

// Stable identity nodes referenced by @id across all page schema.
export const ORG_ID = `${SITE_URL}/#organization`;
export const WEBSITE_ID = `${SITE_URL}/#website`;
const BASE_SCHEMA = [
  {
    "@context": "https://schema.org", "@type": "Organization", "@id": ORG_ID,
    name: "Best Buy Incentives",
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
  },
  {
    "@context": "https://schema.org", "@type": "WebSite", "@id": WEBSITE_ID,
    url: `${SITE_URL}/`, name: "Best Buy Incentives", inLanguage: "en-US",
    publisher: { "@id": ORG_ID },
  },
];

/**
 * Per-page SEO manager: <title>, meta, canonical, OG, Twitter, JSON-LD.
 *
 * Props:
 * - title           — page-specific title (will be suffixed with brand)
 * - description     — meta description (~150-160 chars)
 * - path            — current path, e.g. "/programs" (canonical + og:url)
 * - image           — absolute image URL for OG/Twitter (optional)
 * - type            — og:type (default "website")
 * - noIndex         — set true to add robots noindex,nofollow
 * - schema          — optional JSON-LD object (or array) added to <head>
 */
export default function Seo({
  title,
  description,
  path = "/",
  image = DEFAULT_IMAGE,
  type = "website",
  noIndex = false,
  schema,
}) {
  const fullTitle = title ? `${title} | ${SITE_NAME}` : `${SITE_NAME} — Stop Discounting. Start Closing.`;
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
