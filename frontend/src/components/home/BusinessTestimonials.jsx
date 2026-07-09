import { Quote } from "lucide-react";
import { BUSINESS_TESTIMONIALS } from "@/data/content";
import SectionLabel from "@/components/site/SectionLabel";

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
            <article
              key={i}
              data-testid={`business-testimonial-${i}`}
              className="relative flex flex-col justify-between border border-[#E5E2D9] bg-[#F5F2EA] p-8 lg:p-10 transition-colors duration-300 hover:bg-white"
            >
              <div>
                <Quote className="h-9 w-9 text-[#FFD300] fill-[#FFD300]" />
                <p className="mt-6 font-display text-2xl lg:text-3xl font-bold leading-[1.12] text-black">
                  "{t.quote}"
                </p>
              </div>

              <div className="mt-8 pt-6 border-t border-[#D8D4C7] flex items-end justify-between gap-4">
                <div>
                  <div className="font-display font-bold text-lg text-black">{t.author}</div>
                  <div className="text-[10px] font-mono uppercase tracking-widest text-black/50 mt-1">{t.role}</div>
                </div>
                <div className="text-right">
                  <div className="text-[10px] font-mono uppercase tracking-widest text-black/40 font-bold">Result</div>
                  <div className="font-display font-bold text-xl text-black mt-1">{t.metric}</div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
