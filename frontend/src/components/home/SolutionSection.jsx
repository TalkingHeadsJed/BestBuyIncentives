import { Link } from "react-router-dom";
import { ArrowRight, Check } from "lucide-react";
import SectionLabel from "@/components/site/SectionLabel";

export default function SolutionSection() {
  const benefits = [
    "Higher close rates without cutting price",
    "Differentiate from every competitor in your zip code",
    "Reduce buyer's remorse on high-ticket sales",
    "Drive net-new showroom traffic on demand",
    "Give your reps a tangible reason to close today",
    "Protect gross margin while customers feel they 'won'",
  ];
  return (
    <section data-testid="solution-section" className="py-24 lg:py-32 border-b border-white/10 relative overflow-hidden">
      <div className="absolute -left-32 top-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-emerald-500/10 blur-[140px] rounded-full pointer-events-none" />
      <div className="mx-auto max-w-7xl px-6 lg:px-8 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-6 order-2 lg:order-1">
            <div className="relative">
              <div className="aspect-[4/5] bg-[#111827] border border-white/10 overflow-hidden">
                <img
                  src="/images/cert-be-our-guest-outside.jpg"
                  alt="Premium vacation certificate"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 hidden md:block p-5 bg-[#0A0F17] border border-emerald-500/40 max-w-xs shadow-[0_20px_60px_-20px_rgba(16,185,129,0.4)]">
                <div className="text-[10px] font-mono uppercase tracking-widest text-emerald-400">In the close</div>
                <p className="mt-1 text-sm text-zinc-200 leading-relaxed">
                  "We can include the getaway if we sign by close of business."
                </p>
                <div className="mt-2 text-[11px] font-mono uppercase tracking-widest text-zinc-500">
                  → 22% stall-to-close
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 order-1 lg:order-2">
            <SectionLabel>The Weapon</SectionLabel>
            <h2 className="font-display mt-6 text-4xl lg:text-5xl font-bold leading-[1.05]">
              A closing tool with no <span className="text-emerald-400">comparable equivalent</span> in the market.
            </h2>
            <p className="mt-6 text-zinc-300 text-lg leading-relaxed">
              Premium travel incentive certificates deployed in bulk to your sales team. Used as a stall-breaker, a remorse-killer, and a differentiator. The customer feels rewarded. Your margin stays intact.
            </p>

            <ul className="mt-8 space-y-3">
              {benefits.map((b) => (
                <li key={b} className="flex items-start gap-3">
                  <span className="mt-1 inline-flex h-5 w-5 items-center justify-center bg-emerald-500/15 text-emerald-400 shrink-0">
                    <Check className="h-3 w-3" strokeWidth={3} />
                  </span>
                  <span className="text-zinc-200">{b}</span>
                </li>
              ))}
            </ul>

            <Link
              to="/programs"
              data-testid="solution-cta"
              className="mt-10 inline-flex items-center gap-3 bg-emerald-500 hover:bg-emerald-400 text-[#0A0F17] font-semibold text-base px-6 py-4"
            >
              Explore the Programs
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
