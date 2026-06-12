import SectionLabel from "@/components/site/SectionLabel";
import { RESOURCES } from "@/data/content";
import { Link } from "react-router-dom";
import { ArrowUpRight, Clock } from "lucide-react";

export default function Resources() {
  return (
    <div data-testid="page-resources" className="pt-28">
      <section className="py-16 lg:py-24 border-b border-white/10">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <SectionLabel>The Closer's Library</SectionLabel>
          <h1 className="font-display mt-6 text-5xl lg:text-7xl font-bold leading-[0.95]">
            Sales tactics.
            <br />
            <span className="text-emerald-400">Closing scripts.</span>
            <br />
            Campaign playbooks.
          </h1>
          <p className="mt-8 text-zinc-300 text-lg lg:text-xl max-w-3xl leading-relaxed">
            Tactical reading for sales leaders who refuse to compete on price. New drops weekly.
          </p>
        </div>
      </section>

      <section className="py-12">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-white/10 border border-white/10">
            {RESOURCES.map((r) => (
              <Link
                key={r.slug}
                to={`/resources/${r.slug}`}
                data-testid={`resource-${r.slug}`}
                className="bg-[#0A0F17] hover:bg-[#111827] transition-colors group flex flex-col"
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <img src={r.image} alt={r.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" loading="lazy" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A0F17]/80 via-transparent to-transparent" />
                  <div className="absolute top-3 left-3 bg-[#0A0F17]/85 border border-emerald-500/40 text-[10px] font-mono uppercase tracking-widest text-emerald-400 px-2 py-1">
                    {r.category}
                  </div>
                </div>
                <div className="p-7 flex-1 flex flex-col">
                  <h3 className="font-display font-bold text-xl leading-tight group-hover:text-emerald-400 transition-colors">
                    {r.title}
                  </h3>
                  <p className="mt-3 text-sm text-zinc-400 leading-relaxed flex-1">{r.excerpt}</p>
                  <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between">
                    <div className="text-[10px] font-mono uppercase tracking-widest text-zinc-500 flex items-center gap-1.5">
                      <Clock className="h-3 w-3" /> {r.minutes} min read
                    </div>
                    <ArrowUpRight className="h-4 w-4 text-emerald-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
