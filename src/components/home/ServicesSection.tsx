
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Truck, ArrowRight, Building, Home, Briefcase, Shield } from "lucide-react";
import { Link } from "react-router-dom";

const services = [
  {
    icon: <Home className="h-10 w-10 text-transport-800" />,
    title: "Domestic Moving",
    description: "Smooth and secure home relocations with professional handling and careful transport of your belongings.",
    link: "/services#domestic-moving"
  },
  {
    icon: <Building className="h-10 w-10 text-transport-800" />,
    title: "Office Relocation",
    description: "Efficient and organized office shifting with minimal disruption to your business operations.",
    link: "/services#office-moving"
  },
  {
    icon: <Briefcase className="h-10 w-10 text-transport-800" />,
    title: "Heavy Furniture Moving",
    description: "Safe transport of bulky items with specialized equipment and trained personnel.",
    link: "/services#heavy-furniture"
  },
  {
    icon: <Shield className="h-10 w-10 text-transport-800" />,
    title: "Godrej Locker & Safe Moving",
    description: "Professional handling of heavy-duty security lockers with utmost care and security measures.",
    link: "/services#godrej-locker"
  },
];

const ServicesSection = () => {
  return (
    <section className="section-padding bg-white" id="services">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="section-title">Roadway Transportation & Logistics Services</h2>
          <p className="section-subtitle">
            Serving all over India and international destinations, with a strong focus in Maharashtra. We provide reliable transport solutions tailored to meet your specific moving needs.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <Card key={index} className="border-2 border-gray-100 hover:border-transport-900/20 transition-all duration-300 hover:shadow-lg">
              <CardHeader className="pb-4">
                <div className="mb-4">{service.icon}</div>
                <CardTitle className="text-xl text-transport-900">{service.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-600 mb-6">{service.description}</CardDescription>
                <Link 
                  to={service.link}
                  className="text-transport-800 font-medium flex items-center gap-2 hover:text-transport-600 transition-colors"
                >
                  Learn More <ArrowRight size={16} />
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
        
        {/* CTA */}
        <div className="mt-16 text-center">
          <Button asChild size="lg" className="bg-transport-900 hover:bg-transport-800">
            <Link to="/booking">Book Now</Link>
          </Button>
          <p className="mt-4 text-gray-600">Fast, reliable, and secure transportation services for all your needs.</p>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
