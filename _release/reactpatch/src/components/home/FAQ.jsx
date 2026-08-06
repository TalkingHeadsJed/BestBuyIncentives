import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { FAQS } from "@/data/content";
import SectionLabel from "@/components/site/SectionLabel";

export default function FAQ() {
  return (
    <section data-testid="faq-section" className="bg-white py-24 lg:py-32">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-4">
            <SectionLabel>Questions sales leaders ask</SectionLabel>
            <h2 className="font-display mt-6 text-4xl lg:text-5xl font-bold leading-[0.95] text-black">
              The answers <span className="under-yellow">before you ask.</span>
            </h2>
            <p className="mt-6 text-base text-[#595959]">
              Don't see your question? Book a 30-minute call with a sales consultant.
            </p>
          </div>
          <div className="lg:col-span-8">
            <Accordion type="single" collapsible className="border border-[#E5E2D9]">
              {FAQS.map((f, i) => (
                <AccordionItem
                  key={i}
                  value={`item-${i}`}
                  data-testid={`faq-item-${i}`}
                  className="border-b border-[#E5E2D9] last:border-b-0 px-6"
                >
                  <AccordionTrigger className="font-display text-lg lg:text-xl font-bold text-black hover:no-underline hover:text-black py-6">
                    {f.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-[#595959] pb-6 text-base leading-relaxed">
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
