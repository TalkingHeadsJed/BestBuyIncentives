import { Link } from "react-router-dom";
import { useState } from "react";
import { ArrowRight, Play, Star } from "lucide-react";
import { IMG } from "@/data/images";

export default function Hero() {
  const [open, setOpen] = useState(false);

  return (
    <section data-testid="hero-section" className="relative bg-white pt-28 lg:pt-32 pb-12 lg:pb-16 overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute top-0 right-0 w-[60%] h-[120%] bg-[#FFF9D6] -z-0 -skew-x-12 origin-top-right pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-[1400px] px-6 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">

          {/* LEFT — minimal text, big headline */}
          <div className="lg:col-span-5">
            <div className="inline-flex items-center gap-2 stamp mb-7">
              <span className="h-1.5 w-1.5 bg-black rounded-full"></span>
              For sales leaders only
            </div>
            <h1
              data-testid="hero-headline"
              className="font-display text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold leading-[0.9] text-black"
            >
              Stop Discounting.<br />
              <span className="hl-yellow-full text-black">Start Closing.</span>
            </h1>
            <p data-testid="hero-subhead" className="mt-7 text-lg lg:text-xl text-[#404040] max-w-xl leading-[1.45]">
              Watch the 4-minute pitch on how 1,200+ high-ticket sales teams lift close rates <span className="font-bold text-black">+37% on average</span> — without cutting a single dollar in price.
            </p>

            <div className="mt-9 flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => setOpen(true)}
                data-testid="hero-cta-watch"
                className="group inline-flex items-center justify-center gap-3 bg-[#FFD300] hover:bg-[#FFEA66] text-black font-bold text-base lg:text-lg px-7 py-5 uppercase tracking-wide play-pulse"
              >
                <Play className="h-5 w-5 fill-current" />
                Watch The Pitch <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </button>
              <Link
                to="/contact"
                data-testid="hero-cta-primary"
                className="inline-flex items-center justify-center gap-3 bg-black hover:bg-[#171717] text-white font-bold text-base lg:text-lg px-7 py-5 uppercase tracking-wide"
              >
                Book Strategy Call
              </Link>
            </div>

            {/* Social proof row */}
            <div className="mt-10 flex items-center gap-5">
              <div className="flex -space-x-3">
                {[IMG.ownerMan1, IMG.ownerWoman1, IMG.ownerMan2, IMG.ownerWoman2].map((src, i) => (
                  <img key={i} src={src} alt="" className="h-12 w-12 rounded-full border-4 border-white object-cover" />
                ))}
              </div>
              <div>
                <div className="flex items-center gap-1 text-black">
                  {[...Array(5)].map((_, i) => <Star key={i} className="h-4 w-4 fill-[#FFD300] text-[#FFD300]" />)}
                  <span className="ml-1 font-bold text-sm tabular-num">4.8/5</span>
                </div>
                <div className="text-xs text-[#595959] mt-0.5">
                  Trusted by <span className="font-bold text-black">1,200+ sales teams</span> across 8 industries
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT — big VSL placeholder dominates */}
          <div className="lg:col-span-7 lg:pl-4">
            <VSLBig onPlay={() => setOpen(true)} />
          </div>
        </div>
      </div>

      {/* VSL modal */}
      {open && (
        <div
          data-testid="vsl-modal"
          className="fixed inset-0 z-[100] bg-black/85 backdrop-blur flex items-center justify-center p-4"
          onClick={() => setOpen(false)}
        >
          <div className="relative w-full max-w-5xl aspect-video bg-black border-4 border-[#FFD300]" onClick={(e) => e.stopPropagation()}>
            <button
              data-testid="vsl-modal-close"
              onClick={() => setOpen(false)}
              className="absolute -top-12 right-0 text-white/80 hover:text-white text-sm font-mono uppercase tracking-widest"
            >
              Close ×
            </button>
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8">
              <div className="stamp mb-4">Coming soon</div>
              <h3 className="font-display text-white text-4xl lg:text-6xl font-bold leading-[0.95]">The 4-Minute Pitch</h3>
              <p className="mt-4 text-white/70 max-w-md text-base">
                Our sales pitch video is being produced. Book a 30-minute call and we'll walk through it with you live.
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

function VSLBig({ onPlay }) {
  return (
    <div data-testid="vsl-card" className="relative">
      {/* Decorative offset boxes (like acquisition.com photo treatment) */}
      <div className="absolute -top-4 -right-4 lg:-top-6 lg:-right-6 w-full h-full bg-[#FFD300] -z-0" />
      <div className="absolute top-4 -left-4 lg:top-6 lg:-left-6 w-full h-full bg-black -z-0" />

      <div className="relative bg-black border-4 border-black">
        <button
          onClick={onPlay}
          className="block w-full aspect-video relative group overflow-hidden"
          aria-label="Play the 4-minute sales pitch"
        >
          <img
            src={IMG.heroSpeaker}
            alt="Sales pitch video"
            className="absolute inset-0 w-full h-full object-cover kenburn"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-black/65 via-black/30 to-black/70" />

          {/* Big play button */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
            <div className="h-24 w-24 lg:h-28 lg:w-28 rounded-full bg-[#FFD300] flex items-center justify-center play-pulse group-hover:scale-110 transition-transform shadow-2xl">
              <Play className="h-10 w-10 lg:h-12 lg:w-12 fill-black text-black ml-1.5" />
            </div>
            <p className="mt-6 font-display font-bold text-3xl lg:text-5xl text-white leading-tight">
              Watch the 4-Min Pitch
            </p>
            <p className="mt-3 text-sm lg:text-base font-mono uppercase tracking-widest text-[#FFD300] font-bold">
              Why this works · 04:12
            </p>
          </div>

          {/* Top label */}
          <span className="absolute top-4 left-4 stamp">Watch this first</span>
          {/* Bottom strip */}
          <div className="absolute bottom-0 inset-x-0 bg-black/90 px-5 py-3 flex items-center justify-between">
            <span className="text-xs font-mono uppercase tracking-widest text-white">Hosted by Karl Kramer · CEO</span>
            <span className="text-xs font-mono uppercase tracking-widest text-[#FFD300] font-bold">FREE</span>
          </div>
        </button>
      </div>
    </div>
  );
}
