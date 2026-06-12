import { Quote } from "lucide-react";
import { BUSINESS_TESTIMONIALS } from "@/data/content";
import SectionLabel from "@/components/site/SectionLabel";

export default function BusinessTestimonials() {
  return (
    <section data-testid="business-testimonials" className="bg-white py-24 lg:py-32">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
        <div className="max-w-3xl">
          <SectionLabel>Business Owners Love the Results</SectionLabel>
          <h2 className="font-display mt-6 text-5xl lg:text-7xl font-bold leading-[0.95] text-black">
            What sales leaders said <br/>
            <span className="under-yellow">after they deployed it.</span>
          </h2>
        </div>

        <div className="mt-14 grid grid-cols-1 md:grid-cols-2 gap-5">
          {BUSINESS_TESTIMONIALS.map((t, i) => (
            <article key={i} className={`p-10 ${i % 2 === 0 ? "bg-[#F5F2EA]" : "bg-[#0A0A0A] text-white"}`}>
              <Quote className={`h-8 w-8 ${i % 2 === 0 ? "text-black" : "text-[#FFD300]"}`} />
              <p className={`mt-6 font-display text-2xl lg:text-3xl font-bold leading-[1.15] ${i % 2 === 0 ? "text-black" : "text-white"}`}>
                "{t.quote}"
              </p>
              <div className={`mt-8 pt-6 border-t ${i % 2 === 0 ? "border-black/15" : "border-white/15"} flex items-center justify-between`}>
                <div>
                  <div className={`font-bold text-sm ${i % 2 === 0 ? "text-black" : "text-white"}`}>{t.author}</div>
                  <div className={`text-[10px] font-mono uppercase tracking-widest mt-1 ${i % 2 === 0 ? "text-black/50" : "text-white/50"}`}>{t.role}</div>
                </div>
                <div className="text-right">
                  <div className={`text-[10px] font-mono uppercase tracking-widest ${i % 2 === 0 ? "text-black/50" : "text-[#FFD300]"}`}>Result</div>
                  <div className={`font-display font-bold text-base mt-1 ${i % 2 === 0 ? "text-black" : "text-[#FFD300]"}`}>{t.metric}</div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
