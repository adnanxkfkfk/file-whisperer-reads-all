
import Layout from "@/components/Layout";
import HeroSection from "@/components/home/HeroSection";
import ServicesSection from "@/components/home/ServicesSection";
import AboutSection from "@/components/home/AboutSection";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import StatsSection from "@/components/home/StatsSection";
import ContactCTASection from "@/components/home/ContactCTASection";
import { AboutSubsidiaries } from "@/components/about/AboutSubsidiaries";

const Index = () => {
  return (
    <Layout>
      <HeroSection />
      <ServicesSection />
      <AboutSection />
      <StatsSection />
      <AboutSubsidiaries />
      <TestimonialsSection />
      <ContactCTASection />
    </Layout>
  );
};

export default Index;
