import Layout from "@/components/Layout";
import { Truck, Clock, Shield, RefreshCw, Building, Home, Briefcase, Building2, HardDrive, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import BookingForm from "@/components/booking/BookingForm";

const services = [
  {
    id: "domestic-moving",
    icon: <Home className="h-12 w-12 text-transport-900" />,
    title: "Domestic Moving",
    description: "Smooth and secure home relocations with professional handling. Our team ensures your belongings are packed, transported, and delivered with the utmost care.",
    features: [
      "Complete packing and unpacking services",
      "Furniture disassembly and reassembly",
      "Secure transportation of valuables",
      "Protection of fragile items",
      "Storage solutions if needed",
      "Insurance coverage for peace of mind"
    ],
    image: "https://images.unsplash.com/photo-1600607686527-6fb886090705?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&h=600&q=80"
  },
  {
    id: "office-moving",
    icon: <Building className="h-12 w-12 text-transport-900" />,
    title: "Office Relocation",
    description: "Efficient and organized office shifting with minimal disruption. We understand that time is money for businesses, which is why our office moving service is designed for speed and efficiency.",
    features: [
      "After-hours and weekend moves",
      "IT equipment handling and setup",
      "Furniture installation services",
      "Document and file management",
      "Specialized equipment transport",
      "Project management from start to finish"
    ],
    image: "https://images.unsplash.com/photo-1497215728101-856f4ea42174?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&h=600&q=80"
  },
  {
    id: "heavy-furniture",
    icon: <Briefcase className="h-12 w-12 text-transport-900" />,
    title: "Heavy Furniture Moving",
    description: "Safe transport of bulky items. Our team is specially trained to move heavy furniture using the right equipment and techniques to prevent damage to your items and property.",
    features: [
      "Specialized lifting equipment",
      "Trained heavy-item handlers",
      "Proper padding and protection",
      "Proper placement at destination",
      "Protection of floors and doorways",
      "Experienced team for difficult items"
    ],
    image: "https://images.unsplash.com/photo-1567016432779-094069958ea5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&h=600&q=80"
  },
  {
    id: "godrej-locker",
    icon: <Shield className="h-12 w-12 text-transport-900" />,
    title: "Godrej Locker & Safe Moving",
    description: "Professional handling of heavy-duty security lockers. We have specialized equipment and training to move these sensitive items safely and securely.",
    features: [
      "Specialized heavy-duty equipment",
      "Security-focused procedures",
      "Trained safe-moving professionals",
      "Proper anchoring and installation",
      "Confidentiality and discretion",
      "Insurance for high-value items"
    ],
    image: "https://images.unsplash.com/photo-1582139329536-e7284fece509?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&h=600&q=80"
  },
  {
    id: "transportation-logistics",
    icon: <Truck className="h-12 w-12 text-transport-900" />,
    title: "Transportation & Logistics Services",
    description: "Reliable road transport solutions across India, with a strong focus in Maharashtra. Our extensive network ensures your goods reach their destination safely and on time.",
    features: [
      "Full truck load services",
      "Partial load options",
      "Interstate transportation",
      "Real-time shipment tracking",
      "Express delivery options",
      "Pan-India coverage"
    ],
    image: "https://images.unsplash.com/photo-1600706432774-bc9518b558cd?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&h=600&q=80"
  },
  {
    id: "psu-moving",
    icon: <Building2 className="h-12 w-12 text-transport-900" />,
    title: "PSU Relocation Services",
    description: "Trusted solutions for public sector unit relocations. Our upcoming service will cater specifically to the unique requirements of government and public sector organizations.",
    features: [
      "Adherence to government protocols",
      "Security clearance compliant staff",
      "Confidential document handling",
      "Asset tracking and management",
      "Compliance with procurement procedures",
      "Dedicated project coordinator"
    ],
    image: "https://images.unsplash.com/photo-1616969233918-4a0c3a912518?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&h=600&q=80",
    comingSoon: true
  },
  {
    id: "supply-chain",
    icon: <HardDrive className="h-12 w-12 text-transport-900" />,
    title: "Supply Chain Management Solutions",
    description: "End-to-end logistics and supply chain services to support growing business needs. Our forthcoming service will help businesses optimize their entire supply chain.",
    features: [
      "Inventory management solutions",
      "Distribution network optimization",
      "Warehouse management",
      "Order fulfillment services",
      "Returns processing",
      "Analytics and reporting"
    ],
    image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&h=600&q=80",
    comingSoon: true
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
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Roadway Transportation & Logistics Services</h1>
            <p className="text-xl text-gray-300 mb-8">
              Serving all over India, with a strong focus in Maharashtra. We provide reliable road transport solutions tailored to meet your specific moving needs.
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
                  <h2 className="text-3xl font-bold mb-4 text-transport-900">
                    {service.title}
                    {service.comingSoon && (
                      <span className="ml-2 text-sm font-medium bg-accent text-black px-2 py-1 rounded align-top">
                        Coming Soon
                      </span>
                    )}
                  </h2>
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
      
      {/* Booking Section */}
      <section className="py-16 bg-gray-50">
        <div className="container">
          <h2 className="text-3xl font-bold text-center mb-10 text-transport-900">Book Our Services</h2>
          <div className="max-w-3xl mx-auto">
            <BookingForm />
          </div>
        </div>
      </section>
      
      {/* CTA Banner */}
      <section className="py-16 bg-transport-900 text-white">
        <div className="container text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Transport with Confidence?</h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Contact Farhan Transport today for reliable logistics solutions tailored to your business needs.
          </p>
          <div className="flex flex-col md:flex-row justify-center gap-4 mb-8">
            <Button asChild className="bg-accent text-black hover:bg-accent/90" size="lg">
              <Link to="/contact">Contact Us</Link>
            </Button>
            <Button asChild variant="outline" className="border-white text-white hover:bg-white/10" size="lg">
              <Link to="/tracking">Track Shipment</Link>
            </Button>
          </div>
          
          {/* Contact details */}
          <div className="flex justify-center flex-wrap gap-6 mt-4">
            <div className="flex items-center gap-2 text-gray-300">
              <Mail size={16} />
              <a href="mailto:support@Farhantransportservice.com" className="hover:text-accent transition-colors">
                support@Farhantransportservice.com
              </a>
            </div>
            <div className="flex items-center gap-2 text-gray-300">
              <Mail size={16} />
              <a href="mailto:query@Farhantransportservice.com" className="hover:text-accent transition-colors">
                query@Farhantransportservice.com
              </a>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default ServicesPage;
