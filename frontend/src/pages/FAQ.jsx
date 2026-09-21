import Seo, { faqSchema, breadcrumbSchema, ORG_ID } from "@/components/site/Seo";
import SectionLabel from "@/components/site/SectionLabel";
import { FAQ_PAGE } from "@/data/content";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const SITE = "https://bestbuyincentives.com";

// Explainer videos moved here from the merged voucher-terms and recipient-costs pages.
const FAQ_VIDEOS = [
  { name: "Travel voucher terms businesses should review", description: "What a business should review about a discounted travel voucher before running a program.", id: "5iYb--d66AU", duration: "PT1M15S", uploadDate: "2026-08-11", watchUrl: "https://www.youtube.com/watch?v=5iYb--d66AU", embedUrl: "https://www.youtube-nocookie.com/embed/5iYb--d66AU", thumbnailUrl: "https://i.ytimg.com/vi/5iYb--d66AU/hqdefault.jpg" },
  { name: "How the recipient experience works", description: "How a customer redeems a discounted travel voucher and what the business handles.", id: "yywjxvTTcJE", duration: "PT56S", uploadDate: "2026-08-11", watchUrl: "https://www.youtube.com/watch?v=yywjxvTTcJE", embedUrl: "https://www.youtube-nocookie.com/embed/yywjxvTTcJE", thumbnailUrl: "https://i.ytimg.com/vi/yywjxvTTcJE/hqdefault.jpg" },
];

const videoObjectSchema = (v) => ({
  "@context": "https://schema.org", "@type": "VideoObject",
  name: v.name, description: v.description, thumbnailUrl: [v.thumbnailUrl],
  uploadDate: v.uploadDate, duration: v.duration, contentUrl: v.watchUrl, embedUrl: v.embedUrl,
  publisher: { "@id": ORG_ID }, inLanguage: "en-US",
});

export default function FAQ() {
  const categories = [...new Set(FAQ_PAGE.map((f) => f.category))];

  return (
    <div data-testid="faq-page">
      <Seo
        title="FAQ — Travel Incentive & Sales Program Questions Answered"
        description="Straight answers on how BestBuyIncentives travel-incentive certificate programs work — what they cost, whether they're legitimate, how customers redeem, how much they lift close rates, and how fast you launch."
        path="/faq"
        schema={[
          faqSchema(FAQ_PAGE),
          ...FAQ_VIDEOS.map(videoObjectSchema),
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
            Straight answers on how the programs work, what they cost, whether they're legit, and how fast you can put a closing tool on your sales floor.
          </p>
        </div>
      </section>

      {/* Q&A — grouped by category, answers fully visible so readers, search engines and AI can read them */}
      <section className="bg-white py-16 lg:py-24">
        <div className="mx-auto max-w-[900px] px-6 lg:px-10 space-y-16">
          <div data-testid="faq-videos">
            <h2 className="font-display text-3xl lg:text-4xl font-bold text-black">Watch: how the program works</h2>
            <div className="mt-2 h-1 w-16 bg-[#FFD300]" />
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
              {FAQ_VIDEOS.map((v) => (
                <figure key={v.id}>
                  <div className="relative w-full overflow-hidden border border-[#E5E2D9] bg-black" style={{ aspectRatio: "16 / 9" }}>
                    <iframe className="absolute inset-0 h-full w-full" src={`${v.embedUrl}?rel=0`} title={v.name} loading="lazy" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen />
                  </div>
                  <figcaption className="mt-2 text-[11px] font-mono uppercase tracking-widest text-[#595959] font-bold">{`Watch: ${v.name}`}</figcaption>
                </figure>
              ))}
            </div>
          </div>
          {categories.map((cat) => (
            <div key={cat} data-testid={`faq-category-${cat.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}>
              <h2 className="font-display text-3xl lg:text-4xl font-bold text-black">
                {cat}
              </h2>
              <div className="mt-2 h-1 w-16 bg-[#FFD300]" />
              <dl className="mt-8 divide-y divide-[#E5E2D9] border-y border-[#E5E2D9]">
                {FAQ_PAGE.filter((f) => f.category === cat).map((f, i) => (
                  <div key={i} data-testid={`faq-qa-${cat.toLowerCase().replace(/[^a-z0-9]+/g, "-")}-${i}`} className="py-7 lg:py-8">
                    <dt className="font-display text-xl lg:text-2xl font-bold text-black leading-tight">
                      {f.q}
                    </dt>
                    <dd className="mt-3 text-base lg:text-lg text-[#595959] leading-relaxed">{f.a}</dd>
                  </div>
                ))}
              </dl>
            </div>
          ))}
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
