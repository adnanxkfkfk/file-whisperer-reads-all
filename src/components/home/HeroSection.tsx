
import { Button } from "@/components/ui/button";
import { ArrowRight, ShieldCheck, Globe, Clock, Truck } from "lucide-react";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <div className="relative bg-gradient-to-br from-transport-900 to-transport-800 text-white overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute h-full w-full bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMyNTI1MjUiIGZpbGwtb3BhY2l0eT0iMC40Ij48cGF0aCBkPSJNMzYgMzRjMC0yLjItMS44LTQtNC00cy00IDEuOC00IDQgMS44IDQgNCA0IDQtMS44IDQtNHptMC0zMGMwLTIuMi0xLjgtNC00LTRzLTQgMS44LTQgNCAxLjggNCA0IDQgNC0xLjggNC00em0wIDYwYzAtMi4yLTEuOC00LTQtNHMtNCAxLjgtNCA0IDEuOCA0IDQgNCA0LTEuOCA0LTR6Ii8+PC9nPjwvZz48L3N2Zz4=')] bg-repeat"></div>
      </div>
      
      <div className="container relative min-h-[92vh] flex items-center">
        <div className="grid md:grid-cols-2 gap-12 py-16 md:py-20">
          <div className="flex flex-col justify-center">
            <div className="animate-fade-in">
              <span className="px-4 py-2 rounded-full bg-accent/10 text-accent text-sm font-medium mb-6 inline-block">
                Trusted Transport Service in Mumbai
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
                Professional Transport & 
                <span className="bg-gradient-to-r from-accent to-blue-400 bg-clip-text text-transparent"> Logistics Solutions</span>
              </h1>
              <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-lg">
                Your reliable partner for professional transport truck, cargo, and logistics services across Maharashtra and India.
              </p>
            </div>
            
            <div className="flex flex-wrap gap-4 animate-slide-up" style={{ animationDelay: '0.2s' }}>
              <Button size="lg" asChild className="bg-accent hover:bg-accent/90 text-white">
                <Link to="/services" className="flex items-center gap-2">
                  Book Now <Truck size={18} />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="bg-transparent border-white text-white hover:bg-white/10">
                <Link to="/track" className="flex items-center gap-2">
                  Track Shipment <ArrowRight size={18} />
                </Link>
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 animate-slide-up" style={{ animationDelay: '0.4s' }}>
              <div className="flex items-center gap-3 bg-white/5 rounded-lg p-4 backdrop-blur-sm">
                <div className="bg-accent/20 p-2 rounded-full">
                  <ShieldCheck className="text-accent" size={20} />
                </div>
                <span className="text-sm md:text-base">Safe & Secure</span>
              </div>
              <div className="flex items-center gap-3 bg-white/5 rounded-lg p-4 backdrop-blur-sm">
                <div className="bg-accent/20 p-2 rounded-full">
                  <Globe className="text-accent" size={20} />
                </div>
                <span className="text-sm md:text-base">Pan India Service</span>
              </div>
              <div className="flex items-center gap-3 bg-white/5 rounded-lg p-4 backdrop-blur-sm">
                <div className="bg-accent/20 p-2 rounded-full">
                  <Clock className="text-accent" size={20} />
                </div>
                <span className="text-sm md:text-base">24/7 Support</span>
              </div>
            </div>
          </div>
          
          <div className="hidden md:flex items-center justify-center">
            <div className="relative">
              <div className="w-[450px] h-[450px] bg-gradient-to-br from-accent/30 to-blue-500/30 rounded-full absolute -top-10 -left-10 animate-pulse"></div>
              <img 
                src="/logo.png"
                alt="Farhan Transport Service FTS logo truck"
                className="relative z-10 rounded-lg object-contain h-[320px] w-[320px] bg-white/5 p-6 backdrop-blur-sm transition-transform hover:scale-105 duration-300"
              />
              <div className="absolute -bottom-10 -right-10 bg-accent p-6 rounded-lg shadow-xl z-20 backdrop-blur-sm animate-bounce">
                <h3 className="text-white font-bold text-xl">8+ Years</h3>
                <p className="text-white/90 text-sm">of Excellence</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-0 w-full">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
          <path 
            fill="#ffffff" 
            fillOpacity="1" 
            d="M0,128L60,122.7C120,117,240,107,360,128C480,149,600,203,720,197.3C840,192,960,128,1080,112C1200,96,1320,128,1380,144L1440,160L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z">
          </path>
        </svg>
      </div>
    </div>
  );
};

export default HeroSection;
