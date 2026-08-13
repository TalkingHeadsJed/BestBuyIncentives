import { Link } from "react-router-dom";
import { useState } from "react";
import { toast } from "sonner";
import { ArrowRight, Mail, Phone, MapPin } from "lucide-react";
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
    <footer data-testid="site-footer" className="bg-[#0A0A0A] text-white">
      {/* CTA strip */}
      <div className="border-b border-white/10">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10 py-16 lg:py-20 grid lg:grid-cols-2 gap-12 items-center">
          <h2 className="font-display text-4xl lg:text-6xl font-bold leading-[0.95]">
            Ready to put a <span className="bg-[#FFD300] text-black px-3">closing tool</span><br />
            on your sales floor?
          </h2>
          <div className="flex flex-col items-start lg:items-end gap-4">
            <Link
              to="/contact"
              data-testid="footer-cta-demo"
              className="inline-flex items-center gap-3 bg-[#FFD300] hover:bg-[#FFEA66] text-black font-bold text-lg px-8 py-5 uppercase tracking-wide"
            >
              Book My Strategy Call <ArrowRight className="h-5 w-5" />
            </Link>
            <div className="text-xs font-mono uppercase tracking-widest text-white/60">
              30 minutes · no pitch · walk away with a playbook
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-[1400px] px-6 lg:px-10 py-16 grid grid-cols-1 md:grid-cols-12 gap-10">
        <div className="md:col-span-5">
          <Link to="/" className="flex items-center gap-3">
            <span className="inline-block h-9 w-9 bg-[#FFD300] flex items-center justify-center font-display font-bold text-base text-black">BB</span>
            <span className="font-display font-bold text-xl">BestBuy<span className="text-[#FFD300]">Incentives</span></span>
          </Link>
          <p className="mt-5 text-sm text-white/70 max-w-md leading-relaxed">
            We sell sales growth. The mechanism happens to be a vacation. Used by 1,200+ high-ticket sales teams across North America.
          </p>
          <form onSubmit={subscribe} className="mt-6 flex max-w-md" data-testid="newsletter-form">
            <input
              data-testid="newsletter-email-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="Your work email"
              className="flex-1 bg-white/5 border border-white/15 text-sm text-white px-4 py-3 focus:outline-none focus:border-[#FFD300]"
            />
            <button
              type="submit"
              disabled={busy}
              data-testid="newsletter-submit"
              className="bg-[#FFD300] hover:bg-[#FFEA66] text-black font-bold text-sm px-5 disabled:opacity-60 uppercase tracking-wide"
            >
              {busy ? "..." : "Subscribe"}
            </button>
          </form>
          <p className="mt-2 text-[11px] font-mono uppercase tracking-widest text-white/40">
            Weekly: closing tactics · scripts · campaign playbooks
          </p>
        </div>

        <div className="md:col-span-2">
          <div className="text-[11px] font-mono uppercase tracking-widest text-white/40 mb-4">Programs</div>
          <ul className="space-y-2.5 text-sm">
            <li><Link to="/programs" className="text-white/80 hover:text-[#FFD300]">Enjoy a Great Escape</Link></li>
            <li><Link to="/programs" className="text-white/80 hover:text-[#FFD300]">Travel &amp; Entertainment</Link></li>
            <li><Link to="/case-studies" className="text-white/80 hover:text-[#FFD300]">Case Studies</Link></li>
            <li><Link to="/contact" className="text-white/80 hover:text-[#FFD300]">Book a Call</Link></li>
          </ul>
        </div>

        <div className="md:col-span-2">
          <div className="text-[11px] font-mono uppercase tracking-widest text-white/40 mb-4">Company</div>
          <ul className="space-y-2.5 text-sm">
            <li><Link to="/about" className="text-white/80 hover:text-[#FFD300]">About</Link></li>
            <li><Link to="/case-studies" className="text-white/80 hover:text-[#FFD300]">Case Studies</Link></li>
            <li><Link to="/resources" className="text-white/80 hover:text-[#FFD300]">Resources</Link></li>
            <li><Link to="/articles" data-testid="footer-link-articles" className="text-white/80 hover:text-[#FFD300]">Sales Resources</Link></li>
            <li><Link to="/industries" className="text-white/80 hover:text-[#FFD300]">Industries</Link></li>
            <li><Link to="/faq" data-testid="footer-link-faq" className="text-white/80 hover:text-[#FFD300]">FAQ</Link></li>
            <li><Link to="/travel-incentives-vs-discounting" data-testid="footer-link-comparison" className="text-white/80 hover:text-[#FFD300]">Incentives vs. Discounting</Link></li>
          </ul>
        </div>

        <div className="md:col-span-3">
          <div className="text-[11px] font-mono uppercase tracking-widest text-white/40 mb-4">Contact</div>
          <ul className="space-y-3 text-sm text-white/80">
            <li className="flex items-center gap-2"><Mail className="h-3.5 w-3.5 text-[#FFD300]" /> karl@bestbuyincentives.com</li>
            <li className="flex items-center gap-2"><Phone className="h-3.5 w-3.5 text-[#FFD300]" /> 866-843-8003</li>
            <li className="flex items-center gap-2"><MapPin className="h-3.5 w-3.5 text-[#FFD300]" /> United States</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10 py-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <p className="text-[11px] font-mono uppercase tracking-widest text-white/40">
            {`\u00A9 ${new Date().getFullYear()} BestBuyIncentives.com \u2014 Trusted Since 1992 \u00B7 A Sales Growth Company`}
          </p>
          <div className="flex items-center gap-6 text-[11px] font-mono uppercase tracking-widest text-white/40">
            <Link to="/privacy" className="hover:text-[#FFD300]">Privacy</Link>
            <Link to="/terms" className="hover:text-[#FFD300]">Terms</Link>
            <Link to="/compliance" className="hover:text-[#FFD300]">Compliance</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
