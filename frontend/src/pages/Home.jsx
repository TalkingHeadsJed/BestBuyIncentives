import Seo, { faqSchema } from "@/components/site/Seo";
import { FAQS } from "@/data/content";
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
        description="Premium travel-incentive certificates that lift close rates 37% on average — without cutting price. Trusted by 1,200+ high-ticket sales teams since 1992."
        path="/"
        schema={faqSchema(FAQS)}
      />
      <Hero />
      <TrustBar />
      <StatsTicker />
      <ProblemSection />
      <SolutionSection />
      <BusinessTestimonials />
      <ProgramsShowcase />
      <HowItWorks />
      <CaseStudiesPreview />
      <IndustriesGrid />
      <ROICalculator />
      <ConsumerTestimonials />
      <VideoSeries />
      <FAQ />
      <FinalCTA />
    </div>
  );
}
