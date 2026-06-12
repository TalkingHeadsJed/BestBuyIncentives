import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { X, ArrowRight } from "lucide-react";

export default function StickyCTA() {
  const { pathname } = useLocation();
  const [show, setShow] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 1000);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (pathname === "/contact" || dismissed || !show) return null;

  return (
    <div
      data-testid="sticky-cta"
      className="fixed bottom-0 inset-x-0 z-40 bg-[#0A0A0A] text-white border-t-4 border-[#FFD300]"
    >
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10 py-3 flex items-center justify-between gap-4">
        <div className="flex items-center gap-4 min-w-0">
          <span className="hidden md:inline-block stamp shrink-0">Act now</span>
          <p className="text-sm md:text-base truncate">
            <span className="font-display font-bold">Stop discounting.</span>{" "}
            <span className="hidden sm:inline text-white/80">Put a closing tool on your floor in 10 business days.</span>
          </p>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <Link
            to="/contact"
            data-testid="sticky-cta-button"
            className="inline-flex items-center gap-2 bg-[#FFD300] hover:bg-[#FFEA66] text-black font-bold text-sm px-5 py-2.5 uppercase tracking-wide"
          >
            Book Call <ArrowRight className="h-3.5 w-3.5" />
          </Link>
          <button
            data-testid="sticky-cta-dismiss"
            onClick={() => setDismissed(true)}
            className="h-9 w-9 inline-flex items-center justify-center text-white/60 hover:text-white"
            aria-label="Dismiss"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
