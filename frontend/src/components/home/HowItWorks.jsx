import { HOW_IT_WORKS } from "@/data/content";
import { IMG } from "@/data/images";
import SectionLabel from "@/components/site/SectionLabel";

export default function HowItWorks() {
  return (
    <section data-testid="how-it-works" className="bg-[#F5F2EA] py-24 lg:py-32">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
        <div className="max-w-3xl">
          <SectionLabel>How It Works</SectionLabel>
          <h2 className="font-display mt-6 text-5xl lg:text-7xl font-bold leading-[0.95] text-black">
            Live in 10 days. <span className="under-yellow">Lift</span> in 60.
          </h2>
        </div>

        <div className="mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {HOW_IT_WORKS.map((step, i) => (
            <div key={step.n} className="bg-white p-8 border border-[#E5E2D9] flex flex-col h-full">
              <div className="font-mono text-xs uppercase tracking-[0.25em] text-black/50 font-bold">Step {step.n}</div>
              <h3 className="mt-5 font-display font-bold text-2xl lg:text-3xl leading-[1.05] text-black">
                {step.title}
              </h3>
              <p className="mt-4 text-base text-[#595959] leading-relaxed flex-1">{step.body}</p>
              <div className="mt-8 font-display font-bold text-7xl text-black/[0.06] tabular-num leading-none self-end">{i + 1}</div>
            </div>
          ))}
        </div>

        {/* Testimonial pull */}
        <div className="mt-16 grid grid-cols-1 lg:grid-cols-12 gap-0">
          <div className="lg:col-span-6 relative min-h-[260px] lg:min-h-[320px]">
            <img src={IMG.applause} alt="Sales team celebration" className="absolute inset-0 w-full h-full object-cover" />
          </div>
          <div className="lg:col-span-6 bg-black text-white p-8 lg:p-12 flex flex-col justify-center">
            <div className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#FFD300] font-bold">
              Furniture vertical · 8-store chain
            </div>
            <p className="mt-4 font-display text-2xl lg:text-3xl font-bold leading-[1.15]">
              "Hundreds of certificates distributed. Showroom hadn't been that busy in five years."
            </p>
            <div className="mt-6 grid grid-cols-2 gap-6">
              <div>
                <div className="font-display font-bold text-4xl text-[#FFD300] tabular-num">+58%</div>
                <div className="mt-1 text-[10px] font-mono uppercase tracking-widest text-white/60">Showroom traffic</div>
              </div>
              <div>
                <div className="font-display font-bold text-4xl text-[#FFD300] tabular-num">5.2x</div>
                <div className="mt-1 text-[10px] font-mono uppercase tracking-widest text-white/60">ROI vs. discount</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
