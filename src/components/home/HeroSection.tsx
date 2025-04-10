
import { Button } from "@/components/ui/button";
import { ArrowRight, ShieldCheck, Globe, Clock } from "lucide-react";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <div className="relative bg-transport-900 text-white overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute h-full w-full bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMyNTI1MjUiIGZpbGwtb3BhY2l0eT0iMC40Ij48cGF0aCBkPSJNMzYgMzRjMC0yLjItMS44LTQtNC00cy00IDEuOC00IDQgMS44IDQgNCA0IDQtMS44IDQtNHptMC0zMGMwLTIuMi0xLjgtNC00LTRzLTQgMS44LTQgNCAxLjggNCA0IDQgNC0xLjggNC00em0wIDYwYzAtMi4yLTEuOC00LTQtNHMtNCAxLjgtNCA0IDEuOCA0IDQgNCA0LTEuOCA0LTR6Ii8+PC9nPjwvZz48L3N2Zz4=')] bg-repeat"></div>
      </div>
      
      <div className="container relative min-h-[90vh] flex items-center">
        <div className="grid md:grid-cols-2 gap-12 py-16 md:py-20">
          {/* Left Column - Text Content */}
          <div className="flex flex-col justify-center animate-slide-up">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              Transport with Trust, <br />Deliver with Excellence
            </h1>
            <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-lg">
              Reliable, efficient, and secure transportation solutions for 
              your business needs across the nation and beyond.
            </p>
            
            <div className="flex flex-wrap gap-4">
              <Button size="lg" className="bg-accent text-black hover:bg-accent/90 font-semibold">
                <Link to="/services" className="flex items-center gap-2">
                  Our Services <ArrowRight size={18} />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="text-white border-white hover:bg-white/10">
                <Link to="/contact">Get a Quote</Link>
              </Button>
            </div>
            
            {/* Trust Indicators */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-12">
              <div className="flex items-center gap-3">
                <div className="bg-accent/20 p-2 rounded-full">
                  <ShieldCheck className="text-accent" size={20} />
                </div>
                <span className="text-sm md:text-base">Safe & Secure Transport</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="bg-accent/20 p-2 rounded-full">
                  <Globe className="text-accent" size={20} />
                </div>
                <span className="text-sm md:text-base">Nationwide Coverage</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="bg-accent/20 p-2 rounded-full">
                  <Clock className="text-accent" size={20} />
                </div>
                <span className="text-sm md:text-base">24/7 Customer Support</span>
              </div>
            </div>
          </div>
          
          {/* Right Column - Image */}
          <div className="hidden md:flex items-center justify-center">
            <div className="relative">
              <div className="w-[450px] h-[450px] bg-gradient-to-br from-blue-500/30 to-purple-500/30 rounded-full absolute -top-10 -left-10 animate-pulse"></div>
              <img 
                src="https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?q=80&w=2574&auto=format&fit=crop"
                alt="Transport truck on highway" 
                className="relative z-10 rounded-lg shadow-2xl object-cover h-[400px] w-full"
              />
              <div className="absolute -bottom-10 -right-10 bg-accent p-6 rounded-lg shadow-xl z-20">
                <h3 className="text-black font-bold text-xl">15+ Years</h3>
                <p className="text-black/80 text-sm">of Transport Excellence</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Wave Separator */}
      <div className="absolute bottom-0 w-full">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
          <path 
            fill="#f8fafc" 
            fillOpacity="1" 
            d="M0,128L60,122.7C120,117,240,107,360,128C480,149,600,203,720,197.3C840,192,960,128,1080,112C1200,96,1320,128,1380,144L1440,160L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z">
          </path>
        </svg>
      </div>
    </div>
  );
};

export default HeroSection;
