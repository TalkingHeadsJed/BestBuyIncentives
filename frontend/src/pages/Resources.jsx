import Seo from "@/components/site/Seo";
import SectionLabel from "@/components/site/SectionLabel";
import { RESOURCES } from "@/data/content";
import { IMG } from "@/data/images";
import { Link } from "react-router-dom";
import { ArrowUpRight, Clock } from "lucide-react";

export default function Resources() {
  return (
    <div data-testid="page-resources">
      <Seo
        title="The Closer's Library — Sales Tactics, Scripts & Campaign Playbooks"
        description="Tactical reading for sales leaders who refuse to compete on price. Closing tactics, incentive playbooks, campaign scripts, and comp-plan advice."
        path="/resources"
      />
      <section className="relative bg-[#0A0A0A] text-white overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-30">
          <img src={IMG.whiteboard} alt="" className="w-full h-full object-cover kenburn" />
          <div className="absolute inset-0 bg-gradient-to-br from-black via-black/60 to-black/95" />
        </div>
        <div className="relative z-10 mx-auto max-w-[1400px] px-6 lg:px-10 pt-40 pb-24 lg:pb-32">
          <SectionLabel dark>The Closer's Library</SectionLabel>
          <h1 className="font-display mt-6 text-5xl sm:text-6xl lg:text-8xl font-bold leading-[0.92]">
            Sales tactics. <span className="hl-yellow-full text-black">Closing scripts.</span><br />
            Campaign playbooks.
          </h1>
          <p className="mt-8 text-lg lg:text-2xl max-w-3xl leading-[1.4] text-white/85">
            Tactical reading for sales leaders who refuse to compete on price. New drops weekly.
          </p>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {RESOURCES.map((r) => (
              <Link
                key={r.slug}
                to={`/resources/${r.slug}`}
                data-testid={`resource-${r.slug}`}
                className="border border-[#E5E2D9] bg-white hover:bg-[#F5F2EA] transition-colors group flex flex-col"
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <img src={r.image} alt={r.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" loading="lazy" />
                  <div className="absolute top-3 left-3 stamp text-[10px]">{r.category}</div>
                </div>
                <div className="p-7 flex-1 flex flex-col">
                  <h3 className="font-display font-bold text-xl lg:text-2xl leading-[1.05] text-black group-hover:text-black">
                    {r.title}
                  </h3>
                  <p className="mt-3 text-sm text-[#595959] leading-relaxed flex-1">{r.excerpt}</p>
                  <div className="mt-6 pt-4 border-t border-[#E5E2D9] flex items-center justify-between">
                    <div className="text-[10px] font-mono uppercase tracking-widest text-black/50 font-bold flex items-center gap-1.5">
                      <Clock className="h-3 w-3" /> {r.minutes} min read
                    </div>
                    <ArrowUpRight className="h-4 w-4 text-black group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
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
