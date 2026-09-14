import { useParams, Link } from "react-router-dom";
import Seo, { breadcrumbSchema, faqSchema, personSchema, ORG_ID, PERSON_ID } from "@/components/site/Seo";
import { ChevronRight, ArrowRight } from "lucide-react";
import { getCategoryPage } from "@/data/categoryPages";
import { ARTICLES } from "@/data/articles";
import NotFound from "@/pages/NotFound";

const SITE_URL = "https://bestbuyincentives.com";

function fmtDate(iso) {
  try {
    return new Date(iso).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
  } catch {
    return iso;
  }
}

export default function CategoryPage({ slug: slugProp }) {
  const params = useParams();
  const slug = slugProp || params.slug;
  const p = getCategoryPage(slug);
  if (!p) return <NotFound />;

  const byTitle = Object.fromEntries(ARTICLES.map((a) => [a.slug, a.h1 || a.title]));
  const related = (p.related || []).filter((s) => byTitle[s]);

  const articleLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: p.h1,
    description: p.description,
    image: `${SITE_URL}/images/hero-seminar.png`,
    datePublished: p.datePublished,
    dateModified: p.dateModified || p.datePublished,
    author: { "@id": PERSON_ID },
    publisher: { "@id": ORG_ID },
    mainEntityOfPage: `${SITE_URL}/${p.slug}`,
  };

  return (
    <div data-testid={`category-${p.slug}`} className="bg-white">
      <Seo
        title={p.title}
        description={p.description}
        path={`/${p.slug}`}
        type="article"
        schema={[
          articleLd,
          personSchema,
          faqSchema(p.faqs),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Programs", path: "/programs" },
            { name: p.h1, path: `/${p.slug}` },
          ]),
        ]}
      />

      {/* Hero */}
      <section className="bg-[#0A0A0A] text-white pt-32 pb-16">
        <div className="mx-auto max-w-4xl px-6 lg:px-10">
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-[11px] font-mono uppercase tracking-widest text-white/50 font-bold">
            <Link to="/" className="hover:text-[#FFD300]">Home</Link>
            <ChevronRight className="h-3 w-3" />
            <Link to="/programs" className="hover:text-[#FFD300]">Programs</Link>
          </nav>
          <h1 data-testid="category-h1" className="font-display mt-6 text-4xl sm:text-5xl lg:text-6xl font-bold leading-[0.98]">{p.h1}</h1>
          <p className="mt-6 text-lg text-white/70 leading-relaxed max-w-3xl">{p.intro}</p>

          <div data-testid="category-byline" className="mt-8 flex items-center gap-3">
            <Link to="/authors/karl-kramer" aria-label="Karl Kramer">
              <img src="/images/authors/karl-kramer.png" alt="Karl Kramer, CEO of Best Buy Incentives" width="44" height="44" loading="lazy" className="h-11 w-11 rounded-full object-cover border border-white/20" />
            </Link>
            <div className="text-[11px] font-mono uppercase tracking-widest font-bold leading-relaxed">
              <div className="text-white/50">By <Link to="/authors/karl-kramer" className="text-white/80 hover:text-[#FFD300]">Karl Kramer</Link>, CEO of Best Buy Incentives</div>
              <div className="mt-1 text-white/40">{`Published ${fmtDate(p.datePublished)}`}</div>
            </div>
          </div>

          <Link to="/contact" data-testid="category-cta-hero" className="mt-8 inline-flex items-center gap-2 bg-[#FFD300] hover:bg-[#FFEA66] text-black font-bold text-sm px-6 py-4 uppercase tracking-wide">
            Book a Strategy Call <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      {/* Body */}
      <section className="py-14 lg:py-20">
        <div className="mx-auto max-w-3xl px-6 lg:px-10">
          <article className="category-prose space-y-10 [&_h2]:font-display [&_h2]:text-2xl [&_h2]:lg:text-3xl [&_h2]:font-bold [&_h2]:text-black [&_p]:mt-3 [&_p]:text-[#333] [&_p]:leading-relaxed [&_ul]:mt-3 [&_ul]:space-y-2 [&_ul]:list-disc [&_ul]:pl-5 [&_li]:text-[#333] [&_a]:text-black [&_a]:font-bold [&_a]:underline [&_a:hover]:text-[#595959]">
            {p.sections.map((s) => (
              <div key={s.h}>
                <h2>{s.h}</h2>
                <div dangerouslySetInnerHTML={{ __html: s.html }} />
              </div>
            ))}

            {/* FAQ */}
            <div data-testid="category-faq">
              <h2>Frequently asked questions</h2>
              <div className="mt-4 space-y-6">
                {p.faqs.map((f) => (
                  <div key={f.q}>
                    <h3 className="font-bold text-black">{f.q}</h3>
                    <p className="mt-1 text-[#333] leading-relaxed">{f.a}</p>
                  </div>
                ))}
              </div>
            </div>
          </article>

          {/* Related reading */}
          {related.length > 0 && (
            <div className="mt-12 pt-8 border-t border-[#E5E2D9]">
              <div className="text-[11px] font-mono uppercase tracking-widest text-[#595959] font-bold">Related reading</div>
              <ul className="mt-4 space-y-2">
                {related.map((s) => (
                  <li key={s}>
                    <Link to={`/${s}`} className="inline-flex items-start gap-2 text-black font-bold hover:text-[#595959]">
                      <ArrowRight className="h-3.5 w-3.5 text-[#FFD300] mt-1 shrink-0" />
                      <span>{byTitle[s]}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Closing CTA */}
          <div className="mt-12 bg-[#0A0A0A] text-white p-8 lg:p-10">
            <h2 className="font-display text-2xl lg:text-3xl font-bold">See the destinations your customers can choose.</h2>
            <p className="mt-3 text-white/70">Book a 30-minute call and we will map a program to your sales floor.</p>
            <Link to="/contact" data-testid="category-cta-bottom" className="mt-5 inline-flex items-center gap-2 bg-[#FFD300] hover:bg-[#FFEA66] text-black font-bold text-sm px-6 py-4 uppercase tracking-wide">
              Book a Strategy Call <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
