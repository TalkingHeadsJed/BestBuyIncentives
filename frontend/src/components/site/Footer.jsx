import { Link } from "react-router-dom";
import { useState } from "react";
import { toast } from "sonner";
import { Mail, MapPin, Phone, TrendingUp } from "lucide-react";
import { subscribeNewsletter } from "@/lib/api";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [busy, setBusy] = useState(false);

  const subscribe = async (e) => {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      toast.error("Enter a valid email.");
      return;
    }
    try {
      setBusy(true);
      await subscribeNewsletter(email);
      toast.success("You're on the list. Sales playbooks incoming.");
      setEmail("");
    } catch {
      toast.error("Could not subscribe. Try again.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <footer data-testid="site-footer" className="relative border-t border-white/10 bg-[#0A0F17] mt-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          <div className="md:col-span-5">
            <Link to="/" className="flex items-center gap-2">
              <span className="inline-flex h-8 w-8 items-center justify-center bg-emerald-500 text-[#0A0F17]">
                <TrendingUp className="h-4 w-4" strokeWidth={2.5} />
              </span>
              <span className="font-display font-bold text-lg">
                BestBuy<span className="text-emerald-400">Incentives</span>
              </span>
            </Link>
            <p className="mt-4 text-sm text-zinc-400 max-w-md leading-relaxed">
              Sales-growth tools for high-ticket teams. Stop discounting. Equip your reps with the closing instrument the market has not seen before.
            </p>
            <form onSubmit={subscribe} className="mt-6 flex max-w-md" data-testid="newsletter-form">
              <input
                data-testid="newsletter-email-input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                placeholder="you@company.com"
                className="flex-1 bg-[#111827] border border-white/10 text-sm text-white px-4 py-3 focus:outline-none focus:border-emerald-500"
              />
              <button
                type="submit"
                disabled={busy}
                data-testid="newsletter-submit"
                className="bg-emerald-500 hover:bg-emerald-400 text-[#0A0F17] font-semibold text-sm px-5 disabled:opacity-60"
              >
                {busy ? "..." : "Subscribe"}
              </button>
            </form>
            <p className="mt-2 text-[11px] font-mono uppercase tracking-widest text-zinc-500">
              Sales tactics. Closing scripts. Campaign playbooks.
            </p>
          </div>

          <div className="md:col-span-2">
            <div className="text-[11px] font-mono uppercase tracking-widest text-zinc-500 mb-3">Programs</div>
            <ul className="space-y-2 text-sm">
              <li><Link to="/programs" className="text-zinc-300 hover:text-emerald-400">Be Our Guest</Link></li>
              <li><Link to="/programs" className="text-zinc-300 hover:text-emerald-400">Great Escape</Link></li>
              <li><Link to="/programs" className="text-zinc-300 hover:text-emerald-400">Ultimate Cruise</Link></li>
              <li><Link to="/programs" className="text-zinc-300 hover:text-emerald-400">Custom Programs</Link></li>
            </ul>
          </div>

          <div className="md:col-span-2">
            <div className="text-[11px] font-mono uppercase tracking-widest text-zinc-500 mb-3">Company</div>
            <ul className="space-y-2 text-sm">
              <li><Link to="/about" className="text-zinc-300 hover:text-emerald-400">About</Link></li>
              <li><Link to="/case-studies" className="text-zinc-300 hover:text-emerald-400">Case Studies</Link></li>
              <li><Link to="/resources" className="text-zinc-300 hover:text-emerald-400">Resources</Link></li>
              <li><Link to="/industries" className="text-zinc-300 hover:text-emerald-400">Industries</Link></li>
            </ul>
          </div>

          <div className="md:col-span-3">
            <div className="text-[11px] font-mono uppercase tracking-widest text-zinc-500 mb-3">Contact</div>
            <ul className="space-y-2 text-sm text-zinc-300">
              <li className="flex items-center gap-2"><Mail className="h-3.5 w-3.5 text-emerald-400" /> sales@bestbuyincentives.com</li>
              <li className="flex items-center gap-2"><Phone className="h-3.5 w-3.5 text-emerald-400" /> 1-800-555-0102</li>
              <li className="flex items-center gap-2"><MapPin className="h-3.5 w-3.5 text-emerald-400" /> United States</li>
            </ul>
            <Link
              to="/contact"
              data-testid="footer-cta-demo"
              className="mt-4 inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-[#0A0F17] font-semibold text-sm px-4 py-2"
            >
              Book a Demo →
            </Link>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-white/10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <p className="text-[11px] font-mono uppercase tracking-widest text-zinc-500">
            © {new Date().getFullYear()} BestBuyIncentives.com — A Sales Growth Company
          </p>
          <div className="flex items-center gap-6 text-[11px] font-mono uppercase tracking-widest text-zinc-500">
            <a href="#" className="hover:text-emerald-400">Privacy</a>
            <a href="#" className="hover:text-emerald-400">Terms</a>
            <a href="#" className="hover:text-emerald-400">Compliance</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
