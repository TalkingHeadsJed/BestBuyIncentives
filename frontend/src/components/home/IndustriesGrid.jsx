import { INDUSTRIES } from "@/data/content";
import SectionLabel from "@/components/site/SectionLabel";

export default function IndustriesGrid() {
  return (
    <section data-testid="industries-grid" className="py-24 lg:py-32 border-b border-white/10">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="max-w-3xl">
          <SectionLabel>Built For High-Ticket Sales Teams</SectionLabel>
          <h2 className="font-display mt-6 text-4xl lg:text-5xl font-bold leading-[1.05]">
            If your team sells anything north of <span className="text-emerald-400">$2,000 a ticket</span> — this is for you.
          </h2>
        </div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-white/10 border border-white/10">
          {INDUSTRIES.map((ind) => (
            <article key={ind.name} className="bg-[#0A0F17] p-8 hover:bg-[#111827] transition-colors group">
              <div className="font-display font-semibold text-xl text-white group-hover:text-emerald-400 transition-colors">
                {ind.name}
              </div>
              <p className="mt-3 text-sm text-zinc-400 leading-relaxed min-h-[80px]">{ind.desc}</p>
              <div className="mt-6 pt-5 border-t border-white/10">
                <div className="text-[10px] font-mono uppercase tracking-widest text-zinc-500">Typical lift</div>
                <div className="font-display font-bold text-emerald-400 text-lg mt-1 tabular-num">{ind.metric}</div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
