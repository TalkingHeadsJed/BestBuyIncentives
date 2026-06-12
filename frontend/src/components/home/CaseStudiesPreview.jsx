import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { CASE_STUDIES } from "@/data/content";
import SectionLabel from "@/components/site/SectionLabel";

export default function CaseStudiesPreview() {
  return (
    <section data-testid="case-studies-preview" className="py-24 lg:py-32 border-b border-white/10">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
          <div className="max-w-2xl">
            <SectionLabel>Case Studies</SectionLabel>
            <h2 className="font-display mt-6 text-4xl lg:text-5xl font-bold leading-[1.05]">
              Real teams. Real numbers. <span className="text-emerald-400">Documented lift.</span>
            </h2>
          </div>
          <Link
            to="/case-studies"
            data-testid="case-studies-all"
            className="inline-flex items-center gap-2 text-sm font-mono uppercase tracking-widest text-emerald-400 hover:text-emerald-300"
          >
            All case studies <ArrowUpRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        <div className="mt-12 space-y-px bg-white/10 border border-white/10">
          {CASE_STUDIES.map((cs) => (
            <article key={cs.slug} className="bg-[#0A0F17] grid grid-cols-1 lg:grid-cols-12 gap-0">
              <div className="lg:col-span-4 relative aspect-[4/3] lg:aspect-auto overflow-hidden bg-[#1F2937]">
                <img src={cs.image} alt={cs.company} className="w-full h-full object-cover" loading="lazy" />
                <div className="absolute top-4 left-4 bg-[#0A0F17]/85 backdrop-blur border border-white/15 text-[10px] font-mono uppercase tracking-widest text-emerald-400 px-2 py-1">
                  {cs.industry}
                </div>
              </div>
              <div className="lg:col-span-8 p-8 lg:p-10">
                <h3 className="font-display font-bold text-2xl lg:text-3xl text-white">{cs.company}</h3>
                <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <div className="text-[10px] font-mono uppercase tracking-widest text-zinc-500">Challenge</div>
                    <p className="mt-1 text-zinc-300">{cs.challenge}</p>
                  </div>
                  <div>
                    <div className="text-[10px] font-mono uppercase tracking-widest text-zinc-500">Solution</div>
                    <p className="mt-1 text-zinc-300">{cs.solution}</p>
                  </div>
                </div>
                <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-px bg-white/10">
                  {cs.results.map((r) => (
                    <div key={r.k} className="bg-[#111827] p-4">
                      <div className="text-[10px] font-mono uppercase tracking-widest text-zinc-500">{r.k}</div>
                      <div className="mt-1 font-display font-bold text-emerald-400 text-2xl tabular-num">{r.v}</div>
                    </div>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
