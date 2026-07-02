import Seo from "@/components/site/Seo";
import SectionLabel from "@/components/site/SectionLabel";
import { INDUSTRIES } from "@/data/content";
import { IMG } from "@/data/images";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

export default function Industries() {
  return (
    <div data-testid="page-industries">
      <Seo
        title="Industries We Serve — Auto, Jewelry, Furniture, Home Improvement & More"
        description="Sales incentive programs for auto dealerships, jewelry stores, furniture retailers, home improvement, flooring, mattress, luxury retail, and B2B sales organizations."
        path="/industries"
      />
      <section className="relative bg-[#0A0A0A] text-white overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-40">
          <img src={IMG.teamHuddle} alt="" className="w-full h-full object-cover kenburn" />
          <div className="absolute inset-0 bg-gradient-to-br from-black via-black/60 to-black/90" />
        </div>
        <div className="relative z-10 mx-auto max-w-[1400px] px-6 lg:px-10 pt-40 pb-24 lg:pb-32">
          <SectionLabel dark>Built for high-ticket teams</SectionLabel>
          <h1 className="font-display mt-6 text-5xl sm:text-6xl lg:text-8xl font-bold leading-[0.92]">
            Verticals we move.<br />
            <span className="hl-yellow-full text-black">Numbers we move them by.</span>
          </h1>
          <p className="mt-8 text-lg lg:text-2xl max-w-3xl leading-[1.4] text-white/85">
            If your team sells anything north of $2,000 a ticket, vacation incentives belong in your playbook. Here's how each vertical typically uses the program.
          </p>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10 space-y-3">
          {INDUSTRIES.map((ind, i) => (
            <article
              key={ind.name}
              data-testid={`industry-${ind.name.toLowerCase().replace(/\s+/g, "-")}`}
              className="grid grid-cols-1 lg:grid-cols-12 gap-0 border border-[#E5E2D9] bg-white hover:bg-[#F5F2EA] transition-colors group"
            >
              <div className="lg:col-span-1 p-6 flex items-center justify-center border-r border-[#E5E2D9]">
                <div className="font-display font-bold text-3xl text-black/30 tabular-num">{String(i + 1).padStart(2, "0")}</div>
              </div>
              <div className="lg:col-span-5 p-6 lg:p-8 border-r border-[#E5E2D9]">
                <h3 className="font-display font-bold text-3xl lg:text-4xl text-black group-hover:text-black">{ind.name}</h3>
              </div>
              <div className="lg:col-span-4 p-6 lg:p-8 border-r border-[#E5E2D9]">
                <p className="text-base text-[#595959] leading-relaxed">{ind.desc}</p>
              </div>
              <div className="lg:col-span-2 p-6 lg:p-8 flex flex-col justify-center bg-[#FFD300] group-hover:bg-[#FFEA66] transition-colors">
                <div className="text-[10px] font-mono uppercase tracking-widest text-black/70 font-bold">Typical lift</div>
                <div className="mt-1 font-display font-bold text-black text-2xl lg:text-3xl tabular-num">{ind.metric}</div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-[#F5F2EA] py-24">
        <div className="mx-auto max-w-5xl px-6 lg:px-10 text-center">
          <h2 className="font-display text-4xl lg:text-6xl font-bold leading-[0.95] text-black">
            Don't see your vertical? <span className="under-yellow">Talk to us.</span>
          </h2>
          <p className="mt-4 text-lg text-[#595959]">If you sell high-ticket, we have a play for you.</p>
          <Link
            to="/contact"
            data-testid="industries-cta"
            className="mt-10 inline-flex items-center gap-3 bg-[#0A0A0A] hover:bg-black text-white font-bold text-lg px-8 py-5 uppercase tracking-wide"
          >
            Map My Sales Floor <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </section>
    </div>
  );
}
