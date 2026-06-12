import { IMG } from "@/data/images";
import { PROBLEM_POINTS } from "@/data/content";
import SectionLabel from "@/components/site/SectionLabel";

export default function ProblemSection() {
  return (
    <section data-testid="problem-section" className="relative bg-[#0A0A0A] text-white overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0 z-0 opacity-25">
        <img src={IMG.heroAudience} alt="" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0A0A0A] via-[#0A0A0A]/85 to-[#0A0A0A]/40" />
      </div>

      <div className="relative z-10 mx-auto max-w-[1400px] px-6 lg:px-10 py-24 lg:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-5">
            <SectionLabel dark>The Brutal Truth</SectionLabel>
            <h2 className="font-display mt-6 text-5xl lg:text-7xl font-bold leading-[0.95]">
              Your sales team is <br />
              <span className="hl-yellow-full text-black">losing on price.</span>
            </h2>
            <p className="mt-7 text-lg text-white/80 leading-relaxed max-w-xl">
              Every discount you authorize trains the market to wait for the next discount. Every "limited-time" promo gets ignored. Every rep on your floor needs a reason to push for the close <span className="font-bold text-[#FFD300]">today</span> — and most of them don't have one.
            </p>
            <div className="mt-8 inline-flex items-center gap-3 border border-white/20 bg-white/5 px-5 py-3 text-sm">
              <span className="h-2 w-2 bg-[#FFD300]"></span>
              <span className="text-white/80">There is a better weapon. Keep reading.</span>
            </div>
          </div>

          <div className="lg:col-span-7">
            <ul className="space-y-px bg-white/10">
              {PROBLEM_POINTS.map((p, i) => (
                <li key={p.title} className="bg-[#0A0A0A] p-7 lg:p-9 group hover:bg-[#171717] transition-colors">
                  <div className="flex items-start gap-6">
                    <div className="font-display font-bold text-5xl lg:text-6xl text-[#FFD300] tabular-num leading-none w-20 shrink-0">
                      {String(i + 1).padStart(2, "0")}
                    </div>
                    <div>
                      <h3 className="font-display font-bold text-2xl lg:text-3xl">{p.title}</h3>
                      <p className="mt-3 text-base text-white/70 leading-relaxed">{p.body}</p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
