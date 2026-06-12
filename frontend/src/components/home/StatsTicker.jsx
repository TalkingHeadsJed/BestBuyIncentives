import Marquee from "react-fast-marquee";
import { STATS } from "@/data/content";

export default function StatsTicker() {
  return (
    <section data-testid="stats-ticker" className="border-y border-white/10 bg-[#0A0F17]/80 py-6 overflow-hidden">
      <Marquee gradient gradientColor="#0A0F17" gradientWidth={120} speed={42} pauseOnHover>
        {[...STATS, ...STATS].map((s, i) => (
          <div key={i} className="flex items-center gap-4 px-10">
            <span className="font-display font-bold text-2xl text-emerald-400 tabular-num">{s.value}</span>
            <span className="text-[11px] font-mono uppercase tracking-[0.25em] text-zinc-400">{s.label}</span>
            <span className="text-zinc-700 px-4">/</span>
          </div>
        ))}
      </Marquee>
    </section>
  );
}
