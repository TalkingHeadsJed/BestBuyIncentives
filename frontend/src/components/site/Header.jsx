import { useState, useEffect } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { NAV_LINKS } from "@/data/content";

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { setOpen(false); }, [pathname]);

  return (
    <header
      data-testid="site-header"
      className={`fixed top-0 inset-x-0 z-50 transition-all ${
        scrolled ? "bg-white border-b border-[#E5E2D9] shadow-sm" : "bg-white/90 backdrop-blur-sm"
      }`}
    >
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10 h-20 flex items-center justify-between">
        <Link to="/" data-testid="nav-logo" className="flex items-center gap-3 group">
          <span className="inline-flex h-10 w-10 bg-black items-center justify-center font-display font-bold text-base text-[#FFD300]">BB</span>
          <span className="font-display font-bold text-lg lg:text-xl tracking-tight text-black">
            BestBuy<span className="bg-[#FFD300] px-1.5 ml-1">Incentives</span>
          </span>
        </Link>

        <nav className="hidden lg:flex items-center gap-7">
          {NAV_LINKS.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              data-testid={`nav-link-${l.to.replace("/", "")}`}
              className={({ isActive }) =>
                `text-sm font-bold transition-colors ${isActive ? "text-black" : "text-[#595959] hover:text-black"}`
              }
            >
              {l.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            to="/contact"
            data-testid="nav-cta-demo"
            className="hidden sm:inline-flex items-center gap-2 bg-[#FFD300] hover:bg-[#FFEA66] text-black font-bold text-sm px-5 py-3 uppercase tracking-wide"
          >
            Book a Call <span className="font-mono">→</span>
          </Link>
          <button
            data-testid="nav-mobile-toggle"
            onClick={() => setOpen((s) => !s)}
            className="lg:hidden inline-flex h-10 w-10 items-center justify-center border border-black/20 text-black"
            aria-label="Toggle menu"
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="lg:hidden bg-white border-t border-[#E5E2D9]">
          <div className="px-6 py-4 flex flex-col gap-1">
            {NAV_LINKS.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                data-testid={`nav-mobile-link-${l.to.replace("/", "")}`}
                className={({ isActive }) =>
                  `py-3 text-base font-bold border-b border-[#E5E2D9] ${isActive ? "text-black" : "text-[#595959]"}`
                }
              >
                {l.label}
              </NavLink>
            ))}
            <Link
              to="/contact"
              data-testid="nav-mobile-cta"
              className="mt-3 inline-flex items-center justify-center bg-[#FFD300] text-black font-bold text-sm px-4 py-4 uppercase tracking-wide"
            >
              Book a Call →
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
