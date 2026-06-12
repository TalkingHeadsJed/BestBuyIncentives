import { Link } from "react-router-dom";
import { ArrowRight, PlayCircle, Star } from "lucide-react";
import SectionLabel from "@/components/site/SectionLabel";

export default function Hero() {
  return (
    <section data-testid="hero-section" className="relative pt-28 pb-20 lg:pt-36 lg:pb-28 overflow-hidden">
      <div className="absolute inset-0 bg-grid opacity-50 pointer-events-none" />
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-emerald-500/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="mx-auto max-w-7xl px-6 lg:px-8 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7">
            <SectionLabel>Sales Growth · Not Travel</SectionLabel>
            <h1 data-testid="hero-headline" className="font-display mt-6 text-4xl sm:text-5xl lg:text-7xl font-bold leading-[0.95] tracking-tight">
              Stop Discounting.
              <br />
              <span className="text-emerald-400">Start Closing.</span>
            </h1>
            <p data-testid="hero-subhead" className="mt-6 text-lg lg:text-xl text-zinc-300 max-w-2xl leading-relaxed">
              Give your sales team a closing tool the market has never seen. Premium travel incentives that lift close rates, drive showroom traffic, and protect every point of margin — without the discount.
            </p>

            <div className="mt-10 flex flex-col sm:flex-row gap-3">
              <Link
                to="/contact"
                data-testid="hero-cta-primary"
                className="group inline-flex items-center justify-center gap-3 bg-emerald-500 hover:bg-emerald-400 text-[#0A0F17] font-semibold text-base px-6 py-4 transition-colors"
              >
                Book a Strategy Call
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                to="/programs"
                data-testid="hero-cta-secondary"
                className="inline-flex items-center justify-center gap-3 border border-white/15 hover:border-emerald-400/60 text-white font-semibold text-base px-6 py-4 transition-colors"
              >
                <PlayCircle className="h-4 w-4 text-emerald-400" />
                See the Programs
              </Link>
            </div>

            <div className="mt-10 flex items-center gap-6 text-sm text-zinc-400">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-emerald-400 text-emerald-400" />
                ))}
              </div>
              <div>
                <span className="text-white font-semibold tabular-num">4.8/5</span> from 1,200+ sales teams
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 lg:pl-8">
            <div className="grid grid-cols-2 gap-px bg-white/10 border border-white/10">
              <Tile big value="+37%" label="Close-rate lift" />
              <Tile big value="5.2x" label="ROI vs. discount" />
              <Tile value="−63%" label="Buyer's remorse calls" sub="Auto vertical, top-100 dealer" />
              <Tile value="+22%" label="Avg. ticket" sub="Jewelry chain, 12 locations" />
            </div>
            <div className="mt-4 p-5 bg-[#111827] border border-white/10 border-l-2 border-l-emerald-500">
              <div className="text-[10px] font-mono uppercase tracking-widest text-emerald-400">
                Buyer testimonial — auto vertical
              </div>
              <p className="mt-2 text-sm text-zinc-200 leading-relaxed">
                "Single biggest sales day in dealership history. Customers asked when we'd run it again."
              </p>
              <div className="mt-3 text-[11px] font-mono uppercase tracking-widest text-zinc-500">
                Sales Director · Multi-location dealer group
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Tile({ value, label, sub, big }) {
  return (
    <div className={`bg-[#0A0F17] p-6 ${big ? "min-h-[140px]" : "min-h-[120px]"}`}>
      <div className={`font-display font-bold tabular-num leading-none ${big ? "text-5xl text-emerald-400" : "text-3xl text-white"}`}>
        {value}
      </div>
      <div className="mt-3 text-[11px] font-mono uppercase tracking-widest text-zinc-400">{label}</div>
      {sub && <div className="mt-1 text-[11px] text-zinc-500">{sub}</div>}
    </div>
  );
}
