import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { CASE_STUDIES } from "@/data/content";
import { IMG } from "@/data/images";
import SectionLabel from "@/components/site/SectionLabel";

const CASE_PHOTOS = [IMG.furnitureShow, IMG.autoShowroom, IMG.jewelryShow];

export default function CaseStudiesPreview() {
  return (
    <section data-testid="case-studies-preview" className="bg-white py-20 lg:py-28">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
          <div className="max-w-2xl">
            <SectionLabel>Case Studies</SectionLabel>
            <h2 className="font-display mt-6 text-5xl lg:text-7xl font-bold leading-[0.92] text-black">
              Real teams. Real numbers. <br />
              <span className="under-yellow">Documented lift.</span>
            </h2>
          </div>
          <Link
            to="/case-studies"
            data-testid="case-studies-all"
            className="inline-flex items-center gap-2 text-sm font-mono uppercase tracking-widest text-black font-bold border-b-2 border-[#FFD300] pb-1 hover:text-black transition-colors"
          >
            All case studies <ArrowUpRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        <div className="mt-14 space-y-10">
          {CASE_STUDIES.map((cs, i) => (
            <article key={cs.slug} className="group">
              {/* MASSIVE full-width photo with overlay */}
              <div className="relative h-[50vh] min-h-[400px] lg:h-[520px] overflow-hidden">
                <img src={CASE_PHOTOS[i % CASE_PHOTOS.length]} alt={cs.company} className="absolute inset-0 w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-1000" />
                <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/55 to-black/30" />

                <div className="relative h-full mx-auto max-w-[1400px] px-6 lg:px-10 flex items-center">
                  <div className="max-w-2xl text-white">
                    <div className="inline-block stamp">{cs.industry}</div>
                    <h3 className="mt-5 font-display font-bold text-4xl lg:text-6xl leading-[0.92]">{cs.company}</h3>
                    <p className="mt-4 text-base lg:text-lg text-white/85 max-w-xl leading-relaxed">{cs.challenge}</p>

                    <div className="mt-7 grid grid-cols-2 lg:grid-cols-4 gap-3">
                      {cs.results.map((r) => (
                        <div key={r.k} className="bg-[#FFD300] p-4">
                          <div className="text-[10px] font-mono uppercase tracking-widest text-black/70 font-bold">{r.k}</div>
                          <div className="mt-1 font-display font-bold text-black text-2xl tabular-num">{r.v}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
