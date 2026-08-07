import Seo, { breadcrumbSchema } from "@/components/site/Seo";
import { Link } from "react-router-dom";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { ARTICLES } from "@/data/articles";

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
});

export default function Article({ slug }) {
  const a = ARTICLES.find((x) => x.slug === slug);
  if (!a) return null;

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
            { name: "Sales Insights", path: "/resources" },
            { name: a.h1 || a.title, path: `/${a.slug}` },
          ]),
        ]}
      />

      <style>{`
        .article-body{color:#404040;font-size:1.075rem;line-height:1.75}
        .article-body h2{font-family:var(--font-display,inherit);color:#0A0A0A;font-weight:800;font-size:1.6rem;line-height:1.15;margin:2.25rem 0 .75rem}
        .article-body h3{color:#0A0A0A;font-weight:700;font-size:1.2rem;margin:1.75rem 0 .5rem}
        .article-body p{margin:0 0 1.1rem}
        .article-body ul,.article-body ol{margin:0 0 1.1rem 1.25rem;list-style:disc}
        .article-body ol{list-style:decimal}
        .article-body li{margin:.35rem 0}
        .article-body a{color:#0A0A0A;font-weight:700;text-decoration:underline;text-decoration-color:#FFD300;text-underline-offset:3px}
        .article-body a:hover{background:#FFD300}
        .article-body strong{color:#0A0A0A}
        .article-body table{width:100%;border-collapse:collapse;margin:1.25rem 0;font-size:.95rem}
        .article-body th,.article-body td{border:1px solid #E5E2D9;padding:.6rem .75rem;text-align:left}
        .article-body th{background:#F5F2EA;font-weight:700;color:#0A0A0A}
      `}</style>

      <section className="bg-[#0A0A0A] text-white pt-32 pb-16">
        <div className="mx-auto max-w-3xl px-6 lg:px-10">
          <Link to="/resources" data-testid="article-back" className="inline-flex items-center gap-2 text-[11px] font-mono uppercase tracking-widest text-[#FFD300] font-bold hover:text-white">
            <ArrowLeft className="h-3 w-3" /> Sales Insights
          </Link>
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

          {a.related?.length > 0 && (
            <div data-testid="article-related" className="mt-14 pt-8 border-t border-[#E5E2D9]">
              <div className="text-[11px] font-mono uppercase tracking-widest text-[#595959] font-bold mb-4">Related reading</div>
              <ul className="space-y-2">
                {a.related.map((r) => (
                  <li key={r.to}>
                    <Link to={r.to} className="inline-flex items-center gap-2 text-black font-bold hover:text-[#595959]">
                      <ArrowRight className="h-3.5 w-3.5 text-[#FFD300]" /> {r.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="mt-16 bg-[#0A0A0A] text-white p-10 lg:p-12">
            <div className="text-[11px] font-mono uppercase tracking-widest text-[#FFD300] font-bold">Put this to work</div>
            <h3 className="mt-3 font-display font-bold text-3xl lg:text-4xl leading-tight">See where a discounted travel voucher fits your sales process.</h3>
            <Link to="/contact" data-testid="article-cta" className="mt-6 inline-flex items-center gap-2 bg-[#FFD300] hover:bg-[#FFEA66] text-black font-bold text-sm px-6 py-3 uppercase tracking-wide">
              Schedule a Campaign Consultation <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
