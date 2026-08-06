import { useState, useEffect } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Menu, X, ChevronDown } from "lucide-react";
import { NAV_LINKS } from "@/data/content";
import { COMPARE_LINKS } from "@/data/comparisons";

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { setOpen(false); }, [pathname]);

  // Pages with a dark hero want a transparent header at top of scroll
  const darkHeroPages = ["/", "/about", "/programs", "/industries", "/case-studies", "/resources", "/faq", "/travel-incentives-vs-discounting", "/contact"];
  const onDarkHero = darkHeroPages.includes(pathname) || pathname.startsWith("/travel-incentives-vs-");
  const transparent = onDarkHero && !scrolled;
  const compareActive = pathname.startsWith("/travel-incentives-vs-");

  return (
    <header
      data-testid="site-header"
      className={`fixed top-0 inset-x-0 z-50 transition-all ${
        transparent ? "bg-transparent" : "bg-white border-b border-[#E5E2D9] shadow-sm"
      }`}
    >
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10 h-20 flex items-center justify-between">
        <Link to="/" data-testid="nav-logo" className="flex items-center gap-3 group">
          <span className={`inline-flex h-10 w-10 items-center justify-center font-display font-bold text-base ${transparent ? "bg-[#FFD300] text-black" : "bg-black text-[#FFD300]"}`}>BB</span>
          <span className={`font-display font-bold text-lg lg:text-xl tracking-tight ${transparent ? "text-white" : "text-black"}`}>
            BestBuy<span className="bg-[#FFD300] text-black px-1.5 ml-1">Incentives</span>
          </span>
        </Link>

        <nav className="hidden lg:flex items-center gap-7">
          {NAV_LINKS.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              data-testid={`nav-link-${l.to.replace("/", "")}`}
              className={({ isActive }) =>
                `text-sm font-bold transition-colors ${
                  transparent
                    ? isActive ? "text-[#FFD300]" : "text-white/90 hover:text-[#FFD300]"
                    : isActive ? "text-black" : "text-[#595959] hover:text-black"
                }`
              }
            >
              {l.label}
            </NavLink>
          ))}

          {/* Compare dropdown */}
          <div className="relative group" data-testid="nav-compare">
            <button
              type="button"
              data-testid="nav-compare-trigger"
              className={`text-sm font-bold transition-colors inline-flex items-center gap-1 ${
                transparent
                  ? compareActive ? "text-[#FFD300]" : "text-white/90 hover:text-[#FFD300]"
                  : compareActive ? "text-black" : "text-[#595959] hover:text-black"
              }`}
            >
              Compare <ChevronDown className="h-3.5 w-3.5" />
            </button>
            <div className="absolute left-1/2 -translate-x-1/2 top-full pt-4 hidden group-hover:block">
              <div className="bg-white border border-[#E5E2D9] shadow-xl min-w-[240px] py-2">
                {COMPARE_LINKS.map((c) => (
                  <NavLink
                    key={c.to}
                    to={c.to}
                    data-testid={`nav-compare-${c.to.split("-vs-")[1]}`}
                    className="block px-4 py-2.5 text-sm font-bold text-[#595959] hover:text-black hover:bg-[#F7F5EF]"
                  >
                    {`Travel incentives ${c.label}`}
                  </NavLink>
                ))}
              </div>
            </div>
          </div>
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

            <div className="py-2 border-b border-[#E5E2D9]" data-testid="nav-mobile-compare">
              <div className="py-3 text-base font-bold text-[#595959]">Compare</div>
              {COMPARE_LINKS.map((c) => (
                <NavLink
                  key={c.to}
                  to={c.to}
                  data-testid={`nav-mobile-compare-${c.to.split("-vs-")[1]}`}
                  className={({ isActive }) => `block py-2 pl-4 text-sm font-bold ${isActive ? "text-black" : "text-[#595959]"}`}
                >
                  {`Travel incentives ${c.label}`}
                </NavLink>
              ))}
            </div>

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
