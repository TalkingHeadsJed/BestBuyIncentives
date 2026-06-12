import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { CASE_STUDIES } from "@/data/content";
import SectionLabel from "@/components/site/SectionLabel";

export default function CaseStudiesPreview() {
  return (
    <section data-testid="case-studies-preview" className="bg-white py-24 lg:py-32">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
          <div className="max-w-2xl">
            <SectionLabel>Case Studies</SectionLabel>
            <h2 className="font-display mt-6 text-5xl lg:text-7xl font-bold leading-[0.95] text-black">
              Real teams. <br />
              Real numbers. <span className="under-yellow">Documented lift.</span>
            </h2>
          </div>
          <Link
            to="/case-studies"
            data-testid="case-studies-all"
            className="inline-flex items-center gap-2 text-sm font-mono uppercase tracking-widest text-black font-bold border-b-2 border-[#FFD300] pb-1 hover:text-[#FFD300] transition-colors"
          >
            All case studies <ArrowUpRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        <div className="mt-14 space-y-5">
          {CASE_STUDIES.map((cs) => (
            <article key={cs.slug} className="grid grid-cols-1 lg:grid-cols-12 gap-0 border border-[#E5E2D9]">
              <div className="lg:col-span-5 relative aspect-[4/3] lg:aspect-auto overflow-hidden bg-[#F5F2EA]">
                <img src={cs.image} alt={cs.company} className="w-full h-full object-cover" loading="lazy" />
                <span className="absolute top-3 left-3 stamp text-[10px]">{cs.industry}</span>
              </div>
              <div className="lg:col-span-7 p-8 lg:p-10 bg-white">
                <h3 className="font-display font-bold text-3xl lg:text-4xl text-black leading-[1.05]">{cs.company}</h3>
                <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-5 text-sm">
                  <div>
                    <div className="text-[10px] font-mono uppercase tracking-widest text-black/50 font-bold">Challenge</div>
                    <p className="mt-1 text-[#404040]">{cs.challenge}</p>
                  </div>
                  <div>
                    <div className="text-[10px] font-mono uppercase tracking-widest text-black/50 font-bold">Solution</div>
                    <p className="mt-1 text-[#404040]">{cs.solution}</p>
                  </div>
                </div>
                <div className="mt-7 grid grid-cols-2 lg:grid-cols-4 gap-3">
                  {cs.results.map((r) => (
                    <div key={r.k} className="bg-[#F5F2EA] p-4">
                      <div className="text-[10px] font-mono uppercase tracking-widest text-black/50 font-bold">{r.k}</div>
                      <div className="mt-1 font-display font-bold text-black text-2xl lg:text-3xl tabular-num">{r.v}</div>
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
