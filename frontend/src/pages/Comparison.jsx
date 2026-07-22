import Seo, { faqSchema, breadcrumbSchema } from "@/components/site/Seo";
import SectionLabel from "@/components/site/SectionLabel";
import { Link } from "react-router-dom";
import { ArrowRight, Check, X } from "lucide-react";

const ROWS = [
  {
    dim: "Effect on gross margin",
    discount: "Comes straight off profit — a 10% cut on a 30%-margin product erases about a third of that deal's profit.",
    incentive: "Costs a small fraction of the deal it closes. Your price — and your margin — stay intact.",
  },
  {
    dim: "Close rate",
    discount: "Buyers still hesitate, and price cuts quickly become expected on every deal.",
    incentive: "Gives the buyer a compelling reason to act now — teams report an average close-rate lift of about 37%.",
  },
  {
    dim: "Perceived value vs. your cost",
    discount: "1:1 — a $200 price cut costs you the full $200.",
    incentive: "Roughly 10:1 — the vacation's perceived value far exceeds what it costs you.",
  },
  {
    dim: "Word of mouth & referrals",
    discount: "Nobody tells their friends about a discount.",
    incentive: "Guests post about and talk up their vacation — free exposure that drives new business.",
  },
  {
    dim: "Brand positioning",
    discount: "Trains your market to wait for the next sale and compete on price.",
    incentive: "Positions you on experience and value — impossible to compare on a spreadsheet.",
  },
  {
    dim: "Repeat & loyalty",
    discount: "Erodes price integrity and conditions one-time bargain hunters.",
    incentive: "A memorable reward builds loyalty and brings customers back.",
  },
  {
    dim: "Who handles fulfillment",
    discount: "Not applicable.",
    incentive: "A dedicated travel support team handles every booking — your team does nothing.",
  },
];

const FAQS = [
  {
    q: "Is it better to offer a discount or a travel incentive?",
    a: "A travel incentive almost always wins. Discounting comes directly off your margin and trains buyers to wait for the next price cut, while a travel incentive adds high perceived value on top of your offer, so you hold your price and still give the customer a reason to say yes now.",
  },
  {
    q: "Why do travel incentives close more deals than discounts?",
    a: "Because a vacation carries a perceived value many times its cost and creates an emotional reason to buy today, whereas a discount is simply expected and negotiated. Teams using travel incentives report an average close-rate lift of about 37%.",
  },
  {
    q: "Does giving a vacation incentive hurt my margin?",
    a: "No. The certificate costs a small fraction of the deal it helps close, so your price and margin stay intact — unlike a discount, which removes profit dollar for dollar.",
  },
];

export default function Comparison() {
  return (
    <div data-testid="comparison-page">
      <Seo
        title="Travel Incentives vs. Discounting: Which Closes More Deals?"
        description="A head-to-head comparison of travel-incentive certificates versus discounting for high-ticket sales teams — margin impact, close rate, perceived value, referrals, and brand positioning."
        path="/travel-incentives-vs-discounting"
        schema={[
          faqSchema(FAQS),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Travel Incentives vs. Discounting", path: "/travel-incentives-vs-discounting" },
          ]),
        ]}
      />

      {/* Header */}
      <section className="bg-[#0A0A0A] text-white pt-36 pb-20 lg:pt-40 lg:pb-24">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
          <SectionLabel dark>Head to head</SectionLabel>
          <h1 className="font-display mt-6 text-5xl lg:text-7xl font-bold leading-[0.9] max-w-4xl">
            Travel incentives vs. <span className="hl-yellow-full text-black">discounting.</span>
          </h1>
          <p className="mt-6 text-lg text-white/70 max-w-2xl leading-relaxed">
            When you cut price to win a deal, the profit comes straight out of your pocket. Here's exactly how a travel incentive beats a discount on every dimension that matters to a high-ticket sales team.
          </p>
        </div>
      </section>

      {/* Comparison table */}
      <section className="bg-white py-16 lg:py-24">
        <div className="mx-auto max-w-[1100px] px-6 lg:px-10">
          {/* Column headers */}
          <div className="grid grid-cols-1 md:grid-cols-[1.1fr_1fr_1fr] gap-px bg-[#E5E2D9] border border-[#E5E2D9]">
            <div className="bg-white p-5 hidden md:block" />
            <div className="bg-[#0A0A0A] text-white p-5 flex items-center gap-2 font-display font-bold text-lg">
              <X className="h-5 w-5 text-white/50" /> Discounting
            </div>
            <div className="bg-[#FFD300] text-black p-5 flex items-center gap-2 font-display font-bold text-lg">
              <Check className="h-5 w-5" /> Travel Incentive
            </div>

            {ROWS.map((r, i) => (
              <div key={i} className="contents" data-testid={`compare-row-${i}`}>
                <div className="bg-white p-5 font-display font-bold text-black text-base border-t border-[#E5E2D9] md:border-t-0">
                  {r.dim}
                </div>
                <div className="bg-white p-5 text-sm text-[#595959] leading-relaxed flex gap-2">
                  <X className="h-4 w-4 text-black/30 shrink-0 mt-0.5" />
                  <span>{r.discount}</span>
                </div>
                <div className="bg-[#FFFBEA] p-5 text-sm text-black leading-relaxed flex gap-2">
                  <Check className="h-4 w-4 text-[#0A0A0A] shrink-0 mt-0.5" />
                  <span>{r.incentive}</span>
                </div>
              </div>
            ))}
          </div>

          {/* The math */}
          <div className="mt-16 grid md:grid-cols-2 gap-8">
            <div className="border border-[#E5E2D9] p-8">
              <div className="text-[11px] font-mono uppercase tracking-widest text-black/50 font-bold">The discount math</div>
              <p className="mt-4 font-display text-2xl font-bold text-black leading-snug">
                A 10% discount on a 30%-margin product wipes out about a third of your profit on that deal.
              </p>
              <p className="mt-4 text-[#595959] leading-relaxed">
                And once you discount, buyers expect it next time. You've trained your market to wait for the price to drop.
              </p>
            </div>
            <div className="bg-[#0A0A0A] text-white p-8">
              <div className="text-[11px] font-mono uppercase tracking-widest text-[#FFD300] font-bold">The incentive math</div>
              <p className="mt-4 font-display text-2xl font-bold leading-snug">
                A vacation's perceived value runs about 10x what it costs you — and your price never moves.
              </p>
              <p className="mt-4 text-white/70 leading-relaxed">
                Higher close rate, higher average ticket, and more referrals — all with your margin intact.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Verdict / FAQ */}
      <section className="bg-[#F7F5EF] py-16 lg:py-24">
        <div className="mx-auto max-w-[900px] px-6 lg:px-10">
          <SectionLabel>The bottom line</SectionLabel>
          <h2 className="font-display mt-5 text-4xl lg:text-5xl font-bold text-black leading-[0.95]">
            Stop discounting. Start closing.
          </h2>
          <dl className="mt-10 divide-y divide-[#E5E2D9] border-y border-[#E5E2D9]">
            {FAQS.map((f, i) => (
              <div key={i} data-testid={`compare-faq-${i}`} className="py-7">
                <dt className="font-display text-xl lg:text-2xl font-bold text-black leading-tight">{f.q}</dt>
                <dd className="mt-3 text-base lg:text-lg text-[#595959] leading-relaxed">{f.a}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#FFD300] py-16 lg:py-20">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <h2 className="font-display text-3xl lg:text-4xl font-bold text-black leading-tight max-w-2xl">
            See what stopping the discount does to your numbers.
          </h2>
          <Link
            to="/contact"
            data-testid="comparison-cta"
            className="inline-flex items-center gap-3 bg-black hover:bg-[#171717] text-white font-bold text-lg px-8 py-5 uppercase tracking-wide whitespace-nowrap"
          >
            Book a Strategy Call <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </section>
    </div>
  );
}
