import Seo, { breadcrumbSchema, faqSchema, personSchema, ORG_ID, WEBSITE_ID, PERSON_ID } from "@/components/site/Seo";
import { Link } from "react-router-dom";
import { ChevronRight, ArrowRight } from "lucide-react";
import { getArticle, getRelated } from "@/data/articles";
import { AUTHOR } from "@/data/author";

const SITE_URL = "https://bestbuyincentives.com";
const ABOUT_MAP = {
  "sales-closing": ["Sales closing", "High-ticket sales"],
  "urgency-objections": ["Objection handling", "Sales urgency"],
  "customer-incentive-strategy": ["Customer incentive program", "Sales incentive"],
  "travel-voucher-deployment": ["Travel voucher", "Sales incentive"],
  "measurement-roi": ["Sales metrics", "Return on investment"],
  "industry-playbooks": ["Sales incentive", "High-ticket sales"],
};

const articleLdSchema = (a) => {
  const url = `${SITE_URL}/${a.slug}`;
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": `${url}#article`,
    headline: a.h1 || a.title,
    description: a.description,
    image: { "@type": "ImageObject", url: `${SITE_URL}/images/hero-seminar.png`, width: 1200, height: 630 },
    inLanguage: "en-US",
    datePublished: a.datePublished,
    dateModified: a.dateModified || a.datePublished,
    author: { "@id": PERSON_ID },
    publisher: { "@id": ORG_ID },
    isPartOf: { "@id": WEBSITE_ID },
    mainEntityOfPage: { "@type": "WebPage", "@id": `${url}#webpage`, url },
    articleSection: a.category,
    about: (ABOUT_MAP[a.hub] || [a.category]).map((t) => ({ "@type": "Thing", name: t })),
  };
};

const videoObjectSchema = (a) => {
  const url = `${SITE_URL}/${a.slug}`;
  return {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    "@id": `${url}#video`,
    name: a.h1 || a.title,
    description: a.description,
    thumbnailUrl: [a.video.thumbnailUrl],
    uploadDate: a.video.uploadDate,
    duration: a.video.duration,
    contentUrl: a.video.watchUrl,
    embedUrl: a.video.embedUrl,
    publisher: { "@id": ORG_ID },
    inLanguage: "en-US",
  };
};

const fmtDate = (iso) => {
  if (!iso) return "";
  const d = new Date(iso + "T00:00:00Z");
  return d.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric", timeZone: "UTC" });
};

export default function Article({ slug }) {
  const a = getArticle(slug);
  if (!a) return null;
  const related = getRelated(slug, 4);
  const dateLine =
    `Published ${fmtDate(a.datePublished)}` +
    (a.dateModified && a.dateModified !== a.datePublished ? ` \u00B7 Updated ${fmtDate(a.dateModified)}` : "");

  return (
    <div data-testid="page-article" className="bg-white">
      <Seo
        title={a.title}
        description={a.description}
        path={`/${a.slug}`}
        type="article"
        schema={[
          articleLdSchema(a),
          personSchema,
          ...(a.video ? [videoObjectSchema(a)] : []),
          ...(a.faqs && a.faqs.length ? [faqSchema(a.faqs)] : []),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Sales Resources", path: "/articles" },
            { name: a.h1 || a.title, path: `/${a.slug}` },
          ]),
        ]}
      />

      <section className="bg-[#0A0A0A] text-white pt-32 pb-16">
        <div className="mx-auto max-w-3xl px-6 lg:px-10">
          {/* Breadcrumb */}
          <nav data-testid="article-breadcrumb" aria-label="Breadcrumb" className="flex items-center gap-2 text-[11px] font-mono uppercase tracking-widest text-white/50 font-bold">
            <Link to="/" data-testid="breadcrumb-home" className="hover:text-[#FFD300]">Home</Link>
            <ChevronRight className="h-3 w-3" />
            <Link to="/articles" data-testid="breadcrumb-articles" className="hover:text-[#FFD300]">Sales Resources</Link>
            <ChevronRight className="h-3 w-3" />
            <span className="text-[#FFD300]">{a.category}</span>
          </nav>
          <div className="mt-6 inline-block stamp text-[10px]">{a.eyebrow}</div>
          <h1 data-testid="article-h1" className="font-display mt-6 text-4xl lg:text-6xl font-bold leading-[0.98]">{a.h1 || a.title}</h1>
          {a.description && <p className="mt-6 text-lg text-white/70 leading-relaxed max-w-2xl">{a.description}</p>}
          <div data-testid="article-byline" className="mt-8 flex items-center gap-3">
            <Link to="/authors/karl-kramer" data-testid="byline-author-photo" aria-label="Karl Kramer">
              <img
                src="/images/authors/karl-kramer.png"
                alt="Karl Kramer, CEO of Best Buy Incentives"
                width="44"
                height="44"
                loading="lazy"
                className="h-11 w-11 rounded-full object-cover border border-white/20"
              />
            </Link>
            <div className="text-[11px] font-mono uppercase tracking-widest font-bold leading-relaxed">
              <div className="text-white/50">
                By <Link to="/authors/karl-kramer" data-testid="byline-author" className="text-white/80 hover:text-[#FFD300]">Karl Kramer</Link>, CEO of Best Buy Incentives
              </div>
              <div data-testid="byline-date" className="mt-1 text-white/40">{dateLine}</div>
            </div>
          </div>
          <Link to="/contact" data-testid="article-hero-cta" className="mt-8 inline-flex items-center gap-2 bg-[#FFD300] hover:bg-[#FFEA66] text-black font-bold text-sm px-6 py-3 uppercase tracking-wide">
            Schedule a Campaign Consultation <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </section>

      <section className="py-12 lg:py-16">
        <div className="mx-auto max-w-3xl px-6 lg:px-10">
          {a.video && (
            <figure data-testid="article-video" className="mb-10">
              <div className="relative w-full overflow-hidden border border-[#E5E2D9] bg-black" style={{ aspectRatio: "16 / 9" }}>
                <iframe
                  className="absolute inset-0 h-full w-full"
                  src={`${a.video.embedUrl}?rel=0`}
                  title={a.h1 || a.title}
                  loading="lazy"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              </div>
              <figcaption className="mt-2 text-[11px] font-mono uppercase tracking-widest text-[#595959] font-bold">{`Watch: ${a.h1 || a.title}`}</figcaption>
            </figure>
          )}
          <div className="article-body" data-testid="article-body" suppressHydrationWarning dangerouslySetInnerHTML={{ __html: a.bodyHtml }} />

          {a.faqs && a.faqs.length > 0 && (
            <div data-testid="article-faq" className="mt-12 pt-8 border-t border-[#E5E2D9]">
              <h2 className="font-display text-2xl lg:text-3xl font-bold text-black">Frequently asked questions</h2>
              <div className="mt-6 space-y-6">
                {a.faqs.map((f) => (
                  <div key={f.q}>
                    <h3 className="font-bold text-black">{f.q}</h3>
                    <p className="mt-1 text-[#333] leading-relaxed">{f.a}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div data-testid="article-author-box" className="mt-12 pt-8 border-t border-[#E5E2D9] flex flex-col sm:flex-row gap-5 items-start">
            <Link to="/authors/karl-kramer" className="shrink-0" aria-label="Karl Kramer">
              <img
                src="/images/authors/karl-kramer.png"
                alt="Karl Kramer, CEO of Best Buy Incentives"
                width="80"
                height="80"
                loading="lazy"
                className="h-20 w-20 rounded-full object-cover border-2 border-[#FFD300]"
              />
            </Link>
            <div>
              <div className="text-[11px] font-mono uppercase tracking-widest text-[#595959] font-bold">About the author</div>
              <Link to="/authors/karl-kramer" data-testid="author-box-name" className="mt-1 inline-block font-display text-xl font-bold text-black hover:text-[#595959]">Karl Kramer, CEO of Best Buy Incentives</Link>
              <p className="mt-2 text-sm text-[#595959] leading-relaxed">{AUTHOR.bioShort}</p>
              <Link to="/authors/karl-kramer" data-testid="author-box-link" className="mt-3 inline-flex items-center gap-2 text-sm font-bold text-black hover:text-[#595959]">
                Read Karl's full profile <ArrowRight className="h-3.5 w-3.5 text-[#FFD300]" />
              </Link>
            </div>
          </div>

          {related.length > 0 && (
            <div data-testid="article-related" className="mt-14 pt-8 border-t border-[#E5E2D9]">
              <div className="text-[11px] font-mono uppercase tracking-widest text-[#595959] font-bold mb-4">Related reading</div>
              <ul className="space-y-2">
                {related.map((r) => (
                  <li key={r.to}>
                    <Link to={r.to} className="inline-flex items-center gap-2 text-black font-bold hover:text-[#595959]">
                      <ArrowRight className="h-3.5 w-3.5 text-[#FFD300]" />
                      <span>{r.label}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div data-testid="article-cta-box" className="mt-14 border border-[#E5E2D9] bg-[#F5F2EA] p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <p className="text-[#404040] leading-relaxed">See how this applies to your sales floor. Book a 30-minute call with Best Buy Incentives.</p>
            <Link to="/contact" data-testid="article-cta" className="shrink-0 inline-flex items-center gap-2 bg-[#FFD300] hover:bg-[#FFEA66] text-black font-bold text-sm px-6 py-3 uppercase tracking-wide">
              Book a Call <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
