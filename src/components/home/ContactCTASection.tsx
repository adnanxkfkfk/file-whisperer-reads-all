
import { Button } from "@/components/ui/button";
import { PhoneCall, Mail, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const ContactCTASection = () => {
  return (
    <section className="section-padding bg-white">
      <div className="container">
        <div className="bg-transport-900 rounded-2xl overflow-hidden">
          <div className="grid md:grid-cols-2">
            {/* Left Column - Image */}
            <div className="bg-[url('https://images.unsplash.com/photo-1626807236036-33e031b2c05b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1160&q=80')] bg-cover bg-center hidden md:block">
              <div className="h-full w-full bg-transport-900/60 backdrop-blur-sm"></div>
            </div>
            
            {/* Right Column - Contact */}
            <div className="p-8 md:p-12 lg:p-16 text-white">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Transport with Trust?</h2>
              <p className="text-gray-300 mb-8">
                Contact us today to discuss your transportation needs and let us provide 
                you with a tailored logistics solution.
              </p>
              
              <div className="space-y-6 mb-8">
                <div className="flex items-center gap-4">
                  <div className="bg-white/20 p-3 rounded-full">
                    <PhoneCall className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-300">Call us at</p>
                    <p className="font-medium">+1 (555) 123-4567</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="bg-white/20 p-3 rounded-full">
                    <Mail className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-300">Email us at</p>
                    <p className="font-medium">info@farhantransport.com</p>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-4">
                <Button size="lg" asChild className="bg-accent text-black hover:bg-accent/90 font-medium">
                  <Link to="/contact">Contact Us <ArrowRight size={16} className="ml-2" /></Link>
                </Button>
                <Button size="lg" variant="outline" asChild className="border-white text-white hover:bg-white/10">
                  <Link to="/tracking">Track Shipment</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactCTASection;
