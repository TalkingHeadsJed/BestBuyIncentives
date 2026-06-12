import { HOW_IT_WORKS } from "@/data/content";
import SectionLabel from "@/components/site/SectionLabel";

export default function HowItWorks() {
  return (
    <section data-testid="how-it-works" className="py-24 lg:py-32 border-b border-white/10">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="max-w-3xl">
          <SectionLabel>How It Works</SectionLabel>
          <h2 className="font-display mt-6 text-4xl lg:text-5xl font-bold leading-[1.05]">
            Live in <span className="text-emerald-400">10 business days.</span> Measurable lift in 60.
          </h2>
        </div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-white/10 border border-white/10">
          {HOW_IT_WORKS.map((step) => (
            <div key={step.n} className="bg-[#0A0F17] p-8 hover:bg-[#111827] transition-colors">
              <div className="font-mono text-xs tracking-widest text-emerald-400">STEP {step.n}</div>
              <h3 className="mt-4 font-display font-semibold text-2xl leading-tight">{step.title}</h3>
              <p className="mt-3 text-sm text-zinc-400 leading-relaxed">{step.body}</p>
              <div className="mt-8 font-display text-5xl font-bold text-white/5 tabular-num">{step.n}</div>
            </div>
          ))}
        </div>

        <div className="mt-12 p-8 bg-gradient-to-r from-emerald-500/10 via-transparent to-transparent border border-emerald-500/30">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8">
              <div className="text-[11px] font-mono uppercase tracking-widest text-emerald-400">
                Field-tested testimonial · furniture vertical
              </div>
              <p className="mt-2 text-xl lg:text-2xl font-display leading-snug">
                "Hundreds of certificates distributed. The phones rang off the hook. Our showroom hadn't been that busy in five years."
              </p>
              <div className="mt-3 text-[11px] font-mono uppercase tracking-widest text-zinc-500">
                General Manager · regional furniture retailer
              </div>
            </div>
            <div className="lg:col-span-4 grid grid-cols-2 gap-4">
              <div>
                <div className="font-display font-bold text-4xl text-emerald-400 tabular-num">+58%</div>
                <div className="mt-1 text-[10px] font-mono uppercase tracking-widest text-zinc-400">Showroom traffic</div>
              </div>
              <div>
                <div className="font-display font-bold text-4xl text-emerald-400 tabular-num">5.2x</div>
                <div className="mt-1 text-[10px] font-mono uppercase tracking-widest text-zinc-400">ROI vs. discount</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
