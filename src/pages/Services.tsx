
import Layout from "@/components/Layout";
import { Truck, Ship, Plane, Package, Warehouse, Clock, Shield, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const services = [
  {
    id: "road-freight",
    icon: <Truck className="h-12 w-12 text-transport-900" />,
    title: "Road Freight",
    description: "Our road freight services offer flexible and efficient transportation solutions across the country. With our modern fleet of trucks and experienced drivers, we ensure safe and timely delivery of your goods.",
    features: [
      "Full truckload (FTL) services",
      "Less than truckload (LTL) options",
      "Temperature-controlled transportation",
      "Real-time shipment tracking",
      "Express delivery options",
      "Nationwide coverage"
    ],
    image: "https://images.unsplash.com/photo-1600706432774-bc9518b558cd?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&h=600&q=80"
  },
  {
    id: "ocean-freight",
    icon: <Ship className="h-12 w-12 text-transport-900" />,
    title: "Ocean Freight",
    description: "Our ocean freight services connect you to global markets with reliable and cost-effective shipping solutions. We handle all aspects of sea freight logistics to ensure smooth international transportation.",
    features: [
      "FCL (Full Container Load) shipping",
      "LCL (Less than Container Load) options",
      "Port-to-port and door-to-door delivery",
      "Custom clearance assistance",
      "Container tracking services",
      "Comprehensive insurance coverage"
    ],
    image: "https://images.unsplash.com/photo-1494412651409-8963ce7935a7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&h=600&q=80"
  },
  {
    id: "air-freight",
    icon: <Plane className="h-12 w-12 text-transport-900" />,
    title: "Air Freight",
    description: "When speed is crucial, our air freight services provide the fastest transportation solution for your time-sensitive shipments. We work with leading airlines to ensure reliable and efficient air cargo services.",
    features: [
      "Express air freight services",
      "Consolidation services",
      "Door-to-airport and door-to-door options",
      "Dangerous goods handling",
      "Temperature-sensitive cargo handling",
      "Customs clearance assistance"
    ],
    image: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&h=600&q=80"
  },
  {
    id: "warehousing",
    icon: <Warehouse className="h-12 w-12 text-transport-900" />,
    title: "Warehousing & Distribution",
    description: "Our modern warehousing facilities offer secure storage solutions with advanced inventory management systems. We provide end-to-end distribution services to streamline your supply chain.",
    features: [
      "Short and long-term storage options",
      "Inventory management",
      "Order fulfillment services",
      "Cross-docking capabilities",
      "Climate-controlled storage",
      "24/7 security monitoring"
    ],
    image: "https://images.unsplash.com/photo-1553413077-190dd305871c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&h=600&q=80"
  }
];

const features = [
  {
    icon: <Clock className="h-8 w-8 text-transport-800" />,
    title: "Timely Delivery",
    description: "We understand the importance of time in logistics. Our commitment to punctuality ensures your shipments reach their destination on schedule."
  },
  {
    icon: <Shield className="h-8 w-8 text-transport-800" />,
    title: "Cargo Safety",
    description: "Your cargo's safety is our priority. We implement rigorous security measures and provide comprehensive insurance options for peace of mind."
  },
  {
    icon: <RefreshCw className="h-8 w-8 text-transport-800" />,
    title: "Flexible Solutions",
    description: "Every business has unique logistics requirements. We offer customizable solutions that adapt to your specific transportation needs."
  }
];

const ServicesPage = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-transport-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute h-full w-full bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMyNTI1MjUiIGZpbGwtb3BhY2l0eT0iMC40Ij48cGF0aCBkPSJNMzYgMzRjMC0yLjItMS44LTQtNC00cy00IDEuOC00IDQgMS44IDQgNCA0IDQtMS44IDQtNHptMC0zMGMwLTIuMi0xLjgtNC00LTRzLTQgMS44LTQgNCAxLjggNCA0IDQgNC0xLjggNC00em0wIDYwYzAtMi4yLTEuOC00LTQtNHMtNCAxLjgtNCA0IDEuOCA0IDQgNCA0LTEuOCA0LTR6Ii8+PC9nPjwvZz48L3N2Zz4=')] bg-repeat"></div>
        </div>
        
        <div className="container relative">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Our Transportation Services</h1>
            <p className="text-xl text-gray-300 mb-8">
              Comprehensive logistics solutions designed to meet your specific transportation needs with reliability and efficiency.
            </p>
          </div>
        </div>
        
        {/* Wave Separator */}
        <div className="absolute bottom-0 w-full">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
            <path fill="#ffffff" fillOpacity="1" d="M0,128L60,122.7C120,117,240,107,360,128C480,149,600,203,720,197.3C840,192,960,128,1080,112C1200,96,1320,128,1380,144L1440,160L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"></path>
          </svg>
        </div>
      </section>
      
      {/* Core Features */}
      <section className="py-16 bg-white">
        <div className="container">
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-gray-50 p-8 rounded-lg border border-gray-100 hover:shadow-lg transition-shadow">
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold mb-3 text-transport-900">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Services Detail */}
      <section className="py-16">
        <div className="container">
          <div className="space-y-24">
            {services.map((service, index) => (
              <div 
                key={service.id} 
                id={service.id}
                className={`grid md:grid-cols-2 gap-12 items-center ${
                  index % 2 === 1 ? "md:flex-row-reverse" : ""
                }`}
              >
                <div className={`order-2 ${index % 2 === 1 ? "md:order-1" : "md:order-2"}`}>
                  <img 
                    src={service.image} 
                    alt={service.title} 
                    className="rounded-lg shadow-lg w-full h-[350px] object-cover"
                  />
                </div>
                
                <div className={`order-1 ${index % 2 === 1 ? "md:order-2" : "md:order-1"}`}>
                  <div className="mb-6">{service.icon}</div>
                  <h2 className="text-3xl font-bold mb-4 text-transport-900">{service.title}</h2>
                  <p className="text-gray-700 mb-6">{service.description}</p>
                  
                  <div className="mb-8">
                    <h4 className="text-lg font-semibold mb-4 text-transport-800">Key Features:</h4>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-2">
                      {service.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-center gap-2">
                          <div className="h-5 w-5 rounded-full bg-accent/20 flex items-center justify-center">
                            <div className="h-2 w-2 rounded-full bg-accent"></div>
                          </div>
                          <span className="text-gray-700">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <Button className="bg-transport-900 hover:bg-transport-800">
                    <Link to="/contact">Get a Quote</Link>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Banner */}
      <section className="py-16 bg-transport-900 text-white">
        <div className="container text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Ship with Confidence?</h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Contact Farhan Transport today for reliable logistics solutions tailored to your business needs.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button asChild className="bg-accent text-black hover:bg-accent/90" size="lg">
              <Link to="/contact">Contact Us</Link>
            </Button>
            <Button asChild variant="outline" className="border-white text-white hover:bg-white/10" size="lg">
              <Link to="/tracking">Track Shipment</Link>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default ServicesPage;
