import { Link } from "react-router-dom";
import { ArrowRight, Calendar } from "lucide-react";
import { IMG } from "@/data/images";

export default function FinalCTA() {
  return (
    <section data-testid="final-cta" className="relative overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img src={IMG.heroSeminarStage} alt="" className="w-full h-full object-cover kenburn" />
        <div className="absolute inset-0 bg-gradient-to-br from-black/90 via-black/70 to-black/95" />
      </div>

      <div className="relative z-10 mx-auto max-w-[1400px] px-6 lg:px-10 py-24 lg:py-40 text-center text-white">
        <div className="inline-block stamp mb-7">For sales leaders only · 30-min call</div>
        <h2 className="font-display text-5xl sm:text-6xl lg:text-8xl xl:text-9xl font-bold leading-[0.9]">
          Build the offer your<br />
          <span className="hl-yellow-full text-black">competitors can't match.</span>
        </h2>
        <p className="mt-8 text-lg lg:text-2xl text-white/85 max-w-3xl mx-auto leading-[1.4]">
          30 minutes. We map your sales floor. We model your projected lift. You walk away with a deployable game plan — whether you buy a program or not.
        </p>

        <div className="mt-12 flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            to="/contact"
            data-testid="final-cta-primary"
            className="inline-flex items-center justify-center gap-3 bg-[#FFD300] hover:bg-[#FFEA66] text-black font-bold text-lg lg:text-xl px-9 py-6 uppercase tracking-wide play-pulse"
          >
            <Calendar className="h-5 w-5" />
            Book My Strategy Call <ArrowRight className="h-5 w-5" />
          </Link>
          <Link
            to="/case-studies"
            data-testid="final-cta-secondary"
            className="inline-flex items-center justify-center gap-3 border-2 border-white hover:bg-white hover:text-black text-white font-bold text-lg lg:text-xl px-9 py-6 uppercase tracking-wide transition-colors"
          >
            See The Results
          </Link>
        </div>

        <div className="mt-10 text-xs font-mono uppercase tracking-[0.3em] text-white/50">
          No pitch · No pressure · Walk away with a playbook either way
        </div>
      </div>
    </section>
  );
}
