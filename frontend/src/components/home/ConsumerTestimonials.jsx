import { CONSUMER_TESTIMONIALS } from "@/data/content";
import SectionLabel from "@/components/site/SectionLabel";

export default function ConsumerTestimonials() {
  return (
    <section data-testid="consumer-testimonials" className="bg-white py-24 lg:py-32">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
        <div className="max-w-3xl">
          <SectionLabel>Customers Love the Experience</SectionLabel>
          <h2 className="font-display mt-6 text-5xl lg:text-7xl font-bold leading-[0.95] text-black">
            The moment your customer realizes <span className="under-yellow">this is real.</span>
          </h2>
          <p className="mt-6 text-lg text-[#595959] leading-relaxed">
            Real trips. Real memories. Real referrals back to your sales team.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-5">
          {CONSUMER_TESTIMONIALS.slice(0, 3).map((t, i) => (
            <article key={i} className="group overflow-hidden border border-[#E5E2D9]">
              <div className="relative aspect-[4/5] overflow-hidden">
                <img
                  src={t.image}
                  alt={t.location}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <div className="text-[10px] font-mono uppercase tracking-widest text-[#FFD300] font-bold">{t.location}</div>
                  <p className="mt-2 font-display text-lg lg:text-xl font-bold leading-snug">"{t.quote}"</p>
                  <div className="mt-3 text-[11px] font-mono uppercase tracking-widest text-white/80">— {t.author}</div>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-5">
          {CONSUMER_TESTIMONIALS.slice(3).map((t, i) => (
            <article key={i} className="grid grid-cols-12 gap-0 border border-[#E5E2D9] overflow-hidden">
              <div className="col-span-5 relative min-h-[200px]">
                <img src={t.image} alt={t.location} className="w-full h-full object-cover absolute inset-0" loading="lazy" />
              </div>
              <div className="col-span-7 p-7 bg-[#F5F2EA] flex flex-col justify-center">
                <div className="text-[10px] font-mono uppercase tracking-widest text-black/60 font-bold">{t.location}</div>
                <p className="mt-3 font-display text-xl font-bold leading-snug text-black">"{t.quote}"</p>
                <div className="mt-4 text-[11px] font-mono uppercase tracking-widest text-black/50">— {t.author}</div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
