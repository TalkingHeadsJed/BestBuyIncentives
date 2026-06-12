import { HOW_IT_WORKS } from "@/data/content";
import { IMG } from "@/data/images";
import SectionLabel from "@/components/site/SectionLabel";

const STEP_IMAGES = [IMG.whiteboard, IMG.salesfloor, IMG.closing, IMG.applause];

export default function HowItWorks() {
  return (
    <section data-testid="how-it-works" className="bg-[#F5F2EA] py-20 lg:py-28">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
        <div className="max-w-3xl">
          <SectionLabel>How It Works</SectionLabel>
          <h2 className="font-display mt-6 text-5xl lg:text-7xl font-bold leading-[0.92] text-black">
            Live in 10 days. <span className="under-yellow">Lift</span> in 60.
          </h2>
        </div>

        <div className="mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {HOW_IT_WORKS.map((step, i) => (
            <div key={step.n} className="bg-white flex flex-col h-full overflow-hidden">
              <div className="relative aspect-[4/3] overflow-hidden">
                <img src={STEP_IMAGES[i]} alt={step.title} className="absolute inset-0 w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                <div className="absolute top-3 left-3 stamp">Step {step.n}</div>
                <div className="absolute bottom-3 left-3 font-display font-bold text-7xl text-white tabular-num leading-none">
                  {i + 1}
                </div>
              </div>
              <div className="p-7 flex-1 flex flex-col">
                <h3 className="font-display font-bold text-2xl lg:text-3xl leading-[1.05] text-black">{step.title}</h3>
                <p className="mt-3 text-base text-[#595959] leading-relaxed flex-1">{step.body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
