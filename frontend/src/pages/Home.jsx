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
      <Hero />
      <StatsTicker />
      <TrustBar />
      <ProblemSection />
      <SolutionSection />
      <HowItWorks />
      <BusinessTestimonials />
      <ProgramsShowcase />
      <ROICalculator />
      <IndustriesGrid />
      <CaseStudiesPreview />
      <ConsumerTestimonials />
      <VideoSeries />
      <FAQ />
      <FinalCTA />
    </div>
  );
}
