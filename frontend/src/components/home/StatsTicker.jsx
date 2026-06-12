import Marquee from "react-fast-marquee";
import { STATS } from "@/data/content";

export default function StatsTicker() {
  return (
    <section data-testid="stats-ticker" className="bg-[#0A0A0A] text-white py-5 overflow-hidden border-y-4 border-[#FFD300]">
      <Marquee speed={42} pauseOnHover gradient={false}>
        {[...STATS, ...STATS].map((s, i) => (
          <div key={i} className="flex items-center gap-4 px-10">
            <span className="font-display font-bold text-3xl tabular-num text-[#FFD300]">{s.value}</span>
            <span className="text-xs font-mono uppercase tracking-[0.25em] text-white/80">{s.label}</span>
            <span className="text-white/30 ml-6">/</span>
          </div>
        ))}
      </Marquee>
    </section>
  );
}
