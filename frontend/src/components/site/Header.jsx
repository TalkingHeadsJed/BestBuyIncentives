import { useState, useEffect } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Menu, X, TrendingUp } from "lucide-react";
import { NAV_LINKS } from "@/data/content";

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { setOpen(false); }, [pathname]);

  return (
    <header
      data-testid="site-header"
      className={`fixed top-0 inset-x-0 z-50 transition-all ${scrolled ? "backdrop-blur-xl bg-[#0A0F17]/85 border-b border-white/10" : "bg-transparent"}`}
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link to="/" data-testid="nav-logo" className="flex items-center gap-2 group">
          <span className="inline-flex h-8 w-8 items-center justify-center bg-emerald-500 text-[#0A0F17]">
            <TrendingUp className="h-4 w-4" strokeWidth={2.5} />
          </span>
          <span className="font-display font-bold text-base tracking-tight">
            BestBuy<span className="text-emerald-400">Incentives</span>
          </span>
        </Link>

        <nav className="hidden lg:flex items-center gap-1">
          {NAV_LINKS.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              data-testid={`nav-link-${l.to.replace("/", "")}`}
              className={({ isActive }) =>
                `px-4 py-2 text-sm font-medium transition-colors ${isActive ? "text-emerald-400" : "text-zinc-300 hover:text-white"}`
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
            className="hidden sm:inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-[#0A0F17] font-semibold text-sm px-4 py-2 transition-colors"
          >
            Request a Demo
            <span className="font-mono text-[10px] tracking-widest">→</span>
          </Link>
          <button
            data-testid="nav-mobile-toggle"
            onClick={() => setOpen((s) => !s)}
            className="lg:hidden inline-flex h-9 w-9 items-center justify-center border border-white/15 text-white"
            aria-label="Toggle menu"
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="lg:hidden border-t border-white/10 bg-[#0A0F17]/95 backdrop-blur-xl">
          <div className="px-6 py-4 flex flex-col gap-1">
            {NAV_LINKS.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                data-testid={`nav-mobile-link-${l.to.replace("/", "")}`}
                className={({ isActive }) =>
                  `py-3 text-sm font-medium border-b border-white/5 ${isActive ? "text-emerald-400" : "text-zinc-200"}`
                }
              >
                {l.label}
              </NavLink>
            ))}
            <Link
              to="/contact"
              data-testid="nav-mobile-cta"
              className="mt-3 inline-flex items-center justify-center bg-emerald-500 text-[#0A0F17] font-semibold text-sm px-4 py-3"
            >
              Request a Demo →
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
