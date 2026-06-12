import { TRUST_LOGOS } from "@/data/content";

export default function TrustBar() {
  return (
    <section data-testid="trust-bar" className="bg-[#F5F2EA] py-16">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
        <div className="text-center text-[11px] font-mono uppercase tracking-[0.3em] text-black/60 mb-10">
          Used every quarter by sales teams at
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-x-8 gap-y-6 items-center">
          {TRUST_LOGOS.map((logo) => (
            <div key={logo} className="text-center font-display font-bold text-sm tracking-wider text-black/70 hover:text-black transition-colors">
              {logo}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
