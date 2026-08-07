import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import Seo, { breadcrumbSchema } from "@/components/site/Seo";
import { ARTICLES, CATEGORIES, articlesByCategory } from "@/data/articles";

const SITE_URL = "https://bestbuyincentives.com";

const collectionSchema = () => ({
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "Sales Resources — High-Ticket Closing & Incentive Playbooks",
  description:
    "A library of practical guides on closing high-ticket sales, handling price objections, and using discounted travel vouchers as customer-facing incentives.",
  url: `${SITE_URL}/articles`,
  mainEntity: {
    "@type": "ItemList",
    numberOfItems: ARTICLES.length,
    itemListElement: ARTICLES.map((a, i) => ({
      "@type": "ListItem",
      position: i + 1,
      url: `${SITE_URL}/${a.slug}`,
      name: a.title,
    })),
  },
});

function ArticleCard({ a }) {
  return (
    <Link
      to={`/${a.slug}`}
      data-testid={`article-card-${a.slug}`}
      className="group flex flex-col border border-[#E5E2D9] bg-white p-6 hover:border-black transition-colors"
    >
      <div className="text-[10px] font-mono uppercase tracking-widest text-[#595959] font-bold">{a.category}</div>
      <h3 className="mt-3 font-display text-xl font-bold leading-snug text-[#0A0A0A] group-hover:text-black">{a.title}</h3>
      <p className="mt-3 text-sm text-[#595959] leading-relaxed flex-1">{a.excerpt}</p>
      <span className="mt-4 inline-flex items-center gap-2 text-[11px] font-mono uppercase tracking-widest text-black font-bold">
        Read
        <ArrowRight className="h-3.5 w-3.5 text-[#FFD300] group-hover:translate-x-1 transition-transform" />
      </span>
    </Link>
  );
}

export default function Articles() {
  const [active, setActive] = useState("All");
  const filters = ["All", ...CATEGORIES];
  const visibleCategories = active === "All" ? CATEGORIES : [active];

  return (
    <div data-testid="page-articles" className="bg-white">
      <Seo
        title="Sales Resources — High-Ticket Closing & Incentive Playbooks"
        description="Practical guides on closing high-ticket sales, handling price objections, and using discounted travel vouchers as customer-facing incentives — organized by topic."
        path="/articles"
        schema={[
          collectionSchema(),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Sales Resources", path: "/articles" },
          ]),
        ]}
      />

      {/* Hero */}
      <section className="bg-[#0A0A0A] text-white pt-32 pb-16 lg:pb-20">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
          <div className="inline-block stamp text-[10px]">Sales Resources</div>
          <h1 data-testid="articles-h1" className="font-display mt-6 text-4xl sm:text-5xl lg:text-6xl font-bold leading-[0.98] max-w-4xl">
            The high-ticket closing library.
          </h1>
          <p className="mt-6 text-lg text-white/70 leading-relaxed max-w-2xl">
            {`${ARTICLES.length} field-tested playbooks on closing without discounting, handling price objections, and putting a discounted travel voucher to work in your sales process.`}
          </p>
          <Link
            to="/contact"
            data-testid="articles-hero-cta"
            className="mt-8 inline-flex items-center gap-2 bg-[#FFD300] hover:bg-[#FFEA66] text-black font-bold text-sm px-6 py-3 uppercase tracking-wide"
          >
            Schedule a Campaign Consultation <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </section>

      {/* Filters */}
      <section className="border-b border-[#E5E2D9] sticky top-20 bg-white z-30">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10 py-4 flex flex-wrap gap-2">
          {filters.map((f) => (
            <button
              key={f}
              type="button"
              data-testid={`articles-filter-${f.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}
              onClick={() => setActive(f)}
              className={`text-[11px] font-mono uppercase tracking-widest font-bold px-3 py-2 border transition-colors ${
                active === f
                  ? "bg-black text-[#FFD300] border-black"
                  : "bg-white text-[#595959] border-[#E5E2D9] hover:border-black hover:text-black"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </section>

      {/* Grouped list */}
      <section className="py-12 lg:py-16">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10 space-y-14">
          {visibleCategories.map((cat) => {
            const items = articlesByCategory(cat);
            if (items.length === 0) return null;
            return (
              <div key={cat} data-testid={`articles-group-${cat.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}>
                <div className="flex items-baseline justify-between border-b-2 border-[#0A0A0A] pb-3 mb-6">
                  <h2 className="font-display text-2xl lg:text-3xl font-bold text-[#0A0A0A]">{cat}</h2>
                  <span className="text-[11px] font-mono uppercase tracking-widest text-[#595959] font-bold">{`${items.length} guides`}</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {items.map((a) => (
                    <ArticleCard key={a.slug} a={a} />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Consultation CTA */}
      <section className="pb-16 lg:pb-24">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
          <div className="bg-[#0A0A0A] text-white p-10 lg:p-14">
            <div className="text-[11px] font-mono uppercase tracking-widest text-[#FFD300] font-bold">Put this to work</div>
            <h2 className="mt-3 font-display font-bold text-3xl lg:text-5xl leading-tight max-w-3xl">
              See where a discounted travel voucher fits your sales process.
            </h2>
            <Link
              to="/contact"
              data-testid="articles-footer-cta"
              className="mt-7 inline-flex items-center gap-2 bg-[#FFD300] hover:bg-[#FFEA66] text-black font-bold text-sm px-6 py-3 uppercase tracking-wide"
            >
              Schedule a Campaign Consultation <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
