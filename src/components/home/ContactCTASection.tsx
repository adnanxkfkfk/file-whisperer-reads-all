
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const ContactCTASection = () => {
  return (
    <section className="bg-transport-900 text-white py-16">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Ship with Farhan Transport Service?</h2>
        <p className="text-lg md:text-xl max-w-2xl mx-auto mb-10">
          Contact us today for domestic and international logistics solutions tailored to your needs.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Button asChild size="lg" variant="outline" className="bg-white text-transport-900 hover:bg-gray-200">
            <Link to="/contact">Contact Us</Link>
          </Button>
          <Button asChild size="lg" className="bg-white text-transport-900 hover:bg-gray-200 font-bold">
            <Link to="/booking">Book Service Now</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ContactCTASection;
