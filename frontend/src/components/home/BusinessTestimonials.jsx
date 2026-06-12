import { Quote } from "lucide-react";
import { BUSINESS_TESTIMONIALS } from "@/data/content";
import { IMG } from "@/data/images";
import SectionLabel from "@/components/site/SectionLabel";

const AVATARS = [IMG.ownerMan1, IMG.ownerMan2, IMG.ownerWoman1, IMG.ownerMan3];

export default function BusinessTestimonials() {
  return (
    <section data-testid="business-testimonials" className="bg-white py-20 lg:py-28">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
        <div className="max-w-3xl">
          <SectionLabel>Business Owners Love the Results</SectionLabel>
          <h2 className="font-display mt-6 text-5xl lg:text-7xl font-bold leading-[0.92] text-black">
            What sales leaders said <span className="under-yellow">after they deployed it.</span>
          </h2>
        </div>

        <div className="mt-14 grid grid-cols-1 md:grid-cols-2 gap-5">
          {BUSINESS_TESTIMONIALS.map((t, i) => (
            <article key={i} className="grid grid-cols-12 gap-0 border border-[#E5E2D9] overflow-hidden bg-white">
              {/* Photo column */}
              <div className="col-span-5 relative min-h-[280px]">
                <img src={AVATARS[i % AVATARS.length]} alt={t.author} className="absolute inset-0 w-full h-full object-cover" />
                <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black to-transparent p-4">
                  <div className="text-white font-bold text-sm">{t.author}</div>
                  <div className="text-[10px] font-mono uppercase tracking-widest text-[#FFD300] mt-1">{t.role}</div>
                </div>
              </div>
              {/* Quote column */}
              <div className="col-span-7 p-7 lg:p-8 flex flex-col justify-between">
                <div>
                  <Quote className="h-7 w-7 text-[#FFD300] fill-[#FFD300]" />
                  <p className="mt-4 font-display text-xl lg:text-2xl font-bold leading-[1.15] text-black">
                    "{t.quote}"
                  </p>
                </div>
                <div className="mt-6 pt-5 border-t border-[#E5E2D9]">
                  <div className="text-[10px] font-mono uppercase tracking-widest text-black/50 font-bold">Result</div>
                  <div className="font-display font-bold text-2xl text-black mt-1">{t.metric}</div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
