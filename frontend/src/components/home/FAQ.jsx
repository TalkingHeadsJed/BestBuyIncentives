import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { FAQS } from "@/data/content";
import SectionLabel from "@/components/site/SectionLabel";

export default function FAQ() {
  return (
    <section data-testid="faq-section" className="py-24 lg:py-32 border-b border-white/10">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-4">
            <SectionLabel>Questions sales leaders ask</SectionLabel>
            <h2 className="font-display mt-6 text-3xl lg:text-4xl font-bold leading-[1.05]">
              The answers <span className="text-emerald-400">before you ask.</span>
            </h2>
            <p className="mt-6 text-zinc-400">
              Don't see your question? Book a 30-minute call with a sales consultant.
            </p>
          </div>
          <div className="lg:col-span-8">
            <Accordion type="single" collapsible className="border border-white/10">
              {FAQS.map((f, i) => (
                <AccordionItem
                  key={i}
                  value={`item-${i}`}
                  data-testid={`faq-item-${i}`}
                  className="border-b border-white/10 last:border-b-0 px-6"
                >
                  <AccordionTrigger className="font-display text-lg text-white hover:no-underline hover:text-emerald-400 py-6">
                    {f.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-zinc-400 pb-6 text-base leading-relaxed">
                    {f.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </div>
    </section>
  );
}
