import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

// On the retained React pages (/contact + legal) the rest of the site is the
// static overlay, so all navigation uses plain <a> (hard navigation) to load the
// real prerendered pages instead of React Router intercepting the click.
const NAV = [
  { label: "How It Works", href: "/how-it-works/" },
  { label: "Results", href: "/case-studies/automotive-closing-incentives/" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // /contact has a dark hero; legal pages have a light hero.
  const transparent =
    typeof window !== "undefined" &&
    window.location.pathname.startsWith("/contact") &&
    !scrolled;

  return (
    <header
      data-testid="site-header"
      className={`fixed top-0 inset-x-0 z-50 transition-all ${
        transparent ? "bg-transparent" : "bg-white border-b border-[#E5E2D9] shadow-sm"
      }`}
    >
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10 h-20 flex items-center justify-between">
        <a href="/" data-testid="nav-logo" className="flex items-center gap-3 group">
          <span className={`inline-flex h-10 w-10 items-center justify-center font-display font-bold text-base ${transparent ? "bg-[#FFD300] text-black" : "bg-black text-[#FFD300]"}`}>BB</span>
          <span className={`font-display font-bold text-lg lg:text-xl tracking-tight ${transparent ? "text-white" : "text-black"}`}>
            BestBuy<span className="bg-[#FFD300] text-black px-1.5 ml-1">Incentives</span>
          </span>
        </a>

        <nav className="hidden lg:flex items-center gap-7">
          {NAV.map((l) => (
            <a
              key={l.href}
              href={l.href}
              data-testid={`nav-link-${l.label.toLowerCase().replace(/\s+/g, "-")}`}
              className={`text-sm font-bold transition-colors ${
                transparent ? "text-white/90 hover:text-[#FFD300]" : "text-[#595959] hover:text-black"
              }`}
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href="/contact/"
            data-testid="nav-cta-demo"
            className="hidden sm:inline-flex items-center gap-2 bg-[#FFD300] hover:bg-[#FFEA66] text-black font-bold text-sm px-5 py-3 uppercase tracking-wide"
          >
            Plan a Campaign <span className="font-mono">→</span>
          </a>
          <button
            data-testid="nav-mobile-toggle"
            onClick={() => setOpen((s) => !s)}
            className={`lg:hidden inline-flex h-10 w-10 items-center justify-center border ${transparent ? "border-white/40 text-white" : "border-black/20 text-black"}`}
            aria-label="Toggle menu"
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="lg:hidden bg-white border-t border-[#E5E2D9]">
          <div className="px-6 py-4 flex flex-col gap-1">
            {NAV.map((l) => (
              <a
                key={l.href}
                href={l.href}
                data-testid={`nav-mobile-link-${l.label.toLowerCase().replace(/\s+/g, "-")}`}
                className="py-3 text-base font-bold border-b border-[#E5E2D9] text-[#595959]"
              >
                {l.label}
              </a>
            ))}
            <a
              href="/contact/"
              data-testid="nav-mobile-cta"
              className="mt-3 inline-flex items-center justify-center bg-[#FFD300] text-black font-bold text-sm px-4 py-4 uppercase tracking-wide"
            >
              Plan a Campaign →
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
