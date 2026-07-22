import Seo, { faqSchema, breadcrumbSchema } from "@/components/site/Seo";
import SectionLabel from "@/components/site/SectionLabel";
import { FAQS } from "@/data/content";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

export default function FAQ() {
  return (
    <div data-testid="faq-page">
      <Seo
        title="FAQ — Sales Incentive Program Questions Answered"
        description="Answers to the most common questions about BestBuyIncentives travel-incentive certificate programs — how they work, what they cost, how fast you launch, and the customer experience."
        path="/faq"
        schema={[
          faqSchema(FAQS),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "FAQ", path: "/faq" },
          ]),
        ]}
      />

      {/* Header */}
      <section className="bg-[#0A0A0A] text-white pt-36 pb-20 lg:pt-40 lg:pb-24">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
          <SectionLabel dark>Frequently asked questions</SectionLabel>
          <h1 className="font-display mt-6 text-5xl lg:text-7xl font-bold leading-[0.9] max-w-4xl">
            Everything sales leaders <span className="hl-yellow-full text-black">ask us.</span>
          </h1>
          <p className="mt-6 text-lg text-white/70 max-w-2xl leading-relaxed">
            Straight answers on how the programs work, what they cost, and how fast you can put a closing tool on your sales floor.
          </p>
        </div>
      </section>

      {/* Q&A — answers rendered fully visible so readers, search engines and AI can read them */}
      <section className="bg-white py-20 lg:py-28">
        <div className="mx-auto max-w-[900px] px-6 lg:px-10">
          <dl className="divide-y divide-[#E5E2D9] border-y border-[#E5E2D9]">
            {FAQS.map((f, i) => (
              <div key={i} data-testid={`faq-qa-${i}`} className="py-8 lg:py-10">
                <dt className="font-display text-2xl lg:text-3xl font-bold text-black leading-tight">
                  {f.q}
                </dt>
                <dd className="mt-4 text-lg text-[#595959] leading-relaxed">{f.a}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#FFD300] py-16 lg:py-20">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <h2 className="font-display text-3xl lg:text-4xl font-bold text-black leading-tight max-w-2xl">
            Still have a question? Get a straight answer in 30 minutes.
          </h2>
          <Link
            to="/contact"
            data-testid="faq-cta"
            className="inline-flex items-center gap-3 bg-black hover:bg-[#171717] text-white font-bold text-lg px-8 py-5 uppercase tracking-wide whitespace-nowrap"
          >
            Book a Strategy Call <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </section>
    </div>
  );
}
