import SectionLabel from "@/components/site/SectionLabel";
import { PROGRAMS } from "@/data/content";
import { IMG } from "@/data/images";
import { Link } from "react-router-dom";
import { ArrowRight, Check } from "lucide-react";

export default function Programs() {
  return (
    <div data-testid="page-programs">
      <section className="relative bg-[#0A0A0A] text-white overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-35">
          <img src={IMG.trainingRoom} alt="" className="w-full h-full object-cover kenburn" />
          <div className="absolute inset-0 bg-gradient-to-br from-black via-black/60 to-black/95" />
        </div>
        <div className="relative z-10 mx-auto max-w-[1400px] px-6 lg:px-10 pt-40 pb-24 lg:pb-32">
          <SectionLabel dark>Sales-Grade Certificate Programs</SectionLabel>
          <h1 className="font-display mt-6 text-5xl sm:text-6xl lg:text-8xl font-bold leading-[0.92]">
            Pick the <span className="hl-yellow-full text-black">closing weapon.</span>
          </h1>
          <p className="mt-8 text-lg lg:text-2xl max-w-3xl leading-[1.4] text-white/85">
            Three flagship programs and a fully custom build. Sized to your ticket. Priced for bulk deployment to a real sales floor.
          </p>
        </div>
      </section>

      <section className="bg-white py-12 lg:py-20">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10 space-y-5">
          {PROGRAMS.map((p, i) => (
            <article
              key={p.slug}
              data-testid={`program-${p.slug}`}
              className="grid grid-cols-1 lg:grid-cols-12 gap-0 border border-[#E5E2D9]"
            >
              <div className={`lg:col-span-6 relative aspect-[5/4] lg:aspect-auto bg-[#F5F2EA] overflow-hidden ${i % 2 ? "lg:order-2" : ""}`}>
                <img src={p.image} alt={p.name} className="w-full h-full object-cover" loading="lazy" />
              </div>
              <div className={`lg:col-span-6 p-8 lg:p-12 bg-white ${i % 2 ? "lg:order-1" : ""} flex flex-col justify-center`}>
                <div className="inline-block stamp self-start">{p.badge}</div>
                <div className="mt-5 text-[11px] font-mono uppercase tracking-widest text-black/50 font-bold">{p.tagline}</div>
                <h2 className="mt-2 font-display font-bold text-4xl lg:text-6xl leading-[0.95] text-black">{p.name}</h2>
                <p className="mt-5 text-base lg:text-lg text-[#404040] leading-relaxed">{p.description}</p>
                <ul className="mt-6 space-y-2.5">
                  {p.bullets.map((b) => (
                    <li key={b} className="flex items-start gap-3 text-base text-black">
                      <span className="mt-1 inline-flex h-5 w-5 items-center justify-center bg-[#FFD300] shrink-0">
                        <Check className="h-3 w-3 text-black" strokeWidth={3} />
                      </span>
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  to="/contact"
                  data-testid={`program-cta-${p.slug}`}
                  className="mt-8 inline-flex items-center gap-2 bg-[#FFD300] hover:bg-[#FFEA66] text-black font-bold text-sm px-6 py-4 uppercase tracking-wide w-fit"
                >
                  Get Pricing <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-[#0A0A0A] text-white py-24">
        <div className="mx-auto max-w-5xl px-6 lg:px-10 text-center">
          <div className="text-[11px] font-mono uppercase tracking-widest text-[#FFD300] font-bold">Custom Programs</div>
          <h2 className="font-display mt-4 text-4xl lg:text-6xl font-bold leading-[0.95]">
            Or build something <span className="hl-yellow-full text-black">only your team has.</span>
          </h2>
          <p className="mt-6 text-lg lg:text-xl text-white/80 max-w-2xl mx-auto">
            Co-branded certificates. Custom destinations. Programs sized to a specific deal range, a specific season, or a specific objection your team is fighting.
          </p>
          <Link
            to="/contact"
            data-testid="programs-custom-cta"
            className="mt-10 inline-flex items-center gap-3 bg-[#FFD300] hover:bg-[#FFEA66] text-black font-bold text-lg px-8 py-5 uppercase tracking-wide"
          >
            Design a Custom Program <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </section>
    </div>
  );
}
