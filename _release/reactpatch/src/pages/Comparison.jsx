import Seo, { faqSchema, breadcrumbSchema } from "@/components/site/Seo";
import SectionLabel from "@/components/site/SectionLabel";
import { Link } from "react-router-dom";
import { ArrowRight, Check, X } from "lucide-react";
import { COMPARISONS } from "@/data/comparisons";
import NotFound from "@/pages/NotFound";

export default function Comparison({ slug }) {
  const data = COMPARISONS[slug];
  if (!data) return <NotFound />;

  const { altLabel, heroWord, seoTitle, seoDescription, heroSubtitle, rows, mathLeft, mathRight, faqs } = data;
  const path = `/travel-incentives-vs-${slug}`;

  return (
    <div data-testid="comparison-page">
      <Seo
        title={seoTitle}
        description={seoDescription}
        path={path}
        schema={[
          faqSchema(faqs),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: `Travel Incentives vs. ${altLabel}`, path },
          ]),
        ]}
      />

      {/* Header */}
      <section className="bg-[#0A0A0A] text-white pt-36 pb-20 lg:pt-40 lg:pb-24">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
          <SectionLabel dark>Head to head</SectionLabel>
          <h1 className="font-display mt-6 text-5xl lg:text-7xl font-bold leading-[0.9] max-w-4xl">
            Travel incentives vs. <span className="hl-yellow-full text-black">{heroWord}</span>
          </h1>
          <p className="mt-6 text-lg text-white/70 max-w-2xl leading-relaxed">{heroSubtitle}</p>
        </div>
      </section>

      {/* Comparison table */}
      <section className="bg-white py-16 lg:py-24">
        <div className="mx-auto max-w-[1100px] px-6 lg:px-10">
          <div className="grid grid-cols-1 md:grid-cols-[1.1fr_1fr_1fr] gap-px bg-[#E5E2D9] border border-[#E5E2D9]">
            <div className="bg-white p-5 hidden md:block" />
            <div className="bg-[#0A0A0A] text-white p-5 flex items-center gap-2 font-display font-bold text-lg">
              <X className="h-5 w-5 text-white/50" />{` ${altLabel}`}
            </div>
            <div className="bg-[#FFD300] text-black p-5 flex items-center gap-2 font-display font-bold text-lg">
              <Check className="h-5 w-5" /> Travel Incentive
            </div>

            {rows.map((r, i) => (
              <div key={i} className="contents" data-testid={`compare-row-${i}`}>
                <div className="bg-white p-5 font-display font-bold text-black text-base border-t border-[#E5E2D9] md:border-t-0">
                  {r.dim}
                </div>
                <div className="bg-white p-5 text-sm text-[#595959] leading-relaxed flex gap-2">
                  <X className="h-4 w-4 text-black/30 shrink-0 mt-0.5" />
                  <span>{r.alt}</span>
                </div>
                <div className="bg-[#FFFBEA] p-5 text-sm text-black leading-relaxed flex gap-2">
                  <Check className="h-4 w-4 text-[#0A0A0A] shrink-0 mt-0.5" />
                  <span>{r.incentive}</span>
                </div>
              </div>
            ))}
          </div>

          {/* The math */}
          <div className="mt-16 grid md:grid-cols-2 gap-8">
            <div className="border border-[#E5E2D9] p-8">
              <div className="text-[11px] font-mono uppercase tracking-widest text-black/50 font-bold">{mathLeft.label}</div>
              <p className="mt-4 font-display text-2xl font-bold text-black leading-snug">{mathLeft.headline}</p>
              <p className="mt-4 text-[#595959] leading-relaxed">{mathLeft.body}</p>
            </div>
            <div className="bg-[#0A0A0A] text-white p-8">
              <div className="text-[11px] font-mono uppercase tracking-widest text-[#FFD300] font-bold">{mathRight.label}</div>
              <p className="mt-4 font-display text-2xl font-bold leading-snug">{mathRight.headline}</p>
              <p className="mt-4 text-white/70 leading-relaxed">{mathRight.body}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Verdict / FAQ */}
      <section className="bg-[#F7F5EF] py-16 lg:py-24">
        <div className="mx-auto max-w-[900px] px-6 lg:px-10">
          <SectionLabel>The bottom line</SectionLabel>
          <h2 className="font-display mt-5 text-4xl lg:text-5xl font-bold text-black leading-[0.95]">
            Stop discounting. Start closing.
          </h2>
          <dl className="mt-10 divide-y divide-[#E5E2D9] border-y border-[#E5E2D9]">
            {faqs.map((f, i) => (
              <div key={i} data-testid={`compare-faq-${i}`} className="py-7">
                <dt className="font-display text-xl lg:text-2xl font-bold text-black leading-tight">{f.q}</dt>
                <dd className="mt-3 text-base lg:text-lg text-[#595959] leading-relaxed">{f.a}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#FFD300] py-16 lg:py-20">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <h2 className="font-display text-3xl lg:text-4xl font-bold text-black leading-tight max-w-2xl">
            See what stopping the discount does to your numbers.
          </h2>
          <Link
            to="/contact"
            data-testid="comparison-cta"
            className="inline-flex items-center gap-3 bg-black hover:bg-[#171717] text-white font-bold text-lg px-8 py-5 uppercase tracking-wide whitespace-nowrap"
          >
            Book a Strategy Call <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </section>
    </div>
  );
}
