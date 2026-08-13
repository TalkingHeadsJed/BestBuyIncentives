import Seo, { productSchema } from "@/components/site/Seo";
import SectionLabel from "@/components/site/SectionLabel";
import { PROGRAMS } from "@/data/content";
import { IMG } from "@/data/images";
import { Link } from "react-router-dom";
import { ArrowRight, Check } from "lucide-react";

export default function Programs() {
  return (
    <div data-testid="page-programs">
      <Seo
        title="Sales Incentives & Travel Reward Programs"
        description="Enjoy a Great Escape — our flagship travel-incentive certificate for high-ticket sales teams. Book a call to explore our full catalog of travel and entertainment incentives."
        path="/programs"
        schema={PROGRAMS.map((p) =>
          productSchema({ name: p.name, description: p.description, image: p.image, slug: p.slug })
        )}
      />
      <section className="relative bg-[#0A0A0A] text-white overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-35">
          <img src={IMG.trainingRoom} alt="" className="w-full h-full object-cover kenburn" />
          <div className="absolute inset-0 bg-gradient-to-br from-black via-black/60 to-black/95" />
        </div>
        <div className="relative z-10 mx-auto max-w-[1400px] px-6 lg:px-10 pt-40 pb-24 lg:pb-32">
          <SectionLabel dark>Sales Incentives</SectionLabel>
          <h1 className="font-display mt-6 text-5xl sm:text-6xl lg:text-8xl font-bold leading-[0.92]">
            Pick the <span className="hl-yellow-full text-black">closing weapon.</span>
          </h1>
          <p className="mt-8 text-lg lg:text-2xl max-w-3xl leading-[1.4] text-white/85">
            One proven certificate to put on your sales floor — sized to your ticket and priced for bulk deployment. Want more? Book a call for our full catalog of travel and entertainment incentives.
          </p>
        </div>
      </section>

      <section className="bg-white py-12 lg:py-20">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10 space-y-5">
          {PROGRAMS.map((p, i) => (
            <article
              key={p.slug}
              data-testid={`program-${p.slug}`}
              className="grid grid-cols-1 lg:grid-cols-12 gap-0 border border-[#E5E2D9]"
            >
              <div className={`lg:col-span-6 relative aspect-[16/10] bg-[#0a2b5e] overflow-hidden ${i % 2 ? "lg:order-2" : ""}`}>
                <img src={p.image} alt={p.name} className="w-full h-full object-cover" loading="lazy" />
              </div>
              <div className={`lg:col-span-6 p-8 lg:p-12 bg-white ${i % 2 ? "lg:order-1" : ""} flex flex-col justify-center`}>
                <div className="inline-block stamp self-start">{p.badge}</div>
                <div className="mt-5 text-[11px] font-mono uppercase tracking-widest text-black/50 font-bold">{p.tagline}</div>
                <h2 className="mt-2 font-display font-bold text-4xl lg:text-6xl leading-[0.95] text-black">{p.name}</h2>
                <p className="mt-5 text-base lg:text-lg text-[#404040] leading-relaxed">{p.description}</p>
                <ul className="mt-6 space-y-2.5">
                  {p.bullets.map((b) => (
                    <li key={b} className="flex items-start gap-3 text-base text-black">
                      <span className="mt-1 inline-flex h-5 w-5 items-center justify-center bg-[#FFD300] shrink-0">
                        <Check className="h-3 w-3 text-black" strokeWidth={3} />
                      </span>
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  to="/contact"
                  data-testid={`program-cta-${p.slug}`}
                  className="mt-8 inline-flex items-center gap-2 bg-[#FFD300] hover:bg-[#FFEA66] text-black font-bold text-sm px-6 py-4 uppercase tracking-wide w-fit"
                >
                  Get Pricing <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-[#F7F5EF] py-16 lg:py-24" data-testid="featured-incentives">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
          <div className="text-[11px] font-mono uppercase tracking-widest text-black/50 font-bold">Featured Travel Rewards</div>
          <h2 className="mt-3 font-display font-bold text-4xl lg:text-6xl leading-[0.95] text-black">The incentives your buyers <span className="hl-yellow-full text-black">actually want.</span></h2>
          <p className="mt-5 text-base lg:text-lg text-[#404040] leading-relaxed max-w-3xl">Curated travel rewards designed to motivate buyers and close high-ticket deals. Explore a few of the escapes we deploy for sales teams.</p>
          <div className="mt-10 space-y-5">
            {[
              { slug: "caribbean-cruise", img: "/images/incentives/caribbean-cruise.png", name: "Caribbean Cruise for Two", tagline: "Set Sail for Paradise", body: "Enjoy a 7-night cruise for two to the Caribbean. Experience stunning beaches, vibrant culture, and delicious cuisine. This all-inclusive getaway will leave you refreshed and rejuvenated.", bullets: ["7-night cruise for two", "Stunning Caribbean beaches", "Vibrant culture & cuisine", "All-inclusive getaway"] },
              { slug: "worldwide-luxury-resort", img: "/images/incentives/worldwide-luxury-resort.png", name: "Worldwide Luxury Resort Stay", tagline: "Indulge in Unforgettable Destinations", body: "Experience the pinnacle of luxury with a 5-night stay at a world-class resort of your choice. From pristine beaches to breathtaking landscapes, discover the ultimate in relaxation and bespoke service.", bullets: ["5-night world-class resort stay", "Resort of your choice", "Pristine beaches & landscapes", "Bespoke service & relaxation"] },
              { slug: "alaska-cruise", img: "/images/incentives/alaska-cruise.png", name: "Alaska Cruise", tagline: "Witness the Majesty of the Last Frontier", body: "Embark on an unforgettable 7-night Alaskan cruise. Marvel at majestic glaciers, abundant wildlife, and rugged wilderness from the comfort of your ship. An adventure of a lifetime awaits.", bullets: ["7-night Alaskan cruise", "Majestic glaciers up close", "Abundant wildlife", "Rugged wilderness views"] },
              { slug: "elite-escape", img: "/images/incentives/elite-escape.png", name: "Elite Escape", tagline: "Exclusive Experiences for the Discerning Traveler", body: "Tailored for those who seek the extraordinary. This exclusive escape offers personalized itineraries, private tours, and luxurious accommodations in unique and sought-after destinations.", bullets: ["Personalized itineraries", "Private guided tours", "Luxurious accommodations", "Unique, sought-after destinations"] },
              { slug: "paradise-escape", img: "/images/incentives/paradise-escape.png", name: "Enjoy a Paradise Escape", tagline: "Cruise or Luxury Stay — Your Choice", body: "Give your winners the ultimate flexibility: choose a 7-night Caribbean or Alaska cruise for two, or a premier 8-day, 7-night luxury accommodation for four anywhere in the world.", bullets: ["7-night Caribbean or Alaska cruise for 2", "Premier 8-day, 7-night luxury stay for 4", "Worldwide destination choice", "The flexibility your buyers value"] },
            ].map((o, i) => (
              <article key={o.slug} data-testid={`incentive-${o.slug}`} className="grid grid-cols-1 lg:grid-cols-12 gap-0 border border-[#E5E2D9] bg-white">
                <div className={`lg:col-span-6 relative aspect-[16/10] bg-[#0a2b5e] overflow-hidden ${i % 2 ? "lg:order-2" : ""}`}>
                  <img src={o.img} alt={o.name} className="w-full h-full object-cover" loading="lazy" />
                </div>
                <div className={`lg:col-span-6 p-8 lg:p-12 bg-white ${i % 2 ? "lg:order-1" : ""} flex flex-col justify-center`}>
                  <div className="inline-block stamp self-start">Travel Reward</div>
                  <div className="mt-5 text-[11px] font-mono uppercase tracking-widest text-black/50 font-bold">{o.tagline}</div>
                  <h3 className="mt-2 font-display font-bold text-4xl lg:text-6xl leading-[0.95] text-black">{o.name}</h3>
                  <p className="mt-5 text-base lg:text-lg text-[#404040] leading-relaxed">{o.body}</p>
                  <ul className="mt-6 space-y-2.5">
                    {o.bullets.map((b) => (
                      <li key={b} className="flex items-start gap-3 text-base text-black">
                        <span className="mt-1 inline-flex h-5 w-5 items-center justify-center bg-[#FFD300] shrink-0">
                          <Check className="h-3 w-3 text-black" strokeWidth={3} />
                        </span>
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                  <Link to="/contact" data-testid={`incentive-cta-${o.slug}`} className="mt-8 inline-flex items-center gap-2 bg-[#FFD300] hover:bg-[#FFEA66] text-black font-bold text-sm px-6 py-4 uppercase tracking-wide w-fit">
                    Get Pricing <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#0A0A0A] text-white py-24">
        <div className="mx-auto max-w-5xl px-6 lg:px-10 text-center">
          <div className="text-[11px] font-mono uppercase tracking-widest text-[#FFD300] font-bold">Custom Programs</div>
          <h2 className="font-display mt-4 text-4xl lg:text-6xl font-bold leading-[0.95]">
            Or build something <span className="hl-yellow-full text-black">only your team has.</span>
          </h2>
          <p className="mt-6 text-lg lg:text-xl text-white/80 max-w-2xl mx-auto">
            Co-branded certificates. Custom destinations. Programs sized to a specific deal range, a specific season, or a specific objection your team is fighting.
          </p>
          <Link
            to="/contact"
            data-testid="programs-custom-cta"
            className="mt-10 inline-flex items-center gap-3 bg-[#FFD300] hover:bg-[#FFEA66] text-black font-bold text-lg px-8 py-5 uppercase tracking-wide"
          >
            Design a Custom Program <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </section>
    </div>
  );
}
