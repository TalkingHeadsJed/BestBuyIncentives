import "@/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { Toaster } from "sonner";
import useHydrated from "@/hooks/useHydrated";
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

function App() {
  // Toaster is client-only; mount it after hydration so the prerendered markup
  // matches React's first client render exactly.
  const hydrated = useHydrated();

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
              <Route path="/contact" element={<Contact />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/travel-incentives-vs-discounting" element={<Comparison slug="discounting" />} />
              <Route path="/travel-incentives-vs-gift-cards" element={<Comparison slug="gift-cards" />} />
              <Route path="/travel-incentives-vs-cash-rebates" element={<Comparison slug="cash-rebates" />} />
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
