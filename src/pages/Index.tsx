
import Layout from "@/components/Layout";
import HeroSection from "@/components/home/HeroSection";
import ServicesSection from "@/components/home/ServicesSection";
import AboutSection from "@/components/home/AboutSection";
import StatsSection from "@/components/home/StatsSection";
import ContactCTASection from "@/components/home/ContactCTASection";

const Index = () => {
  return (
    <Layout>
      <HeroSection />
      <ServicesSection />
      <AboutSection />
      <StatsSection />
      <ContactCTASection />
    </Layout>
  );
};

export default Index;
