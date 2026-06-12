import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { PROGRAMS } from "@/data/content";
import SectionLabel from "@/components/site/SectionLabel";

export default function ProgramsShowcase() {
  return (
    <section data-testid="programs-showcase" className="py-24 lg:py-32 border-b border-white/10">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
          <div className="max-w-2xl">
            <SectionLabel>Sales-Grade Certificate Programs</SectionLabel>
            <h2 className="font-display mt-6 text-4xl lg:text-5xl font-bold leading-[1.05]">
              The closing instrument <span className="text-emerald-400">your reps don't have yet.</span>
            </h2>
          </div>
          <Link
            to="/programs"
            data-testid="programs-showcase-all"
            className="inline-flex items-center gap-2 text-sm font-mono uppercase tracking-widest text-emerald-400 hover:text-emerald-300"
          >
            All programs <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-px bg-white/10 border border-white/10">
          {PROGRAMS.map((p) => (
            <article key={p.slug} className="group bg-[#0A0F17] p-8 lg:p-10 hover:bg-[#111827] transition-colors">
              <div className="relative aspect-[5/3] overflow-hidden bg-[#1F2937] border border-white/10">
                <img
                  src={p.image}
                  alt={p.name}
                  className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-700"
                  loading="lazy"
                />
                <span className="absolute top-3 left-3 bg-[#0A0F17]/85 backdrop-blur border border-emerald-500/40 text-[10px] font-mono uppercase tracking-widest text-emerald-400 px-2 py-1">
                  {p.badge}
                </span>
              </div>
              <div className="mt-6">
                <div className="text-[11px] font-mono uppercase tracking-widest text-emerald-400">{p.tagline}</div>
                <h3 className="mt-2 font-display font-bold text-2xl lg:text-3xl">{p.name}</h3>
                <p className="mt-3 text-zinc-400 leading-relaxed">{p.description}</p>
                <ul className="mt-5 space-y-1.5">
                  {p.bullets.map((b) => (
                    <li key={b} className="text-sm text-zinc-300 flex items-start gap-2">
                      <span className="text-emerald-400 mt-0.5">▸</span>
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
