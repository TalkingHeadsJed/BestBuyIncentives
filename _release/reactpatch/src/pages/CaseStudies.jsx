import Seo from "@/components/site/Seo";
import SectionLabel from "@/components/site/SectionLabel";
import { CASE_STUDIES } from "@/data/content";
import { IMG } from "@/data/images";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

export default function CaseStudies() {
  return (
    <div data-testid="page-case-studies">
      <Seo
        title="Case Studies — Documented Sales Lift From Real Teams"
        description="See how furniture, automotive, and jewelry retailers reported using discounted travel vouchers to support sales, protect price, and differentiate their offers."
        path="/case-studies"
      />
      <section className="relative bg-[#0A0A0A] text-white overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-35">
          <img src={IMG.closing} alt="" className="w-full h-full object-cover kenburn" />
          <div className="absolute inset-0 bg-gradient-to-br from-black via-black/60 to-black/95" />
        </div>
        <div className="relative z-10 mx-auto max-w-[1400px] px-6 lg:px-10 pt-40 pb-24 lg:pb-32">
          <SectionLabel dark>Documented Lift</SectionLabel>
          <h1 className="font-display mt-6 text-5xl sm:text-6xl lg:text-8xl font-bold leading-[0.92]">
            Real teams.<br />
            <span className="hl-yellow-full text-black">Real numbers.</span>
          </h1>
          <p className="mt-8 text-lg lg:text-2xl max-w-3xl leading-[1.4] text-white/85">
            Three sales teams. Three verticals. Three programs. Here's what changed in their numbers.
          </p>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10 space-y-10">
          {CASE_STUDIES.map((cs) => (
            <article key={cs.slug} data-testid={`case-${cs.slug}`} className="grid grid-cols-1 lg:grid-cols-12 gap-0 border border-[#E5E2D9]">
              <div className="lg:col-span-5 relative aspect-[4/3] lg:aspect-auto overflow-hidden bg-[#F5F2EA]">
                <img src={cs.image} alt={cs.company} className="w-full h-full object-cover" loading="lazy" />
                <span className="absolute top-4 left-4 stamp text-[10px]">{cs.industry}</span>
              </div>
              <div className="lg:col-span-7 p-8 lg:p-12 bg-white">
                <h2 className="font-display font-bold text-3xl lg:text-5xl leading-[0.95] text-black">{cs.company}</h2>
                <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <div className="text-[10px] font-mono uppercase tracking-widest text-black/50 font-bold">Challenge</div>
                    <p className="mt-2 text-[#404040]">{cs.challenge}</p>
                  </div>
                  <div>
                    <div className="text-[10px] font-mono uppercase tracking-widest text-black/50 font-bold">Solution</div>
                    <p className="mt-2 text-[#404040]">{cs.solution}</p>
                  </div>
                </div>
                <div className="mt-8 grid grid-cols-2 lg:grid-cols-4 gap-3">
                  {cs.results.map((r) => (
                    <div key={r.k} className="bg-[#FFD300] p-5">
                      <div className="text-[10px] font-mono uppercase tracking-widest text-black/70 font-bold">{r.k}</div>
                      <div className="mt-1 font-display font-bold text-black text-2xl lg:text-3xl tabular-num">{r.v}</div>
                    </div>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-[#F5F2EA] py-24">
        <div className="mx-auto max-w-5xl px-6 lg:px-10 text-center">
          <h2 className="font-display text-4xl lg:text-6xl font-bold leading-[0.95] text-black">
            What would these numbers look like <span className="under-yellow">on your sales floor?</span>
          </h2>
          <Link
            to="/contact"
            data-testid="cases-cta"
            className="mt-10 inline-flex items-center gap-3 bg-[#0A0A0A] hover:bg-black text-white font-bold text-lg px-8 py-5 uppercase tracking-wide"
          >
            Run the Numbers <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </section>
    </div>
  );
}
