import { Quote } from "lucide-react";
import { BUSINESS_TESTIMONIALS } from "@/data/content";
import SectionLabel from "@/components/site/SectionLabel";

export default function BusinessTestimonials() {
  return (
    <section data-testid="business-testimonials" className="py-24 lg:py-32 border-b border-white/10">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="max-w-3xl">
          <SectionLabel>Business Owners Love the Results</SectionLabel>
          <h2 className="font-display mt-6 text-4xl lg:text-5xl font-bold leading-[1.05]">
            What sales leaders say after <span className="text-emerald-400">they deployed it.</span>
          </h2>
        </div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-px bg-white/10 border border-white/10">
          {BUSINESS_TESTIMONIALS.map((t, i) => (
            <div key={i} className="bg-[#0A0F17] p-10 hover:bg-[#111827] transition-colors">
              <Quote className="h-7 w-7 text-emerald-400" />
              <p className="mt-6 text-lg lg:text-xl font-display font-medium leading-snug text-white">
                "{t.quote}"
              </p>
              <div className="mt-8 pt-6 border-t border-white/10 flex items-center justify-between">
                <div>
                  <div className="font-semibold text-sm text-white">{t.author}</div>
                  <div className="text-[11px] font-mono uppercase tracking-widest text-zinc-500 mt-1">{t.role}</div>
                </div>
                <div className="text-right">
                  <div className="text-[10px] font-mono uppercase tracking-widest text-emerald-400">Result</div>
                  <div className="font-display font-semibold text-emerald-400 text-base mt-1">{t.metric}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
