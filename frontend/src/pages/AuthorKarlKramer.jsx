import Seo, { breadcrumbSchema, personSchema } from "@/components/site/Seo";
import { Link } from "react-router-dom";
import { ChevronRight, ArrowRight, Linkedin, Check } from "lucide-react";
import { AUTHOR } from "@/data/author";
import { ARTICLES, CATEGORIES } from "@/data/articles";

const RESOURCE_LINKS = [
  { label: "Sales resource library", to: "/articles" },
  { label: "How discounted travel vouchers work", to: "/programs" },
  { label: "Discuss a sales-incentive campaign", to: "/contact" },
];

export default function AuthorKarlKramer() {
  const grouped = CATEGORIES.map((cat) => ({
    category: cat,
    items: ARTICLES.filter((a) => a.category === cat),
  })).filter((g) => g.items.length > 0);

  return (
    <div data-testid="page-author" className="bg-white">
      <Seo
        title="Karl Kramer | Sales Incentive Expert"
        description="Meet Karl Kramer, CEO of Best Buy Incentives, who has spent more than three decades helping salespeople improve closing rates with travel incentives."
        path="/authors/karl-kramer"
        type="profile"
        image={`https://bestbuyincentives.com${AUTHOR.image}`}
        schema={[
          personSchema,
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Authors", path: "/authors/karl-kramer" },
            { name: "Karl Kramer", path: "/authors/karl-kramer" },
          ]),
        ]}
      />

      {/* Hero */}
      <section className="bg-[#0A0A0A] text-white pt-32 pb-16">
        <div className="mx-auto max-w-4xl px-6 lg:px-10">
          <nav data-testid="author-breadcrumb" aria-label="Breadcrumb" className="flex items-center gap-2 text-[11px] font-mono uppercase tracking-widest text-white/50 font-bold">
            <Link to="/" className="hover:text-[#FFD300]">Home</Link>
            <ChevronRight className="h-3 w-3" />
            <span className="text-[#FFD300]">Karl Kramer</span>
          </nav>

          <div className="mt-8 flex flex-col sm:flex-row gap-8 items-start">
            <img
              src={AUTHOR.image}
              alt={AUTHOR.imageAlt}
              width="160"
              height="160"
              className="h-40 w-40 rounded-full object-cover border-4 border-[#FFD300] shrink-0"
              data-testid="author-photo"
            />
            <div>
              <div className="text-[11px] font-mono uppercase tracking-widest text-[#FFD300] font-bold">Author</div>
              <h1 data-testid="author-h1" className="font-display mt-4 text-4xl lg:text-6xl font-bold leading-[0.98]">Karl Kramer</h1>
              <p className="mt-3 text-lg text-white/70 font-bold">{AUTHOR.titleLine}</p>
              <a
                href={AUTHOR.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                data-testid="author-linkedin"
                className="mt-5 inline-flex items-center gap-2 text-[11px] font-mono uppercase tracking-widest text-white/60 font-bold hover:text-[#FFD300]"
              >
                <Linkedin className="h-4 w-4" /> Connect on LinkedIn
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Bio + expertise */}
      <section className="py-14 lg:py-20">
        <div className="mx-auto max-w-4xl px-6 lg:px-10 grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2">
            <div className="text-[11px] font-mono uppercase tracking-widest text-[#595959] font-bold">About Karl</div>
            <p data-testid="author-bio" className="mt-4 text-lg text-[#333] leading-relaxed">{AUTHOR.bioLong}</p>

            <div className="mt-8 flex flex-wrap gap-3">
              {RESOURCE_LINKS.map((r) => (
                <Link
                  key={r.to}
                  to={r.to}
                  data-testid={`author-resource-${r.to.replace(/\//g, "")}`}
                  className="inline-flex items-center gap-2 border border-black px-4 py-2 text-sm font-bold text-black hover:bg-[#FFD300] transition-colors"
                >
                  {`${r.label} `}<ArrowRight className="h-3.5 w-3.5" />
                </Link>
              ))}
            </div>
          </div>

          <div>
            <div className="text-[11px] font-mono uppercase tracking-widest text-[#595959] font-bold">Areas of expertise</div>
            <ul data-testid="author-expertise" className="mt-4 space-y-3">
              {AUTHOR.expertise.map((e) => (
                <li key={e} className="flex items-start gap-2 text-sm text-[#333] leading-relaxed">
                  <Check className="h-4 w-4 text-[#FFD300] mt-0.5 shrink-0" />
                  <span>{e}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Articles by Karl */}
      <section className="pb-20 lg:pb-28">
        <div className="mx-auto max-w-4xl px-6 lg:px-10">
          <div className="border-t border-[#E5E2D9] pt-10">
            <h2 className="font-display text-3xl lg:text-4xl font-bold text-black">Articles by Karl Kramer</h2>
            <p className="mt-2 text-sm text-[#595959]">{`${ARTICLES.length} sales-incentive articles and playbooks.`}</p>

            <div className="mt-10 space-y-10" data-testid="author-articles">
              {grouped.map((g) => (
                <div key={g.category}>
                  <div className="text-[11px] font-mono uppercase tracking-widest text-[#595959] font-bold mb-4">{g.category}</div>
                  <ul className="space-y-2">
                    {g.items.map((a) => (
                      <li key={a.slug}>
                        <Link to={`/${a.slug}`} className="inline-flex items-start gap-2 text-black font-bold hover:text-[#595959]">
                          <ArrowRight className="h-3.5 w-3.5 text-[#FFD300] mt-1 shrink-0" />
                          <span>{a.h1 || a.title}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
