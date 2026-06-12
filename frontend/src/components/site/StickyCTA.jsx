import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { X } from "lucide-react";

export default function StickyCTA() {
  const { pathname } = useLocation();
  const [show, setShow] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 800);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (pathname === "/contact" || dismissed || !show) return null;

  return (
    <div
      data-testid="sticky-cta"
      className="fixed bottom-4 inset-x-4 md:bottom-6 md:left-auto md:right-6 md:inset-x-auto z-40 max-w-md md:max-w-sm bg-[#111827] border border-emerald-500/40 shadow-[0_20px_60px_-20px_rgba(16,185,129,0.4)]"
    >
      <button
        data-testid="sticky-cta-dismiss"
        onClick={() => setDismissed(true)}
        className="absolute right-2 top-2 text-zinc-400 hover:text-white"
        aria-label="Dismiss"
      >
        <X className="h-3.5 w-3.5" />
      </button>
      <div className="p-5">
        <div className="text-[10px] font-mono uppercase tracking-widest text-emerald-400">
          For sales leaders
        </div>
        <h3 className="mt-1 font-display font-semibold text-lg leading-tight">
          Increase sales without sacrificing margin.
        </h3>
        <p className="mt-1 text-sm text-zinc-400">
          See your team's projected close-rate lift in 12 minutes.
        </p>
        <Link
          to="/contact"
          data-testid="sticky-cta-button"
          className="mt-3 inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-[#0A0F17] font-semibold text-sm px-4 py-2 btn-pulse"
        >
          Book Strategy Call →
        </Link>
      </div>
    </div>
  );
}
