import { INDUSTRIES } from "@/data/content";
import { IMG } from "@/data/images";
import SectionLabel from "@/components/site/SectionLabel";

const INDUSTRY_IMAGES = [
  IMG.autoShowroom,
  IMG.jewelryShow,
  IMG.furnitureShow,
  IMG.homeImprov,
  IMG.ecommerce,
  IMG.travelClub,
  IMG.healthClub,
  IMG.employeeRewards,
  IMG.luxuryRetail,
  IMG.b2bSales,
];

export default function IndustriesGrid() {
  return (
    <section data-testid="industries-grid" className="bg-white py-20 lg:py-28">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
        <div className="max-w-3xl">
          <SectionLabel>For High-Ticket Teams</SectionLabel>
          <h2 className="font-display mt-6 text-5xl lg:text-7xl font-bold leading-[0.92] text-black">
            Built for verticals where <br />
            <span className="under-yellow">every deal matters.</span>
          </h2>
        </div>

        <div className="mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {INDUSTRIES.map((ind, i) => (
            <article
              key={ind.name}
              data-testid={`industry-${ind.name.toLowerCase().replace(/\s+/g, "-")}`}
              className="group relative overflow-hidden bg-black aspect-[4/5]"
            >
              <img
                src={INDUSTRY_IMAGES[i % INDUSTRY_IMAGES.length]}
                alt={ind.name}
                className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-black/20" />

              <div className="relative h-full flex flex-col justify-end p-6 text-white">
                <div className="text-[10px] font-mono uppercase tracking-widest text-[#FFD300] font-bold">Vertical</div>
                <h3 className="mt-2 font-display font-bold text-2xl lg:text-3xl leading-tight">
                  {ind.name}
                </h3>
                <p className="mt-3 text-sm text-white/80 leading-relaxed line-clamp-3">{ind.desc}</p>
                <div className="mt-5 pt-4 border-t border-white/20 flex items-center justify-between">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-white/60">Typical lift</span>
                  <span className="font-display font-bold text-[#FFD300] text-xl tabular-num">{ind.metric}</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
