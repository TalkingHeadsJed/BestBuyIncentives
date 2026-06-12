import { Link } from "react-router-dom";
import { ArrowRight, Calendar } from "lucide-react";
import { IMG } from "@/data/images";

export default function FinalCTA() {
  return (
    <section data-testid="final-cta" className="relative overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img src={IMG.heroCrowd} alt="" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-br from-black/95 via-black/85 to-black/95" />
      </div>

      <div className="relative z-10 mx-auto max-w-5xl px-6 lg:px-10 py-28 lg:py-40 text-center text-white">
        <div className="inline-block stamp mb-7">For sales leaders only · 30-min call</div>
        <h2 className="font-display text-5xl lg:text-8xl font-bold leading-[0.92]">
          Build the offer your <br/>
          <span className="hl-yellow-full text-black">competitors can't match.</span>
        </h2>
        <p className="mt-7 text-lg lg:text-xl text-white/80 max-w-2xl mx-auto leading-relaxed">
          30 minutes. We map your sales floor. We model your projected lift. You walk away with a deployable game plan — whether you buy a program or not.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            to="/contact"
            data-testid="final-cta-primary"
            className="inline-flex items-center justify-center gap-3 bg-[#FFD300] hover:bg-[#FFEA66] text-black font-bold text-lg px-8 py-5 uppercase tracking-wide play-pulse"
          >
            <Calendar className="h-5 w-5" />
            Book My Strategy Call <ArrowRight className="h-5 w-5" />
          </Link>
          <Link
            to="/case-studies"
            data-testid="final-cta-secondary"
            className="inline-flex items-center justify-center gap-3 border-2 border-white/30 hover:border-white text-white font-bold text-lg px-8 py-5 uppercase tracking-wide"
          >
            See Documented Results
          </Link>
        </div>

        <div className="mt-10 text-xs font-mono uppercase tracking-[0.3em] text-white/50">
          No pitch · No pressure · Walk away with a playbook either way
        </div>
      </div>
    </section>
  );
}
