import { INDUSTRIES } from "@/data/content";
import { IMG } from "@/data/images";
import SectionLabel from "@/components/site/SectionLabel";

export default function IndustriesGrid() {
  return (
    <section data-testid="industries-grid" className="relative bg-[#0A0A0A] text-white">
      <div className="absolute inset-0 z-0 opacity-25">
        <img src={IMG.heroPanel} alt="" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0A] via-[#0A0A0A]/80 to-[#0A0A0A]" />
      </div>

      <div className="relative z-10 mx-auto max-w-[1400px] px-6 lg:px-10 py-24 lg:py-32">
        <div className="max-w-3xl">
          <SectionLabel dark>For High-Ticket Teams</SectionLabel>
          <h2 className="font-display mt-6 text-5xl lg:text-7xl font-bold leading-[0.95]">
            If your team sells anything north of <span className="hl-yellow-full text-black">$2K a ticket</span> — this is for you.
          </h2>
        </div>

        <div className="mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-white/10">
          {INDUSTRIES.map((ind) => (
            <article key={ind.name} className="bg-[#0A0A0A] p-7 lg:p-8 hover:bg-[#171717] transition-colors group">
              <div className="font-display font-bold text-2xl lg:text-3xl text-white group-hover:text-[#FFD300] transition-colors">
                {ind.name}
              </div>
              <p className="mt-3 text-sm text-white/70 leading-relaxed min-h-[100px]">{ind.desc}</p>
              <div className="mt-6 pt-5 border-t border-white/15">
                <div className="text-[10px] font-mono uppercase tracking-widest text-white/50 font-bold">Typical lift</div>
                <div className="font-display font-bold text-[#FFD300] text-2xl mt-1 tabular-num">{ind.metric}</div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
