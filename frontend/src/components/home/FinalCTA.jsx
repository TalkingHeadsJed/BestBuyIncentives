import { Link } from "react-router-dom";
import { ArrowRight, Calendar } from "lucide-react";

export default function FinalCTA() {
  return (
    <section data-testid="final-cta" className="py-24 lg:py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-grid opacity-30 pointer-events-none" />
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-emerald-500/15 blur-[140px] rounded-full pointer-events-none" />
      <div className="mx-auto max-w-5xl px-6 lg:px-8 relative">
        <div className="text-center">
          <div className="inline-flex items-center gap-2 border border-emerald-500/40 bg-emerald-500/10 text-emerald-400 text-[11px] font-mono uppercase tracking-widest px-3 py-1">
            For sales leaders only · 30-min call
          </div>
          <h2 className="font-display mt-6 text-5xl lg:text-7xl font-bold leading-[0.95]">
            Build the offer your <span className="text-emerald-400">competitors can't match.</span>
          </h2>
          <p className="mt-6 text-zinc-300 text-lg max-w-2xl mx-auto leading-relaxed">
            30 minutes. We map your sales floor. We model your projected lift. You walk away with a deployable game plan — paid program or not.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              to="/contact"
              data-testid="final-cta-primary"
              className="inline-flex items-center justify-center gap-3 bg-emerald-500 hover:bg-emerald-400 text-[#0A0F17] font-semibold text-base px-7 py-4 btn-pulse"
            >
              <Calendar className="h-4 w-4" />
              Book My Strategy Call
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              to="/case-studies"
              data-testid="final-cta-secondary"
              className="inline-flex items-center justify-center gap-3 border border-white/20 hover:border-emerald-400/60 text-white font-semibold text-base px-7 py-4"
            >
              See Documented Results
            </Link>
          </div>

          <div className="mt-10 text-[11px] font-mono uppercase tracking-widest text-zinc-500">
            No pitch. No pressure. Walk away with a playbook either way.
          </div>
        </div>
      </div>
    </section>
  );
}
