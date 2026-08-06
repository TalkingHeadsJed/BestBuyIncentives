import { Link } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import { ArrowRight, Play, Star, Volume2, VolumeX } from "lucide-react";
import { IMG } from "@/data/images";

const VIDEO_SRC = "/hero-bg.mp4";
const VSL_SRC = "/vsl.mp4";
const HERO_BG = "/images/hero-seminar.png";

export default function Hero() {
  const [open, setOpen] = useState(false);
  const modalVideoRef = useRef(null);
  const [muted, setMuted] = useState(false);

  useEffect(() => {
    if (open && modalVideoRef.current) {
      modalVideoRef.current.muted = false;
      modalVideoRef.current.currentTime = 0;
      modalVideoRef.current.play().catch(() => {});
      setMuted(false);
    }
  }, [open]);

  const toggleMute = () => {
    if (!modalVideoRef.current) return;
    modalVideoRef.current.muted = !modalVideoRef.current.muted;
    setMuted(modalVideoRef.current.muted);
  };

  return (
    <section data-testid="hero-section" className="relative min-h-[100vh] flex items-center overflow-hidden bg-black">
      {/* Looping muted video background */}
      <video
        data-testid="hero-bg-video"
        className="absolute inset-0 z-0 w-full h-full object-cover"
        src={VIDEO_SRC}
        poster={IMG.heroSeminarStage}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
      />
      {/* Dark gradient overlay for legibility */}
      <div className="absolute inset-0 z-[1] bg-gradient-to-r from-black/85 via-black/60 to-black/40" />
      <div className="absolute inset-0 z-[1] bg-gradient-to-t from-black/75 via-transparent to-black/30" />

      <div className="relative z-10 w-full mx-auto max-w-[1400px] px-6 lg:px-10 pt-32 pb-20 lg:pt-36 lg:pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">

          {/* LEFT — bold headline over video */}
          <div className="lg:col-span-7 text-white">
            <div className="inline-flex items-center gap-2 stamp mb-6">
              <span className="h-1.5 w-1.5 bg-black rounded-full"></span>
              Since 1992 · For sales leaders
            </div>
            <h1
              data-testid="hero-headline"
              className="font-display text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold leading-[0.9]"
            >
              Stop Discounting.<br />
              <span className="hl-yellow-full text-black">Start Closing.</span>
            </h1>
            <p data-testid="hero-subhead" className="mt-7 text-lg lg:text-2xl text-white/90 max-w-2xl leading-[1.4]">
              The closing tool 1,200+ high-ticket sales teams use to lift close rates <span className="font-bold text-[#FFD300]">+37% on average</span> — without cutting a single dollar in price.
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
                className="inline-flex items-center justify-center gap-3 bg-white/10 hover:bg-white/20 backdrop-blur border-2 border-white/30 hover:border-white text-white font-bold text-base lg:text-lg px-7 py-5 uppercase tracking-wide"
              >
                Book Strategy Call
              </Link>
            </div>

            <div className="mt-10 flex items-center gap-5">
              <div className="flex -space-x-3">
                {[IMG.ownerMan1, IMG.ownerWoman1, IMG.ownerMan2, IMG.ownerWoman2].map((src, i) => (
                  <img key={i} src={src} alt="" className="h-12 w-12 rounded-full border-4 border-black object-cover" />
                ))}
              </div>
              <div>
                <div className="flex items-center gap-1 text-white">
                  {[...Array(5)].map((_, i) => <Star key={i} className="h-4 w-4 fill-[#FFD300] text-[#FFD300]" />)}
                  <span className="ml-1 font-bold text-sm tabular-num">4.8/5</span>
                </div>
                <div className="text-xs text-white/70 mt-0.5">
                  Trusted by <span className="font-bold text-white">1,200+ sales teams</span> across 8 industries
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT — VSL preview card */}
          <div className="lg:col-span-5 lg:pl-4">
            <VSLPreview onPlay={() => setOpen(true)} />
          </div>
        </div>
      </div>

      {/* Scroll hint */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 hidden lg:flex flex-col items-center gap-2 text-white/50 text-[10px] font-mono uppercase tracking-[0.3em]">
        <span>Scroll</span>
        <span className="block h-8 w-px bg-white/40" />
      </div>

      {/* VSL modal — plays the same video with sound */}
      {open && (
        <div
          data-testid="vsl-modal"
          className="fixed inset-0 z-[100] bg-black/90 backdrop-blur flex items-center justify-center p-4"
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
            <video
              ref={modalVideoRef}
              data-testid="vsl-modal-video"
              src={VSL_SRC}
              className="absolute inset-0 w-full h-full object-cover"
              controls
              playsInline
            />
            <button
              onClick={toggleMute}
              className="absolute bottom-16 right-4 bg-black/70 hover:bg-black text-white p-2 rounded-full z-10"
              aria-label="Toggle audio"
              data-testid="vsl-modal-mute"
            >
              {muted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
            </button>
          </div>
        </div>
      )}
    </section>
  );
}

function VSLPreview({ onPlay }) {
  return (
    <div data-testid="vsl-card" className="relative">
      <div className="absolute -top-4 -right-4 lg:-top-6 lg:-right-6 w-full h-full bg-[#FFD300] -z-0" />
      <div className="absolute top-4 -left-4 lg:top-6 lg:-left-6 w-full h-full bg-white/10 -z-0" />

      <div className="relative bg-black border-4 border-black">
        <button
          onClick={onPlay}
          className="block w-full aspect-video relative group overflow-hidden"
          aria-label="Play the sales pitch with sound"
        >
          <video
            src={VSL_SRC}
            className="absolute inset-0 w-full h-full object-cover"
            autoPlay
            muted
            loop
            playsInline
            poster={IMG.heroSpeaker}
          />
          <div className="absolute inset-0 bg-gradient-to-br from-black/55 via-black/15 to-black/55" />

          <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
            <div className="h-24 w-24 lg:h-28 lg:w-28 rounded-full bg-[#FFD300] flex items-center justify-center play-pulse group-hover:scale-110 transition-transform shadow-2xl">
              <Play className="h-10 w-10 lg:h-12 lg:w-12 fill-black text-black ml-1.5" />
            </div>
            <p className="mt-6 font-display font-bold text-3xl lg:text-5xl text-white leading-tight drop-shadow-xl">
              Watch With Sound
            </p>
            <p className="mt-3 text-sm lg:text-base font-mono uppercase tracking-widest text-[#FFD300] font-bold">
              Why this works · 03:51
            </p>
          </div>

          <span className="absolute top-4 left-4 stamp">Watch this first</span>
          <div className="absolute bottom-0 inset-x-0 bg-black/90 px-5 py-3 flex items-center justify-between">
            <span className="text-xs font-mono uppercase tracking-widest text-white">Hosted by Karl Kramer · CEO</span>
            <span className="text-xs font-mono uppercase tracking-widest text-[#FFD300] font-bold">FREE</span>
          </div>
        </button>
      </div>
    </div>
  );
}
