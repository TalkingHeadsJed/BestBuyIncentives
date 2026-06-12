import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { PROGRAMS } from "@/data/content";
import SectionLabel from "@/components/site/SectionLabel";

export default function ProgramsShowcase() {
  return (
    <section data-testid="programs-showcase" className="bg-[#F5F2EA] py-24 lg:py-32">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
          <div className="max-w-2xl">
            <SectionLabel>The Certificates</SectionLabel>
            <h2 className="font-display mt-6 text-5xl lg:text-7xl font-bold leading-[0.95] text-black">
              The closing tool <br />
              <span className="under-yellow">your reps don't have yet.</span>
            </h2>
          </div>
          <Link
            to="/programs"
            data-testid="programs-showcase-all"
            className="inline-flex items-center gap-2 text-sm font-mono uppercase tracking-widest text-black font-bold border-b-2 border-[#FFD300] pb-1 hover:text-[#FFD300] transition-colors"
          >
            All programs <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        <div className="mt-14 grid grid-cols-1 md:grid-cols-2 gap-5">
          {PROGRAMS.map((p) => (
            <article key={p.slug} className="bg-white border border-[#E5E2D9] flex flex-col group">
              <div className="relative aspect-[5/3] overflow-hidden bg-[#F5F2EA]">
                <img src={p.image} alt={p.name} className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-700" loading="lazy" />
                <span className="absolute top-3 left-3 stamp text-[10px]">{p.badge}</span>
              </div>
              <div className="p-7 lg:p-8 flex-1 flex flex-col">
                <div className="text-[11px] font-mono uppercase tracking-widest text-black/50 font-bold">{p.tagline}</div>
                <h3 className="mt-2 font-display font-bold text-3xl lg:text-4xl leading-[1.05] text-black">{p.name}</h3>
                <p className="mt-3 text-base text-[#595959] leading-relaxed">{p.description}</p>
                <ul className="mt-5 space-y-1.5 flex-1">
                  {p.bullets.map((b) => (
                    <li key={b} className="text-sm text-black flex items-start gap-2">
                      <span className="text-[#FFD300] mt-0.5 font-bold">▸</span>
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  to="/contact"
                  data-testid={`programs-showcase-cta-${p.slug}`}
                  className="mt-6 inline-flex items-center gap-2 bg-[#FFD300] hover:bg-[#FFEA66] text-black font-bold text-sm px-5 py-3 uppercase tracking-wide w-fit"
                >
                  Get Pricing <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
