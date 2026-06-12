import SectionLabel from "@/components/site/SectionLabel";
import { CASE_STUDIES } from "@/data/content";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

export default function CaseStudies() {
  return (
    <div data-testid="page-case-studies" className="pt-28">
      <section className="py-16 lg:py-24 border-b border-white/10">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <SectionLabel>Documented Lift</SectionLabel>
          <h1 className="font-display mt-6 text-5xl lg:text-7xl font-bold leading-[0.95]">
            Real teams.
            <br />
            <span className="text-emerald-400">Real numbers.</span>
          </h1>
          <p className="mt-8 text-zinc-300 text-lg lg:text-xl max-w-3xl leading-relaxed">
            Three sales teams. Three different verticals. Three programs. Here's what changed in their numbers.
          </p>
        </div>
      </section>

      <section className="py-12">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 space-y-12">
          {CASE_STUDIES.map((cs) => (
            <article
              key={cs.slug}
              data-testid={`case-${cs.slug}`}
              className="grid grid-cols-1 lg:grid-cols-12 gap-0 border border-white/10"
            >
              <div className="lg:col-span-5 relative aspect-[4/3] lg:aspect-auto overflow-hidden bg-[#1F2937]">
                <img src={cs.image} alt={cs.company} className="w-full h-full object-cover" loading="lazy" />
                <div className="absolute top-4 left-4 bg-[#0A0F17]/85 backdrop-blur border border-emerald-500/40 text-[10px] font-mono uppercase tracking-widest text-emerald-400 px-2 py-1">
                  {cs.industry}
                </div>
              </div>
              <div className="lg:col-span-7 p-8 lg:p-12 bg-[#0A0F17]">
                <h2 className="font-display font-bold text-3xl lg:text-4xl">{cs.company}</h2>
                <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <div className="text-[10px] font-mono uppercase tracking-widest text-zinc-500">Challenge</div>
                    <p className="mt-2 text-zinc-300">{cs.challenge}</p>
                  </div>
                  <div>
                    <div className="text-[10px] font-mono uppercase tracking-widest text-zinc-500">Solution</div>
                    <p className="mt-2 text-zinc-300">{cs.solution}</p>
                  </div>
                </div>
                <div className="mt-8 grid grid-cols-2 lg:grid-cols-4 gap-px bg-white/10 border border-white/10">
                  {cs.results.map((r) => (
                    <div key={r.k} className="bg-[#111827] p-5">
                      <div className="text-[10px] font-mono uppercase tracking-widest text-zinc-500">{r.k}</div>
                      <div className="mt-1 font-display font-bold text-emerald-400 text-2xl tabular-num">{r.v}</div>
                    </div>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="py-24 border-t border-white/10 mt-12">
        <div className="mx-auto max-w-5xl px-6 lg:px-8 text-center">
          <h2 className="font-display text-4xl lg:text-5xl font-bold leading-[1.05]">
            What would these numbers look like <span className="text-emerald-400">on your sales floor?</span>
          </h2>
          <Link
            to="/contact"
            data-testid="cases-cta"
            className="mt-10 inline-flex items-center gap-3 bg-emerald-500 hover:bg-emerald-400 text-[#0A0F17] font-semibold text-base px-7 py-4"
          >
            Run the Numbers <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
