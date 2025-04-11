
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Truck, Ship, Plane, Package, ArrowRight, Building, Home, Briefcase } from "lucide-react";
import { Link } from "react-router-dom";

const services = [
  {
    icon: <Home className="h-10 w-10 text-transport-800" />,
    title: "Domestic Relocation",
    description: "Hassle-free household moves with professional handling and secure transportation of your valuables.",
    link: "/services#domestic-relocation"
  },
  {
    icon: <Truck className="h-10 w-10 text-transport-800" />,
    title: "Transportation Services",
    description: "Reliable and timely transport for various goods with real-time tracking and nationwide coverage.",
    link: "/services#transportation-services"
  },
  {
    icon: <Building className="h-10 w-10 text-transport-800" />,
    title: "Office Moving",
    description: "Efficient office relocations with minimal downtime and specialized equipment handling.",
    link: "/services#office-moving"
  },
  {
    icon: <Briefcase className="h-10 w-10 text-transport-800" />,
    title: "Heavy Furniture Moving",
    description: "Expert handling of bulky items including Godrej lockers with specialized equipment and trained staff.",
    link: "/services#heavy-furniture"
  },
];

const ServicesSection = () => {
  return (
    <section className="section-padding bg-white" id="services">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="section-title">Our Transportation Services</h2>
          <p className="section-subtitle">
            We provide comprehensive logistics solutions tailored to meet your specific transportation needs with reliability and efficiency.
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
            <Link to="/services">View All Services</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
