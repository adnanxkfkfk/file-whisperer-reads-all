
import Layout from "@/components/Layout";
import { CheckCircle, TruckIcon, ShieldCheck, Users, Award, Target, Building2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { AboutCompanySection } from "@/components/about/AboutCompanySection";
import { AboutValues } from "@/components/about/AboutValues";
import { AboutTimeline } from "@/components/about/AboutTimeline";
import { AboutSubsidiaries } from "@/components/about/AboutSubsidiaries";

const AboutPage = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-gradient-to-br from-transport-900 to-transport-800 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute h-full w-full bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMyNTI1MjUiIGZpbGwtb3BhY2l0eT0iMC40Ij48cGF0aCBkPSJNMzYgMzRjMC0yLjItMS44LTQtNC00cy00IDEuOC00IDQgMS44IDQgNCA0IDQtMS44IDQtNHptMC0zMGMwLTIuMi0xLjgtNC00LTRzLTQgMS44LTQgNCAxLjggNCA0IDQgNC0xLjggNC00em0wIDYwYzAtMi4yLTEuOC00LTQtNHMtNCAxLjgtNCA0IDEuOCA0IDQgNCA0LTEuOCA0LTR6Ii8+PC9nPjwvZz48L3N2Zz4=')] bg-repeat"></div>
        </div>
        
        <div className="container relative">
          <div className="max-w-3xl animate-fade-in">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gradient">About Farhan Transport</h1>
            <p className="text-xl text-gray-300 mb-8 leading-relaxed">
              Farhan Transport Service (FTS) is a Vikhroli, Mumbai-based transport company established on 1st January 2017. 
              <span className="block mt-4">
                With over 8 years of experience, we have proudly served reputed clients such as Godrej &amp; Boyce Ltd, Malhar Enterprises, Loadshare Network, MP Logistics, and DK Logistics.
              </span>
            </p>
          </div>
        </div>
        
        <div className="absolute bottom-0 w-full">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
            <path fill="#F0F6FF" fillOpacity="1" d="M0,128L60,122.7C120,117,240,107,360,128C480,149,600,203,720,197.3C840,192,960,128,1080,112C1200,96,1320,128,1380,144L1440,160L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"></path>
          </svg>
        </div>
      </section>
      
      <AboutCompanySection />
      <AboutValues />
      <AboutTimeline />
      <AboutSubsidiaries />
      
      {/* Team CTA - Enhanced with gradient */}
      <section className="py-16 bg-gradient-to-br from-transport-900 to-transport-800 text-white">
        <div className="container text-center animate-fade-in">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Join Our Growing Team</h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            We're always looking for talented professionals who share our values and vision.
            Discover career opportunities at Farhan Transport.
          </p>
          <Button asChild className="bg-accent hover:bg-accent/90 animate-float" size="lg">
            <Link to="/careers">View Career Opportunities</Link>
          </Button>
        </div>
      </section>
    </Layout>
  );
};

export default AboutPage;
