import { Helmet } from "react-helmet-async";

const SITE_URL = "https://bestbuyincentives.com";
const DEFAULT_IMAGE = `${SITE_URL}/images/hero-seminar.png`;
const SITE_NAME = "BestBuyIncentives";

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

  return (
    <Helmet prioritizeSeoTags>
      <title>{fullTitle}</title>
      {description && <meta name="description" content={description} />}
      <link rel="canonical" href={canonical} />
      {noIndex && <meta name="robots" content="noindex, nofollow" />}

      {/* Open Graph */}
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:title" content={fullTitle} />
      {description && <meta property="og:description" content={description} />}
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={image} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      {description && <meta name="twitter:description" content={description} />}
      <meta name="twitter:image" content={image} />

      {schemas.map((s, i) => (
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
  author: { "@type": "Organization", name: SITE_NAME },
  publisher: {
    "@type": "Organization",
    name: SITE_NAME,
    logo: { "@type": "ImageObject", url: `${SITE_URL}/images/logo.png` },
  },
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
