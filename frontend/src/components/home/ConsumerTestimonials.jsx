import { CONSUMER_TESTIMONIALS } from "@/data/content";
import SectionLabel from "@/components/site/SectionLabel";

export default function ConsumerTestimonials() {
  return (
    <section data-testid="consumer-testimonials" className="py-24 lg:py-32 border-b border-white/10">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="max-w-3xl">
          <SectionLabel>Customers Love the Experience</SectionLabel>
          <h2 className="font-display mt-6 text-4xl lg:text-5xl font-bold leading-[1.05]">
            The moment your customer realizes <span className="text-emerald-400">this is real.</span>
          </h2>
          <p className="mt-6 text-zinc-400 text-lg leading-relaxed">
            Real trips. Real memories. Real referrals back to your sales team.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-px bg-white/10 border border-white/10">
          {CONSUMER_TESTIMONIALS.slice(0, 3).map((t, i) => (
            <article key={i} className="bg-[#0A0F17] group overflow-hidden">
              <div className="relative aspect-[4/5] overflow-hidden">
                <img
                  src={t.image}
                  alt={t.location}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0F17] via-[#0A0F17]/40 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <div className="text-[10px] font-mono uppercase tracking-widest text-emerald-400">{t.location}</div>
                  <p className="mt-2 text-base font-display leading-snug text-white">"{t.quote}"</p>
                  <div className="mt-3 text-[11px] font-mono uppercase tracking-widest text-zinc-300">— {t.author}</div>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-px bg-white/10 border border-white/10">
          {CONSUMER_TESTIMONIALS.slice(3).map((t, i) => (
            <article key={i} className="bg-[#0A0F17] grid grid-cols-12 gap-0 overflow-hidden">
              <div className="col-span-5 relative">
                <img src={t.image} alt={t.location} className="w-full h-full object-cover absolute inset-0" loading="lazy" />
              </div>
              <div className="col-span-7 p-8">
                <div className="text-[10px] font-mono uppercase tracking-widest text-emerald-400">{t.location}</div>
                <p className="mt-3 text-lg font-display leading-snug">"{t.quote}"</p>
                <div className="mt-4 text-[11px] font-mono uppercase tracking-widest text-zinc-500">— {t.author}</div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
