import { Link } from "react-router-dom";
import { ArrowRight, Check } from "lucide-react";
import { IMG } from "@/data/images";
import SectionLabel from "@/components/site/SectionLabel";

export default function SolutionSection() {
  const benefits = [
    "Higher close rates without cutting your price",
    "Reps get a stall-breaker they can use in any close",
    "Buyer's remorse cancellations drop by 60%+",
    "Average ticket goes UP, not down",
    "Showroom traffic peaks within 7 days of campaign launch",
    "Your competitors can't copy this — it's not on the price ladder",
  ];

  return (
    <section data-testid="solution-section" className="bg-white py-24 lg:py-32 relative">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          <div className="lg:col-span-6 order-2 lg:order-1">
            <div className="relative">
              <img
                src={IMG.closing}
                alt="Closing the deal"
                className="w-full aspect-[4/5] object-cover"
              />
              <div className="absolute -bottom-6 -right-6 lg:-right-12 max-w-xs bg-[#FFD300] p-7 shadow-2xl">
                <div className="font-mono text-[10px] uppercase tracking-widest text-black/70 font-bold">In the close</div>
                <p className="mt-2 font-display text-lg leading-snug text-black font-semibold">
                  "We can include the getaway if we sign by close of business."
                </p>
                <div className="mt-4 pt-4 border-t border-black/20 text-xs font-mono uppercase tracking-widest text-black/70">
                  → 22% of stalls close same-day
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 order-1 lg:order-2">
            <SectionLabel>The Weapon</SectionLabel>
            <h2 className="font-display mt-6 text-5xl lg:text-7xl font-bold leading-[0.95] text-black">
              Hand your reps a closing tool <span className="under-yellow">competitors</span> can't match.
            </h2>
            <p className="mt-7 text-lg lg:text-xl text-[#404040] leading-relaxed">
              Premium travel incentive certificates deployed across your sales floor. Used as a stall-breaker. Used as a remorse killer. Used as a closing weapon nobody else on your block carries.
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
              className="mt-10 inline-flex items-center gap-3 bg-[#0A0A0A] hover:bg-black text-white font-bold text-base px-7 py-5 uppercase tracking-wide"
            >
              See the Programs <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
