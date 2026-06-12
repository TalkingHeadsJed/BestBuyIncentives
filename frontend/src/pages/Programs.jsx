import SectionLabel from "@/components/site/SectionLabel";
import { PROGRAMS } from "@/data/content";
import { Link } from "react-router-dom";
import { ArrowRight, Check } from "lucide-react";

export default function Programs() {
  return (
    <div data-testid="page-programs" className="pt-28">
      <section className="py-16 lg:py-24 border-b border-white/10">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <SectionLabel>Sales-Grade Certificate Programs</SectionLabel>
          <h1 className="font-display mt-6 text-5xl lg:text-7xl font-bold leading-[0.95]">
            The closing instrument.
            <br />
            <span className="text-emerald-400">Pick the weapon.</span>
          </h1>
          <p className="mt-8 text-zinc-300 text-lg lg:text-xl max-w-3xl leading-relaxed">
            Three flagship programs and a fully custom build. Sized to your ticket. Priced for bulk deployment to a real sales floor.
          </p>
        </div>
      </section>

      <section className="py-12 lg:py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 space-y-px">
          {PROGRAMS.map((p, i) => (
            <article
              key={p.slug}
              data-testid={`program-${p.slug}`}
              className={`grid grid-cols-1 lg:grid-cols-12 gap-0 border border-white/10 ${i % 2 ? "" : ""}`}
            >
              <div className={`lg:col-span-6 relative aspect-[5/4] lg:aspect-auto bg-[#1F2937] overflow-hidden ${i % 2 ? "lg:order-2" : ""}`}>
                <img src={p.image} alt={p.name} className="w-full h-full object-cover" loading="lazy" />
              </div>
              <div className={`lg:col-span-6 p-8 lg:p-12 bg-[#0A0F17] ${i % 2 ? "lg:order-1" : ""}`}>
                <div className="inline-block bg-emerald-500/10 border border-emerald-500/40 text-[10px] font-mono uppercase tracking-widest text-emerald-400 px-2 py-1">
                  {p.badge}
                </div>
                <div className="mt-5 text-[11px] font-mono uppercase tracking-widest text-emerald-400">{p.tagline}</div>
                <h2 className="mt-2 font-display font-bold text-3xl lg:text-5xl leading-tight">{p.name}</h2>
                <p className="mt-5 text-zinc-300 text-base lg:text-lg leading-relaxed">{p.description}</p>
                <ul className="mt-6 space-y-2.5">
                  {p.bullets.map((b) => (
                    <li key={b} className="flex items-start gap-3 text-zinc-200">
                      <span className="mt-1 inline-flex h-4 w-4 items-center justify-center bg-emerald-500/15 text-emerald-400 shrink-0">
                        <Check className="h-2.5 w-2.5" strokeWidth={3} />
                      </span>
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  to="/contact"
                  data-testid={`program-cta-${p.slug}`}
                  className="mt-8 inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-[#0A0F17] font-semibold text-sm px-5 py-3"
                >
                  Get pricing <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="py-24 border-t border-white/10">
        <div className="mx-auto max-w-5xl px-6 lg:px-8 text-center">
          <div className="text-[11px] font-mono uppercase tracking-widest text-emerald-400">Custom Programs</div>
          <h2 className="font-display mt-4 text-4xl lg:text-5xl font-bold leading-[1.05]">
            Or build something <span className="text-emerald-400">only your team has.</span>
          </h2>
          <p className="mt-6 text-zinc-300 text-lg max-w-2xl mx-auto">
            Co-branded certificates. Custom destinations. Programs sized to a specific deal range, a specific season, or a specific objection your team is fighting.
          </p>
          <Link
            to="/contact"
            data-testid="programs-custom-cta"
            className="mt-10 inline-flex items-center gap-3 bg-emerald-500 hover:bg-emerald-400 text-[#0A0F17] font-semibold text-base px-7 py-4"
          >
            Design a Custom Program <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
