import { Link } from "react-router-dom";
import { ArrowRight, ChevronRight } from "lucide-react";
import Seo, { breadcrumbSchema } from "@/components/site/Seo";
import PlaybookGate from "@/components/site/PlaybookGate";

const SITE = "https://bestbuyincentives.com";
const ASSET_ID = "high-ticket-closing-playbook";
const DOWNLOAD_URL = "/downloads/BestBuyIncentives_High-Ticket_Closing_Playbook.pdf";

const Crumb = ({ trail }) => (
  <nav data-testid="playbook-breadcrumb" aria-label="Breadcrumb" className="flex flex-wrap items-center gap-2 text-[11px] font-mono uppercase tracking-widest text-white/50 font-bold">
    {trail.map((c, i) => (
      <span key={c.path} className="flex items-center gap-2">
        {i > 0 && <ChevronRight className="h-3 w-3" />}
        {i === trail.length - 1 ? <span className="text-[#FFD300]">{c.name}</span> : <Link to={c.path} className="hover:text-[#FFD300]">{c.name}</Link>}
      </span>
    ))}
  </nav>
);

export default function PlaybookLanding({ cfg }) {
  const webPage = {
    "@context": "https://schema.org", "@type": "WebPage", "@id": `${SITE}${cfg.path}#webpage`,
    name: cfg.title, description: cfg.description, url: `${SITE}${cfg.path}`,
    isPartOf: { "@id": `${SITE}/#website` }, inLanguage: "en-US",
    about: (cfg.about || []).map((t) => ({ "@type": "Thing", name: t })),
  };
  const schema = [webPage, breadcrumbSchema([{ name: "Home", path: "/" }, { name: cfg.h1, path: cfg.path }])];

  return (
    <div data-testid="page-playbook" className="bg-white">
      <Seo title={cfg.title} description={cfg.description} path={cfg.path} schema={schema} />

      <section className="bg-[#0A0A0A] text-white pt-32 pb-16">
        <div className="mx-auto max-w-3xl px-6 lg:px-10">
          <Crumb trail={[{ name: "Home", path: "/" }, { name: cfg.h1, path: cfg.path }]} />
          <div className="mt-6 inline-block stamp text-[10px]">Manager resource</div>
          <h1 className="font-display mt-6 text-4xl lg:text-6xl font-bold leading-[0.98]">{cfg.h1}</h1>
          <p className="mt-6 text-lg text-white/70 leading-relaxed">{cfg.lead}</p>
          <Link to="/contact" data-testid="playbook-hero-cta" className="mt-8 inline-flex items-center gap-2 bg-[#FFD300] hover:bg-[#FFEA66] text-black font-bold text-sm px-6 py-3 uppercase tracking-wide">
            <span>Schedule a campaign consultation</span> <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </section>

      <section className="py-12 lg:py-16">
        <div className="mx-auto max-w-3xl px-6 lg:px-10">
          <div className="space-y-8">
            {cfg.sections.map((s) => (
              <div key={s.h}>
                <h2 className="font-display text-2xl font-bold text-[#0A0A0A]">{s.h}</h2>
                <p className="mt-2 text-[#404040] leading-relaxed">{s.p}</p>
              </div>
            ))}
          </div>

          <div className="mt-10">
            <PlaybookGate assetId={ASSET_ID} downloadUrl={DOWNLOAD_URL} />
          </div>

          {cfg.proof && cfg.proof.length ? (
            <div className="mt-12 pt-8 border-t border-[#E5E2D9]">
              <div className="text-[11px] font-mono uppercase tracking-widest text-[#595959] font-bold mb-4">{"Proof & supporting guides"}</div>
              <ul className="space-y-2">
                {cfg.proof.map((r) => (
                  <li key={r.to}>
                    <Link to={r.to} className="inline-flex items-center gap-2 text-black font-bold hover:text-[#595959]">
                      <ArrowRight className="h-3.5 w-3.5 text-[#FFD300]" /><span>{r.label}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}

          <div className="mt-12 pt-8 border-t border-[#E5E2D9] text-sm text-[#595959] leading-relaxed">
            Best Buy Incentives has supplied customer incentive programs since 1992. Program guidance reviewed by <Link to="/about" className="text-black font-bold hover:text-[#595959]">Karl Kramer, CEO</Link>.
          </div>

          <div className="mt-12 bg-[#0A0A0A] text-white p-10">
            <h2 className="font-display font-bold text-2xl lg:text-4xl leading-tight">Talk through the right program for your team.</h2>
            <Link to="/contact" data-testid="playbook-footer-cta" className="mt-8 inline-flex items-center gap-2 bg-[#FFD300] hover:bg-[#FFEA66] text-black font-bold text-sm px-6 py-3 uppercase tracking-wide">
              <span>Schedule a campaign consultation</span> <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
