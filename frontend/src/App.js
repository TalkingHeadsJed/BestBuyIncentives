import "@/App.css";
import { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { Toaster } from "sonner";
import useHydrated from "@/hooks/useHydrated";
import { pushAnalytics } from "@/lib/consultationClient";
import Header from "@/components/site/Header";
import Footer from "@/components/site/Footer";
import StickyCTA from "@/components/site/StickyCTA";
import ScrollToTop from "@/components/site/ScrollToTop";

import Home from "@/pages/Home";
import About from "@/pages/About";
import Programs from "@/pages/Programs";
import Industries from "@/pages/Industries";
import CaseStudies from "@/pages/CaseStudies";
import Resources from "@/pages/Resources";
import ResourceDetail from "@/pages/ResourceDetail";
import Contact from "@/pages/Contact";
import FAQ from "@/pages/FAQ";
import Comparison from "@/pages/Comparison";
import NotFound from "@/pages/NotFound";
import Legal from "@/pages/Legal";
import Article from "@/pages/Article";
import Articles from "@/pages/Articles";
import AuthorKarlKramer from "@/pages/AuthorKarlKramer";
import CategoryPage from "@/pages/CategoryPage";
import { Hub, CommercialPage, IndustryPage, CaseStudyPage } from "@/pages/SeoPages";
import PlaybookLanding from "@/pages/PlaybookLanding";
import GatedResourceLanding from "@/pages/GatedResourceLanding";
import SEO_PAGES from "@/data/seoPages.json";
import { ARTICLE_SLUGS } from "@/data/articles";

function App() {
  // Toaster is client-only; mount it after hydration so the prerendered markup
  // matches React's first client render exactly.
  const hydrated = useHydrated();

  // Track contextual commercial-link clicks distinctly from generic navigation.
  // Non-PII: only records page path and link destination (dataLayer convention).
  useEffect(() => {
    const onClick = (e) => {
      const a = e.target.closest && e.target.closest('a[data-analytics="contextual-commercial-link"]');
      if (!a) return;
      pushAnalytics("contextual_commercial_click", {
        page_path: window.location.pathname,
        link_destination: a.getAttribute("href") || "",
        link_text: (a.textContent || "").trim().slice(0, 80),
      });
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  return (
    <HelmetProvider>
      <div className="App">
        <BrowserRouter>
          <ScrollToTop />
          <Header />
          <main data-testid="main-content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/programs" element={<Programs />} />
              <Route path="/industries" element={<Industries />} />
              <Route path="/case-studies" element={<CaseStudies />} />
              <Route path="/resources" element={<Resources />} />
              <Route path="/resources/:slug" element={<ResourceDetail />} />
              <Route path="/articles" element={<Articles />} />
              <Route path="/authors/karl-kramer" element={<AuthorKarlKramer />} />
              <Route path="/vacation-certificates" element={<CategoryPage slug="vacation-certificates" />} />
              <Route path="/travel-certificates" element={<CategoryPage slug="travel-certificates" />} />
              <Route path="/vacation-incentives" element={<CategoryPage slug="vacation-incentives" />} />
              <Route path="/travel-incentive-programs" element={<CategoryPage slug="travel-incentive-programs" />} />
              <Route path="/sales-incentive-programs" element={<CategoryPage slug="sales-incentive-programs" />} />
              {SEO_PAGES.hubs.map((c) => (<Route key={c.path} path={c.path} element={<Hub cfg={c} />} />))}
              {SEO_PAGES.commercial.map((c) => (
                c.path === "/high-ticket-closing-playbook"
                  ? (<Route key={c.path} path={c.path} element={<PlaybookLanding cfg={c} />} />)
                  : c.gate
                    ? (<Route key={c.path} path={c.path} element={<GatedResourceLanding cfg={c} />} />)
                    : (<Route key={c.path} path={c.path} element={<CommercialPage cfg={c} />} />)
              ))}
              {SEO_PAGES.industries.map((c) => (<Route key={c.path} path={c.path} element={<IndustryPage cfg={c} />} />))}
              {SEO_PAGES.caseStudies.map((c) => (<Route key={c.path} path={c.path} element={<CaseStudyPage cfg={c} />} />))}
              <Route path="/contact" element={<Contact />} />
              <Route path="/privacy" element={<Legal type="privacy" />} />
              <Route path="/terms" element={<Legal type="terms" />} />
              <Route path="/compliance" element={<Legal type="compliance" />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/travel-incentives-vs-discounting" element={<Comparison slug="discounting" />} />
              <Route path="/travel-incentives-vs-gift-cards" element={<Comparison slug="gift-cards" />} />
              <Route path="/travel-incentives-vs-cash-rebates" element={<Comparison slug="cash-rebates" />} />
              {ARTICLE_SLUGS.map((s) => (
                <Route key={s} path={`/${s}`} element={<Article slug={s} />} />
              ))}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <StickyCTA />
          <Footer />
          {hydrated && <Toaster theme="dark" position="bottom-right" richColors />}
        </BrowserRouter>
      </div>
    </HelmetProvider>
  );
}

export default App;
