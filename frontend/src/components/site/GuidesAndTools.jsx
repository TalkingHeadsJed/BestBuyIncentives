import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { GUIDES_AND_TOOLS } from "@/data/guidesAndTools";

export function GuidesAndTools({ dark = false }) {
  return (
    <section data-testid="guides-and-tools" className={dark ? "bg-[#0A0A0A] text-white py-16 lg:py-20" : "bg-white py-16 lg:py-20 border-t border-[#E5E2D9]"}>
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
        <div className={`text-[11px] font-mono uppercase tracking-widest font-bold ${dark ? "text-[#FFD300]" : "text-[#595959]"}`}>Guides &amp; Tools</div>
        <h2 className={`font-display mt-3 text-3xl lg:text-4xl font-bold ${dark ? "text-white" : "text-black"}`}>Every playbook, guide, and tool in one place</h2>
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-1">
          {GUIDES_AND_TOOLS.map((g) => (
            <Link
              key={g.to}
              to={g.to}
              data-testid={`guides-link-${g.to.replace(/\//g, "-").replace(/^-/, "")}`}
              className={`group flex items-start gap-2 py-3 border-b text-sm font-bold transition-colors ${
                dark ? "border-white/10 text-white/80 hover:text-[#FFD300]" : "border-[#E5E2D9] text-[#333] hover:text-black"
              }`}
            >
              <ArrowUpRight className={`h-4 w-4 mt-0.5 shrink-0 ${dark ? "text-[#FFD300]" : "text-[#FFD300]"} group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform`} />
              <span>{g.label}</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
