
import { Button } from "@/components/ui/button";
import { CheckCircle, Building2 } from "lucide-react";
import { Link } from "react-router-dom";

const features = [
  "Highly trained and professional drivers",
  "Modern fleet with advanced tracking technology",
  "Commitment to safety and compliance",
  "Eco-friendly transportation practices",
  "Customized logistics solutions",
  "Transparent pricing with no hidden fees"
];

const subsidiaries = [
  {
    name: "MS Transport Service",
    description: "Specialized in domestic freight and express delivery solutions across Mumbai, Maharashtra, and India."
  },
  {
    name: "DS Logistics",
    description: "Expert in supply chain management and international logistics solutions for Maharashtra business growth."
  }
];

const AboutSection = () => {
  return (
    <section className="section-padding bg-gray-50">
      <div className="container">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left Column - Image */}
          <div className="relative">
            <div className="grid grid-cols-2 gap-4">
              <img
                src="https://images.unsplash.com/photo-1562078809-77187a7eb124?ixlib=rb-4.0.3&auto=format&fit=crop&w=774&h=900&q=80"
                alt="MS Transport Service Mumbai warehouse"
                className="rounded-lg object-cover w-full h-full shadow-md"
              />
              <div className="space-y-4">
                <img
                  src="https://images.unsplash.com/photo-1600706432774-bc9518b558cd?ixlib=rb-4.0.3&auto=format&fit=crop&w=774&h=450&q=80"
                  alt="Farhan Transport Service truck Maharashtra"
                  className="rounded-lg object-cover w-full h-[48%] shadow-md"
                />
                <img
                  src="https://images.unsplash.com/photo-1587293852726-70cdb56c2866?ixlib=rb-4.0.3&auto=format&fit=crop&w=774&h=450&q=80"
                  alt="DS Logistics and transport planning"
                  className="rounded-lg object-cover w-full h-[48%] shadow-md"
                />
              </div>
            </div>
            <div className="absolute -bottom-6 -right-6 bg-transport-900 text-white p-6 rounded-lg shadow-xl hidden md:block">
              <div className="text-4xl font-bold">200+</div>
              <p className="text-sm">Vehicles in our fleet</p>
            </div>
          </div>
          
          {/* Right Column - Text */}
          <div>
            <h2 className="section-title mb-4">About Farhan Transport Service – Mumbai, Maharashtra</h2>
            <p className="text-lg text-gray-700 mb-6">
              At Farhan Transport Service, we deliver transport and logistics excellence in Mumbai and Maharashtra.
              Since 2008, our experienced team has served businesses and individuals with transport truck solutions, safety, and reliability.
            </p>
            
            {/* Subsidiary Companies */}
            <div className="mb-8">
              <h3 className="text-xl font-bold text-transport-900 mb-4">Our Subsidiary Companies</h3>
              <div className="space-y-4">
                {subsidiaries.map((subsidiary, index) => (
                  <div key={index} className="flex items-start gap-3 bg-white p-4 rounded-lg shadow-sm">
                    <Building2 className="text-transport-700 flex-shrink-0 mt-1" size={20} />
                    <div>
                      <h4 className="font-semibold text-transport-900">{subsidiary.name}</h4>
                      <p className="text-sm text-gray-600">{subsidiary.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-3 mb-8">
              {features.map((feature, index) => (
                <div key={index} className="flex items-center gap-2">
                  <CheckCircle size={20} className="text-transport-700 flex-shrink-0" />
                  <span className="text-gray-700">{feature}</span>
                </div>
              ))}
            </div>
            
            <Button asChild className="bg-transport-900 hover:bg-transport-800">
              <Link to="/about">Learn More About Us</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;

