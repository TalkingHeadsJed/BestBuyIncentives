import { IMG } from "@/data/images";
import SectionLabel from "@/components/site/SectionLabel";

export default function ProblemSection() {
  return (
    <section data-testid="problem-section" className="bg-white">
      {/* Massive full-bleed photo with overlay text */}
      <div className="relative w-full">
        <div className="relative h-[55vh] min-h-[450px] lg:h-[600px] overflow-hidden">
          <img src={IMG.heroAudience} alt="Sales team" className="absolute inset-0 w-full h-full object-cover kenburn" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/55 to-transparent" />

          <div className="relative z-10 h-full mx-auto max-w-[1400px] px-6 lg:px-10 flex items-center">
            <div className="max-w-2xl">
              <SectionLabel dark>The Brutal Truth</SectionLabel>
              <h2 className="font-display mt-6 text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold leading-[0.9] text-white">
                Your team is <span className="hl-yellow-full text-black">losing on price.</span>
              </h2>
              <p className="mt-6 text-lg lg:text-2xl text-white/90 max-w-xl leading-[1.4]">
                Every discount trains the market to wait. Every "limited-time" promo gets ignored. Your reps need a reason to push for the close <span className="font-bold text-[#FFD300]">today</span>. Most of them don't have one.
              </p>
            </div>
          </div>

          <div className="absolute bottom-6 right-6 lg:bottom-10 lg:right-10 hidden md:block">
            <div className="stamp text-sm">↓ The fix is below ↓</div>
          </div>
        </div>
      </div>
    </section>
  );
}
