import { ArrowRight, Mail, Phone, MapPin } from "lucide-react";

// Plain <a> hard-navigation only, pointing to routes that exist in the assembled
// site (static overlay routes + the retained React /contact and legal pages).
export default function Footer() {
  return (
    <footer data-testid="site-footer" className="bg-[#0A0A0A] text-white">
      <div className="border-b border-white/10">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10 py-16 lg:py-20 grid lg:grid-cols-2 gap-12 items-center">
          <h2 className="font-display text-4xl lg:text-6xl font-bold leading-[0.95]">Ready to put a <span className="bg-[#FFD300] text-black px-3">closing tool</span><br />on your sales floor?</h2>
          <div className="flex flex-col items-start lg:items-end gap-4">
            <a href="/contact/" data-testid="footer-cta-demo" className="inline-flex items-center gap-3 bg-[#FFD300] hover:bg-[#FFEA66] text-black font-bold text-lg px-8 py-5 uppercase tracking-wide">Book My Strategy Call <ArrowRight className="h-5 w-5" /></a>
            <div className="text-xs font-mono uppercase tracking-widest text-white/60">30 minutes · review the offer, economics, and sales process</div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-[1400px] px-6 lg:px-10 py-16 grid grid-cols-1 md:grid-cols-12 gap-10">
        <div className="md:col-span-5">
          <a href="/" className="flex items-center gap-3"><span className="inline-block h-9 w-9 bg-[#FFD300] flex items-center justify-center font-display font-bold text-base text-black">BB</span><span className="font-display font-bold text-xl">BestBuy<span className="text-[#FFD300]">Incentives</span></span></a>
          <p className="mt-5 text-sm text-white/70 max-w-md leading-relaxed">We help high-ticket sales teams use discounted travel vouchers as customer-facing closing incentives that add value without automatically reducing price.</p>
          <a href="/downloads/BestBuyIncentives_High-Ticket_Closing_Playbook.pdf" className="mt-6 inline-flex bg-[#FFD300] hover:bg-[#FFEA66] text-black font-bold text-sm px-5 py-3 uppercase tracking-wide">Download the Closing Playbook</a>
          <p className="mt-2 text-[11px] font-mono uppercase tracking-widest text-white/40">Closing tactics · scripts · campaign measurement</p>
        </div>

        <FooterColumn title="Sales system" links={[["How It Works", "/how-it-works/"], ["Sales Closing Incentives", "/sales-closing-incentives/"], ["Customer Incentive Programs", "/customer-incentive-programs/"], ["Compare Incentives", "/customer-incentive-comparisons/"], ["Plan a Campaign", "/contact/"]]} />
        <FooterColumn title="Proof & resources" links={[["Case Studies", "/case-studies/automotive-closing-incentives/"], ["Closing Playbook", "/high-ticket-closing-playbook/"], ["Measure Incentive ROI", "/how-to-measure-incentive-roi/"], ["Industries — Jewelry", "/industries/jewelry-stores/"], ["Industries — Automotive", "/industries/automotive-dealerships/"]]} />

        <div className="md:col-span-3">
          <div className="text-[11px] font-mono uppercase tracking-widest text-white/40 mb-4">Contact</div>
          <ul className="space-y-3 text-sm text-white/80">
            <li><a href="mailto:sales@bestbuyincentives.com" className="flex items-center gap-2 text-white/80 hover:text-[#FFD300]"><Mail className="h-3.5 w-3.5 text-[#FFD300]" /> sales@bestbuyincentives.com</a></li>
            <li><a href="tel:+18668438003" className="flex items-center gap-2 text-white/80 hover:text-[#FFD300]"><Phone className="h-3.5 w-3.5 text-[#FFD300]" /> 866-843-8003</a></li>
            <li className="flex items-center gap-2"><MapPin className="h-3.5 w-3.5 text-[#FFD300]" /> United States</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10 py-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <p className="text-[11px] font-mono uppercase tracking-widest text-white/40">{`© ${new Date().getFullYear()} BestBuyIncentives.com — Trusted Since 1992 · A Sales Growth Company`}</p>
          <div className="flex items-center gap-6 text-[11px] font-mono uppercase tracking-widest text-white/40"><a href="/privacy/" className="hover:text-[#FFD300]">Privacy</a><a href="/terms/" className="hover:text-[#FFD300]">Terms</a><a href="/compliance/" className="hover:text-[#FFD300]">Compliance</a></div>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({ title, links }) {
  return <div className="md:col-span-2"><div className="text-[11px] font-mono uppercase tracking-widest text-white/40 mb-4">{title}</div><ul className="space-y-2.5 text-sm">{links.map(([label, to]) => <li key={to}><a href={to} className="text-white/80 hover:text-[#FFD300]">{label}</a></li>)}</ul></div>;
}
