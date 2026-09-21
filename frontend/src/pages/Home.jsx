import Seo, { faqSchema } from "@/components/site/Seo";
import { FAQS } from "@/data/content";
import { GuidesAndTools } from "@/components/site/GuidesAndTools";
import Hero from "@/components/home/Hero";
import StatsTicker from "@/components/home/StatsTicker";
import TrustBar from "@/components/home/TrustBar";
import ProblemSection from "@/components/home/ProblemSection";
import SolutionSection from "@/components/home/SolutionSection";
import HowItWorks from "@/components/home/HowItWorks";
import BusinessTestimonials from "@/components/home/BusinessTestimonials";
import ProgramsShowcase from "@/components/home/ProgramsShowcase";
import IndustriesGrid from "@/components/home/IndustriesGrid";
import ROICalculator from "@/components/home/ROICalculator";
import CaseStudiesPreview from "@/components/home/CaseStudiesPreview";
import ConsumerTestimonials from "@/components/home/ConsumerTestimonials";
import VideoSeries from "@/components/home/VideoSeries";
import FAQ from "@/components/home/FAQ";
import FinalCTA from "@/components/home/FinalCTA";

export default function Home() {
  return (
    <div data-testid="page-home">
      <Seo
        title="Stop Discounting. Start Closing."
        description="Premium travel-incentive certificates that lift close rates 37% on average, without cutting price. Trusted by 1,200+ high-ticket sales teams since 1992."
        path="/"
        schema={faqSchema(FAQS)}
      />
      <Hero />
      <TrustBar />
      <StatsTicker />
      <div data-testid="home-stats-methodology" className="bg-[#0A0A0A]">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10 pb-6">
          <p className="text-[11px] font-mono leading-relaxed text-white/40 max-w-3xl">
            Figures are company estimates based on Best Buy Incentives program experience since 1992. Individual results vary.
          </p>
        </div>
      </div>
      <ProblemSection />
      <SolutionSection />
      <BusinessTestimonials />
      <ProgramsShowcase />
      <HowItWorks />
      <CaseStudiesPreview />
      <GuidesAndTools />
      <IndustriesGrid />
      <ROICalculator />
      <ConsumerTestimonials />
      <VideoSeries />
      <FAQ />
      <FinalCTA />
    </div>
  );
}
