import Seo, { breadcrumbSchema, ORG_ID, WEBSITE_ID } from "@/components/site/Seo";
import { Link } from "react-router-dom";
import { ChevronRight, ArrowRight } from "lucide-react";
import { getArticle, getRelated } from "@/data/articles";

const SITE_URL = "https://bestbuyincentives.com";
const AUTHOR = { "@type": "Organization", name: "Best Buy Incentives Editorial Team", url: `${SITE_URL}/about` };
const REVIEWER = { "@type": "Person", name: "Karl Kramer", jobTitle: "CEO", url: `${SITE_URL}/about` };
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
    author: AUTHOR,
    reviewedBy: REVIEWER,
    publisher: { "@id": ORG_ID },
    isPartOf: { "@id": WEBSITE_ID },
    mainEntityOfPage: { "@type": "WebPage", "@id": `${url}#webpage`, url },
    articleSection: a.category,
    about: (ABOUT_MAP[a.hub] || [a.category]).map((t) => ({ "@type": "Thing", name: t })),
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

  return (
    <div data-testid="page-article" className="bg-white">
      <Seo
        title={a.title}
        description={a.description}
        path={`/${a.slug}`}
        type="article"
        schema={[
          articleLdSchema(a),
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
          <div data-testid="article-byline" className="mt-6 flex flex-wrap items-center gap-x-2 gap-y-1 text-[11px] font-mono uppercase tracking-widest text-white/50 font-bold">
            <Link to="/about" data-testid="byline-author" className="hover:text-[#FFD300]">Best Buy Incentives Editorial Team</Link>
            <span>·</span>
            <span>Reviewed by <Link to="/about" data-testid="byline-reviewer" className="text-white/70 hover:text-[#FFD300]">Karl Kramer, CEO</Link></span>
            <span>·</span>
            <span data-testid="byline-date">{`Published ${fmtDate(a.datePublished)}`}</span>
          </div>
          <Link to="/contact" data-testid="article-hero-cta" className="mt-8 inline-flex items-center gap-2 bg-[#FFD300] hover:bg-[#FFEA66] text-black font-bold text-sm px-6 py-3 uppercase tracking-wide">
            Schedule a Campaign Consultation <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </section>

      <section className="py-12 lg:py-16">
        <div className="mx-auto max-w-3xl px-6 lg:px-10">
          <div className="article-body" data-testid="article-body" suppressHydrationWarning dangerouslySetInnerHTML={{ __html: a.bodyHtml }} />

          <div data-testid="article-accountability" className="mt-10 pt-6 border-t border-[#E5E2D9] text-sm text-[#595959] leading-relaxed">
            Written by the <Link to="/about" className="text-black font-bold hover:text-[#595959]">Best Buy Incentives Editorial Team</Link> and reviewed by <Link to="/about" className="text-black font-bold hover:text-[#595959]">Karl Kramer, CEO</Link>. Best Buy Incentives has supplied customer incentive programs since 1992.
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

          <div className="mt-16 bg-[#0A0A0A] text-white p-10 lg:p-12">
            <div className="text-[11px] font-mono uppercase tracking-widest text-[#FFD300] font-bold">Put this to work</div>
            <h2 className="mt-3 font-display font-bold text-3xl lg:text-4xl leading-tight">See where a discounted travel voucher fits your sales process.</h2>
            <Link to="/contact" data-testid="article-cta" className="mt-6 inline-flex items-center gap-2 bg-[#FFD300] hover:bg-[#FFEA66] text-black font-bold text-sm px-6 py-3 uppercase tracking-wide">
              Schedule a Campaign Consultation <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
