import { Link } from "react-router-dom";
import { ArrowRight, ChevronRight, CheckCircle2, Download, PlayCircle } from "lucide-react";
import Seo, { breadcrumbSchema } from "@/components/site/Seo";
import { ARTICLES } from "@/data/articles";

const SITE = "https://bestbuyincentives.com";

const Crumb = ({ trail }) => (
  <nav data-testid="seo-breadcrumb" aria-label="Breadcrumb" className="flex flex-wrap items-center gap-2 text-[11px] font-mono uppercase tracking-widest text-white/50 font-bold">
    {trail.map((c, i) => (
      <span key={c.path} className="flex items-center gap-2">
        {i > 0 && <ChevronRight className="h-3 w-3" />}
        {i === trail.length - 1 ? <span className="text-[#FFD300]">{c.name}</span> : <Link to={c.path} className="hover:text-[#FFD300]">{c.name}</Link>}
      </span>
    ))}
  </nav>
);

const Cta = ({ testid, label = "Schedule a Campaign Consultation" }) => (
  <Link to="/contact" data-testid={testid} className="mt-8 inline-flex items-center gap-2 bg-[#FFD300] hover:bg-[#FFEA66] text-black font-bold text-sm px-6 py-3 uppercase tracking-wide">
    <span>{label}</span> <ArrowRight className="h-3.5 w-3.5" />
  </Link>
);

const ProofList = ({ items, heading = "Proof & supporting guides" }) =>
  items && items.length ? (
    <div className="mt-12 pt-8 border-t border-[#E5E2D9]">
      <div className="text-[11px] font-mono uppercase tracking-widest text-[#595959] font-bold mb-4">{heading}</div>
      <ul className="space-y-2">
        {items.map((r) => (
          <li key={r.to}>
            <Link to={r.to} className="inline-flex items-center gap-2 text-black font-bold hover:text-[#595959]">
              <ArrowRight className="h-3.5 w-3.5 text-[#FFD300]" /><span>{r.label}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  ) : null;

export function Hub({ cfg }) {
  const children = ARTICLES.filter((a) => a.hub === cfg.hub);
  const collection = {
    "@context": "https://schema.org", "@type": "CollectionPage",
    "@id": `${SITE}${cfg.path}#webpage`, name: cfg.title, description: cfg.description, url: `${SITE}${cfg.path}`,
    isPartOf: { "@id": `${SITE}/#website` }, inLanguage: "en-US",
    mainEntity: { "@type": "ItemList", numberOfItems: children.length, itemListElement: children.map((a, i) => ({ "@type": "ListItem", position: i + 1, url: `${SITE}/${a.slug}`, name: a.title })) },
  };
  return (
    <div data-testid={`page-hub-${cfg.hub}`} className="bg-white">
      <Seo title={cfg.title} description={cfg.description} path={cfg.path} schema={[collection, breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Sales Resources", path: "/articles" }, { name: cfg.title, path: cfg.path }])]} />
      <section className="bg-[#0A0A0A] text-white pt-32 pb-16">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
          <Crumb trail={[{ name: "Home", path: "/" }, { name: "Sales Resources", path: "/articles" }, { name: cfg.h1, path: cfg.path }]} />
          <div className="mt-6 inline-block stamp text-[10px]">Topic hub</div>
          <h1 className="font-display mt-6 text-4xl sm:text-5xl lg:text-6xl font-bold leading-[0.98] max-w-4xl">{cfg.h1}</h1>
          <p className="mt-6 text-lg text-white/70 leading-relaxed max-w-2xl">{cfg.intro}</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link to={cfg.owner.to} className="inline-flex items-center gap-2 text-black bg-[#FFD300] hover:bg-[#FFEA66] font-bold text-xs px-4 py-2 uppercase tracking-wide"><span>{cfg.owner.label}</span> <ArrowRight className="h-3 w-3" /></Link>
            <Link to={cfg.proof.to} className="inline-flex items-center gap-2 text-[#FFD300] border border-white/20 hover:border-[#FFD300] font-bold text-xs px-4 py-2 uppercase tracking-wide">{cfg.proof.label}</Link>
            {cfg.resource && (
              <Link to={cfg.resource.to} className="inline-flex items-center gap-2 text-[#FFD300] border border-white/20 hover:border-[#FFD300] font-bold text-xs px-4 py-2 uppercase tracking-wide">{cfg.resource.label}</Link>
            )}
          </div>
          <Cta testid="hub-hero-cta" />
        </div>
      </section>
      <section className="py-12 lg:py-16">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
          <div className="flex items-baseline justify-between border-b-2 border-[#0A0A0A] pb-3 mb-6">
            <h2 className="font-display text-2xl lg:text-3xl font-bold text-[#0A0A0A]">Guides in this hub</h2>
            <span className="text-[11px] font-mono uppercase tracking-widest text-[#595959] font-bold">{`${children.length} guides`}</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {children.map((a) => (
              <Link key={a.slug} to={`/${a.slug}`} data-testid={`hub-child-${a.slug}`} className="group flex flex-col border border-[#E5E2D9] bg-white p-6 hover:border-black transition-colors">
                <h3 className="font-display text-lg font-bold leading-snug text-[#0A0A0A]">{a.title}</h3>
                {a.video && (<span className="mt-2 inline-flex items-center gap-1.5 self-start bg-[#FFD300] text-black text-[10px] font-mono font-bold uppercase tracking-widest px-2 py-1"><PlayCircle className="h-3.5 w-3.5" /><span>Video</span></span>)}
                <p className="mt-2 text-sm text-[#595959] leading-relaxed flex-1">{a.excerpt}</p>
                <span className="mt-4 inline-flex items-center gap-2 text-[11px] font-mono uppercase tracking-widest text-black font-bold">Read <ArrowRight className="h-3.5 w-3.5 text-[#FFD300]" /></span>
              </Link>
            ))}
          </div>
          <div className="mt-10 bg-[#0A0A0A] text-white p-10">
            <h2 className="font-display font-bold text-2xl lg:text-4xl leading-tight max-w-3xl">Ready to put this to work on your sales floor?</h2>
            <Cta testid="hub-footer-cta" />
          </div>
        </div>
      </section>
    </div>
  );
}

function LandingShell({ cfg, testid, crumbTrail, eyebrow, schema, children }) {
  return (
    <div data-testid={testid} className="bg-white">
      <Seo title={cfg.seoTitle || cfg.title} description={cfg.description} path={cfg.path} schema={schema} />
      <section className="bg-[#0A0A0A] text-white pt-32 pb-16">
        <div className="mx-auto max-w-3xl px-6 lg:px-10">
          <Crumb trail={crumbTrail} />
          <div className="mt-6 inline-block stamp text-[10px]">{eyebrow}</div>
          <h1 className="font-display mt-6 text-4xl lg:text-6xl font-bold leading-[0.98]">{cfg.h1}</h1>
          <p className="mt-6 text-lg text-white/70 leading-relaxed">{cfg.lead}</p>
          <Cta testid="landing-hero-cta" />
        </div>
      </section>
      <section className="py-12 lg:py-16"><div className="mx-auto max-w-3xl px-6 lg:px-10">{children}</div></section>
    </div>
  );
}

const webPageSchema = (cfg, about) => ({
  "@context": "https://schema.org", "@type": "WebPage", "@id": `${SITE}${cfg.path}#webpage`,
  name: cfg.seoTitle || cfg.title, description: cfg.description, url: `${SITE}${cfg.path}`,
  isPartOf: { "@id": `${SITE}/#website` }, inLanguage: "en-US",
  ...(about && about.length ? { about: about.map((t) => ({ "@type": "Thing", name: t })) } : {}),
});

const Accountability = () => (
  <div className="mt-12 pt-8 border-t border-[#E5E2D9] text-sm text-[#595959] leading-relaxed">
    Best Buy Incentives has supplied customer incentive programs since 1992. Program guidance reviewed by <Link to="/about" className="text-black font-bold hover:text-[#595959]">Karl Kramer, CEO</Link>.
  </div>
);

export function CommercialPage({ cfg }) {
  const schema = [webPageSchema(cfg, cfg.about), breadcrumbSchema([{ name: "Home", path: "/" }, { name: cfg.h1, path: cfg.path }])];
  return (
    <LandingShell cfg={cfg} testid={`page-commercial-${cfg.path.replace(/\//g, "")}`} eyebrow="Program" schema={schema}
      crumbTrail={[{ name: "Home", path: "/" }, { name: cfg.h1, path: cfg.path }]}>
      <div className="space-y-8">
        {cfg.sections.map((s) => (
          <div key={s.h}>
            <h2 className="font-display text-2xl font-bold text-[#0A0A0A]">{s.h}</h2>
            <p className="mt-2 text-[#404040] leading-relaxed">{s.p}</p>
          </div>
        ))}
      </div>
      {cfg.download && (
        <div className="mt-10">
          <a href={cfg.download.href} download data-testid="commercial-download-cta" className="inline-flex items-center gap-2 border-2 border-black text-black hover:bg-black hover:text-white font-bold text-sm px-6 py-3 uppercase tracking-wide transition-colors">
            <Download className="h-4 w-4" /><span>{cfg.download.label}</span>
          </a>
        </div>
      )}
      <ProofList items={cfg.proof} />
      <Accountability />
      <div className="mt-12 bg-[#0A0A0A] text-white p-10">
        <h2 className="font-display font-bold text-2xl lg:text-4xl leading-tight">Talk through the right program for your team.</h2>
        <Cta testid="landing-footer-cta" />
      </div>
    </LandingShell>
  );
}

export function IndustryPage({ cfg }) {
  const isPartner = cfg.path.startsWith("/partners/");
  const parent = isPartner ? { name: "About", path: "/about" } : { name: "Industries", path: "/industries" };
  const schema = [webPageSchema(cfg, [cfg.vertical, "Sales incentive"]), breadcrumbSchema([{ name: "Home", path: "/" }, parent, { name: cfg.h1, path: cfg.path }])];
  const proof = [...cfg.articleLinks, ...(cfg.caseLink ? [cfg.caseLink] : [])];
  return (
    <LandingShell cfg={cfg} testid={`page-industry-${cfg.path.split("/").pop()}`} eyebrow={cfg.vertical} schema={schema}
      crumbTrail={[{ name: "Home", path: "/" }, parent, { name: cfg.h1, path: cfg.path }]}>
      <ul className="space-y-3">
        {cfg.points.map((p) => (
          <li key={p} className="flex items-start gap-3 text-[#404040]"><CheckCircle2 className="h-5 w-5 text-[#FFD300] shrink-0 mt-0.5" /><span>{p}</span></li>
        ))}
      </ul>
      <ProofList items={proof} heading="Relevant guides & proof" />
      <Accountability />
      <div className="mt-12 bg-[#0A0A0A] text-white p-10">
        <h2 className="font-display font-bold text-2xl lg:text-4xl leading-tight">{`See how this fits your ${cfg.vertical.toLowerCase()} sales.`}</h2>
        <Cta testid="landing-footer-cta" />
      </div>
    </LandingShell>
  );
}

export function CaseStudyPage({ cfg }) {
  const schema = [webPageSchema(cfg, [cfg.industry, "Sales incentive"]), breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Case Studies", path: "/case-studies" }, { name: cfg.h1, path: cfg.path }])];
  return (
    <div data-testid={`page-case-${cfg.path.split("/").pop()}`} className="bg-white">
      <Seo title={cfg.title} description={cfg.description} path={cfg.path} type="article" schema={schema} />
      <section className="bg-[#0A0A0A] text-white pt-32 pb-16">
        <div className="mx-auto max-w-3xl px-6 lg:px-10">
          <Crumb trail={[{ name: "Home", path: "/" }, { name: "Case Studies", path: "/case-studies" }, { name: cfg.h1, path: cfg.path }]} />
          <div className="mt-6 inline-block stamp text-[10px]">{cfg.industry}</div>
          <h1 className="font-display mt-6 text-4xl lg:text-6xl font-bold leading-[0.98]">{cfg.h1}</h1>
          <p className="mt-4 text-lg text-white/70">{cfg.company}</p>
          <Cta testid="case-hero-cta" />
        </div>
      </section>
      <section className="py-12 lg:py-16">
        <div className="mx-auto max-w-3xl px-6 lg:px-10">
          <img src={cfg.image} alt={`${cfg.industry} incentive campaign`} width="1200" height="675" className="w-full aspect-[16/9] object-cover border border-[#E5E2D9]" loading="lazy" />
          <div className="mt-8 grid md:grid-cols-2 gap-6">
            <div><div className="text-[10px] font-mono uppercase tracking-widest text-black/50 font-bold">Challenge</div><p className="mt-2 text-[#404040]">{cfg.challenge}</p></div>
            <div><div className="text-[10px] font-mono uppercase tracking-widest text-black/50 font-bold">Solution</div><p className="mt-2 text-[#404040]">{cfg.solution}</p></div>
          </div>
          <div className="mt-8 grid grid-cols-2 lg:grid-cols-4 gap-3">
            {cfg.results.map((r) => (
              <div key={r.k} className="bg-[#FFD300] p-5"><div className="text-[10px] font-mono uppercase tracking-widest text-black/70 font-bold">{r.k}</div><div className="mt-1 font-display font-bold text-black text-2xl lg:text-3xl">{r.v}</div></div>
            ))}
          </div>
          <ProofList items={cfg.related} heading="Related" />
          <div className="mt-12 bg-[#0A0A0A] text-white p-10">
            <h2 className="font-display font-bold text-2xl lg:text-4xl leading-tight">Want results like these?</h2>
            <Cta testid="case-footer-cta" />
          </div>
        </div>
      </section>
    </div>
  );
}
