import { TRUST_LOGOS } from "@/data/content";

export default function TrustBar() {
  return (
    <section data-testid="trust-bar" className="py-12 border-b border-white/10">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="text-center text-[11px] font-mono uppercase tracking-[0.25em] text-zinc-500 mb-8">
          Used by sales teams at
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-px bg-white/5">
          {TRUST_LOGOS.map((logo) => (
            <div key={logo} className="bg-[#0A0F17] py-5 px-4 text-center">
              <span className="font-display font-semibold text-xs tracking-widest text-zinc-300">{logo}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
