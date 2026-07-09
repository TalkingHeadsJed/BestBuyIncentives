import { Link } from "react-router-dom";
import { ArrowRight, Check } from "lucide-react";
import { IMG } from "@/data/images";
import SectionLabel from "@/components/site/SectionLabel";

export default function SolutionSection() {
  const benefits = [
    "Higher close rates without cutting your price",
    "Reps get a stall-breaker they can use in any close",
    "Buyer's remorse cancellations drop by 60%+",
    "Average ticket goes UP — not down",
    "Showroom traffic peaks within 7 days",
    "Your competitors can't copy it on a price ladder",
  ];

  return (
    <section data-testid="solution-section" className="bg-white py-20 lg:py-32">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          {/* HUGE photo dominates */}
          <div className="lg:col-span-7 order-2 lg:order-1">
            <div className="relative">
              <div className="absolute -bottom-4 -right-4 lg:-bottom-6 lg:-right-6 w-full h-full bg-[#FFD300] -z-0" />
              <img
                src="/images/closing-saleswoman.png"
                alt="Sales professional closing a deal"
                className="relative w-full aspect-[5/4] object-cover"
              />
              <div className="absolute -bottom-8 left-6 lg:-bottom-12 lg:left-12 max-w-sm bg-black text-white p-7 lg:p-8 shadow-2xl border-t-4 border-[#FFD300]">
                <div className="font-mono text-[10px] uppercase tracking-widest text-[#FFD300] font-bold">In the close</div>
                <p className="mt-2 font-display text-xl lg:text-2xl leading-snug font-bold">
                  "I love to give my clients a reason to say yes."
                </p>
                <div className="mt-4 pt-4 border-t border-white/20 text-xs font-mono uppercase tracking-widest text-white/70">
                  → 22% of stalls close same-day
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 order-1 lg:order-2">
            <SectionLabel>The Weapon</SectionLabel>
            <h2 className="font-display mt-6 text-5xl lg:text-6xl xl:text-7xl font-bold leading-[0.92] text-black">
              A closing tool <span className="under-yellow">competitors</span> can't match.
            </h2>
            <p className="mt-7 text-lg text-[#404040] leading-relaxed">
              Premium travel incentive certificates deployed across your sales floor. Used as a stall-breaker. Used as a remorse killer. Used as the closing weapon nobody else on your block carries.
            </p>

            <ul className="mt-8 space-y-3">
              {benefits.map((b) => (
                <li key={b} className="flex items-start gap-3 text-base lg:text-lg text-black">
                  <span className="mt-1 inline-flex h-6 w-6 items-center justify-center bg-[#FFD300] shrink-0">
                    <Check className="h-3.5 w-3.5 text-black" strokeWidth={3} />
                  </span>
                  <span>{b}</span>
                </li>
              ))}
            </ul>

            <Link
              to="/programs"
              data-testid="solution-cta"
              className="mt-10 inline-flex items-center gap-3 bg-black hover:bg-[#171717] text-white font-bold text-base px-7 py-5 uppercase tracking-wide"
            >
              See the Programs <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
