import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { PROGRAMS } from "@/data/content";
import SectionLabel from "@/components/site/SectionLabel";

export default function ProgramsShowcase() {
  return (
    <section data-testid="programs-showcase" className="bg-[#F5F2EA] py-20 lg:py-28">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
          <div className="max-w-2xl">
            <SectionLabel>The Certificates</SectionLabel>
            <h2 className="font-display mt-6 text-5xl lg:text-7xl font-bold leading-[0.92] text-black">
              The closing tool <br />
              <span className="under-yellow">your reps don't have yet.</span>
            </h2>
          </div>
          <Link
            to="/programs"
            data-testid="programs-showcase-all"
            className="inline-flex items-center gap-2 text-sm font-mono uppercase tracking-widest text-black font-bold border-b-2 border-[#FFD300] pb-1 hover:text-black transition-colors"
          >
            All programs <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        <div className="mt-14 grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {PROGRAMS.map((p) => (
            <article key={p.slug} className="group">
              {/* HUGE product photo (the brochure) */}
              <div className="relative bg-white shadow-xl">
                <div className="absolute -top-3 left-6 stamp z-10">{p.badge}</div>
                <div className="relative aspect-[16/10] overflow-hidden bg-[#0a2b5e]">
                  <img
                    src={p.image}
                    alt={p.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    loading="lazy"
                  />
                </div>
              </div>
              <div className="mt-7">
                <div className="text-[11px] font-mono uppercase tracking-widest text-black/50 font-bold">{p.tagline}</div>
                <h3 className="mt-2 font-display font-bold text-3xl lg:text-5xl leading-[0.95] text-black">{p.name}</h3>
                <p className="mt-4 text-base text-[#595959] leading-relaxed">{p.description}</p>
                <Link
                  to="/contact"
                  data-testid={`programs-showcase-cta-${p.slug}`}
                  className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-black border-b-2 border-[#FFD300] pb-1 hover:gap-3 transition-all uppercase tracking-wide"
                >
                  Get Pricing <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </article>
          ))}

          {/* Book-a-call: full catalog of travel & entertainment options */}
          <article
            data-testid="programs-showcase-more"
            className="flex flex-col justify-center bg-black text-white p-9 lg:p-12 border-t-4 border-[#FFD300]"
          >
            <div className="text-[11px] font-mono uppercase tracking-widest text-[#FFD300] font-bold">
              Your unfair advantage
            </div>
            <h3 className="mt-4 font-display font-bold text-3xl lg:text-5xl leading-[0.95]">
              Finally, a reason they <span className="hl-yellow-full text-black">can't say no to.</span>
            </h3>
            <p className="mt-5 text-base lg:text-lg text-white/80 leading-relaxed">
              Put a dream getaway in your customer's hands and watch "let me think about it" turn into "where do I sign." It breaks the stall. It kills the remorse. It makes your offer impossible to shop around on price.
            </p>
            <p className="mt-4 text-base lg:text-lg text-white/80 leading-relaxed">
              And Enjoy a Great Escape is only the beginning. Book a call and we'll open up the full vault of travel and entertainment incentives built to close your toughest deals.
            </p>
            <Link
              to="/contact"
              data-testid="programs-showcase-book-call"
              className="mt-8 inline-flex items-center gap-3 bg-[#FFD300] hover:bg-[#FFEA66] text-black font-bold text-base px-7 py-5 uppercase tracking-wide w-fit"
            >
              Book a Call <ArrowRight className="h-4 w-4" />
            </Link>
          </article>
        </div>
      </div>
    </section>
  );
}
