import { Link } from "react-router-dom";
import { useState } from "react";
import { ArrowRight, Play, Star } from "lucide-react";
import { IMG } from "@/data/images";

export default function Hero() {
  const [open, setOpen] = useState(false);

  return (
    <section data-testid="hero-section" className="relative min-h-screen flex items-center overflow-hidden bg-black">
      {/* Full-bleed background (acts as video background placeholder) */}
      <div className="absolute inset-0 z-0">
        <img
          src={IMG.heroSeminarStage}
          alt="Sales training seminar"
          className="w-full h-full object-cover kenburn"
        />
        <div className="absolute inset-0 hero-overlay" />
      </div>

      {/* Top "AS SEEN BY" credibility row */}
      <div className="absolute top-24 left-0 right-0 z-10 hidden lg:block">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
          <div className="flex items-center gap-4 text-white/70 text-xs font-mono uppercase tracking-[0.25em]">
            <span className="flex items-center gap-1.5">
              {[...Array(5)].map((_, i) => <Star key={i} className="h-3 w-3 fill-[#FFD300] text-[#FFD300]" />)}
            </span>
            <span>4.8/5 from 1,200+ sales teams</span>
            <span className="text-white/30">·</span>
            <span>Deployed in 8 industries</span>
            <span className="text-white/30">·</span>
            <span>$184M added pipeline closed</span>
          </div>
        </div>
      </div>

      <div className="relative z-10 w-full mx-auto max-w-[1400px] px-6 lg:px-10 py-32 lg:py-40">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left: headline + CTAs */}
          <div className="lg:col-span-7">
            <div className="inline-block stamp mb-6">For sales leaders only</div>
            <h1
              data-testid="hero-headline"
              className="font-display text-white text-5xl sm:text-6xl lg:text-8xl font-bold leading-[0.92]"
            >
              Stop Discounting.<br />
              <span className="hl-yellow-full text-black">Start Closing.</span>
            </h1>
            <p data-testid="hero-subhead" className="mt-7 text-lg lg:text-2xl text-white/85 max-w-2xl leading-[1.4] font-light">
              The most under-used closing weapon in B2B sales. Used by 1,200+ teams to lift close rates <span className="font-bold text-[#FFD300]">+37%</span> on average — without cutting price.
            </p>

            <div className="mt-10 flex flex-col sm:flex-row gap-3">
              <Link
                to="/contact"
                data-testid="hero-cta-primary"
                className="group inline-flex items-center justify-center gap-3 bg-[#FFD300] hover:bg-[#FFEA66] text-black font-bold text-base lg:text-lg px-8 py-5 uppercase tracking-wide play-pulse"
              >
                Book My Strategy Call
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Link>
              <button
                onClick={() => setOpen(true)}
                data-testid="hero-cta-watch"
                className="inline-flex items-center justify-center gap-3 bg-white/10 hover:bg-white/20 border border-white/30 text-white font-bold text-base lg:text-lg px-8 py-5 uppercase tracking-wide backdrop-blur"
              >
                <Play className="h-5 w-5 fill-current text-[#FFD300]" />
                Watch the 4-Min Pitch
              </button>
            </div>

            <div className="mt-10 flex items-center gap-6 text-sm text-white/70">
              <div className="flex -space-x-2">
                {[1,2,3,4].map((i) => (
                  <div key={i} className="h-9 w-9 rounded-full border-2 border-black bg-cover bg-center" style={{ backgroundImage: `url(${IMG[Object.keys(IMG)[i]]})` }} />
                ))}
              </div>
              <span>Sales VPs at <span className="text-white font-bold">1,200+ teams</span> use this every quarter.</span>
            </div>
          </div>

          {/* Right: VSL card */}
          <div className="lg:col-span-5 lg:pl-6">
            <VSLCard onPlay={() => setOpen(true)} />
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 hidden lg:flex flex-col items-center gap-2 text-white/60 text-[10px] font-mono uppercase tracking-[0.3em]">
        <span>Scroll</span>
        <span className="block h-8 w-px bg-white/40" />
      </div>

      {/* VSL modal */}
      {open && (
        <div
          data-testid="vsl-modal"
          className="fixed inset-0 z-[100] bg-black/90 backdrop-blur flex items-center justify-center p-4"
          onClick={() => setOpen(false)}
        >
          <div className="relative w-full max-w-5xl aspect-video bg-black border-2 border-[#FFD300]" onClick={(e) => e.stopPropagation()}>
            <button
              data-testid="vsl-modal-close"
              onClick={() => setOpen(false)}
              className="absolute -top-12 right-0 text-white/70 hover:text-white text-sm font-mono uppercase tracking-widest"
            >
              Close ×
            </button>
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8">
              <div className="stamp mb-4">Coming soon</div>
              <h3 className="font-display text-white text-3xl lg:text-5xl font-bold">The 4-Minute Pitch</h3>
              <p className="mt-4 text-white/70 max-w-md">
                Our sales pitch video is being produced. In the meantime, book a 30-minute call and we'll walk you through it live.
              </p>
              <Link
                to="/contact"
                className="mt-6 inline-flex items-center gap-2 bg-[#FFD300] hover:bg-[#FFEA66] text-black font-bold text-sm px-6 py-3 uppercase tracking-wide"
                onClick={() => setOpen(false)}
              >
                Book Live Pitch <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

function VSLCard({ onPlay }) {
  return (
    <div data-testid="vsl-card" className="relative bg-black border-4 border-[#FFD300]">
      <div className="absolute -top-3 left-6 stamp z-10">Watch this first</div>
      <button
        onClick={onPlay}
        className="block w-full aspect-video relative group"
        aria-label="Play the 4-minute sales pitch"
      >
        <img src={IMG.heroSpeaker} alt="Sales pitch video" className="absolute inset-0 w-full h-full object-cover opacity-70" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-black/40" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          <div className="h-20 w-20 rounded-full bg-[#FFD300] flex items-center justify-center play-pulse group-hover:scale-110 transition-transform">
            <Play className="h-8 w-8 fill-black text-black ml-1" />
          </div>
          <p className="mt-5 font-display font-bold text-2xl text-white">The 4-Minute Pitch</p>
          <p className="text-xs font-mono uppercase tracking-widest text-[#FFD300] mt-1">Why this works · 04:12</p>
        </div>
      </button>
      <div className="bg-black p-5 border-t border-white/10">
        <p className="text-sm text-white/80 leading-relaxed">
          <span className="text-[#FFD300] font-bold">→ </span>
          Why a 30-year-old sales tactic still beats every modern discount, financing, and "limited-time" play in 2026.
        </p>
      </div>
    </div>
  );
}
