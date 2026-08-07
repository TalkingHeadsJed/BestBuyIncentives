import Seo, { breadcrumbSchema } from "@/components/site/Seo";
import { Link } from "react-router-dom";
import { ChevronRight, ArrowRight } from "lucide-react";
import { getArticle, getRelated } from "@/data/articles";

const SITE_URL = "https://bestbuyincentives.com";

const articleLdSchema = (a) => ({
  "@context": "https://schema.org",
  "@type": "Article",
  headline: a.h1 || a.title,
  description: a.description,
  image: `${SITE_URL}/images/hero-seminar.png`,
  author: { "@type": "Organization", name: "BestBuyIncentives" },
  publisher: {
    "@type": "Organization",
    name: "BestBuyIncentives",
    logo: { "@type": "ImageObject", url: `${SITE_URL}/images/hero-seminar.png` },
  },
  mainEntityOfPage: `${SITE_URL}/${a.slug}`,
  articleSection: a.category,
});

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
          <Link to="/contact" data-testid="article-hero-cta" className="mt-8 inline-flex items-center gap-2 bg-[#FFD300] hover:bg-[#FFEA66] text-black font-bold text-sm px-6 py-3 uppercase tracking-wide">
            Schedule a Campaign Consultation <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </section>

      <section className="py-12 lg:py-16">
        <div className="mx-auto max-w-3xl px-6 lg:px-10">
          <div className="article-body" data-testid="article-body" suppressHydrationWarning dangerouslySetInnerHTML={{ __html: a.bodyHtml }} />

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
