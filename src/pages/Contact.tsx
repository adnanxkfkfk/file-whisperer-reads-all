import Layout from "@/components/Layout";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { MapPin, Phone, Mail, Clock, Send } from "lucide-react";

const ContactPage = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    serviceType: "road-freight",
    message: "",
    consent: false
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRadioChange = (value: string) => {
    setFormData((prev) => ({ ...prev, serviceType: value }));
  };

  const handleCheckboxChange = (checked: boolean) => {
    setFormData((prev) => ({ ...prev, consent: checked }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      console.log("Form submitted:", formData);
      toast({
        title: "Message Sent!",
        description: "Thank you for contacting us. We'll get back to you shortly.",
        duration: 5000,
      });
      
      // Reset form
      setFormData({
        name: "",
        email: "",
        phone: "",
        company: "",
        serviceType: "road-freight",
        message: "",
        consent: false
      });
      
      setIsSubmitting(false);
    }, 1500);
  };

  const contactInfo = [
    {
      icon: <MapPin className="h-6 w-6 text-transport-800" />,
      title: "Our Location",
      content: "B-104, Solitaire, mira bhayander road, opp. solitaire building, Mumbai-400101"
    },
    {
      icon: <Phone className="h-6 w-6 text-transport-800" />,
      title: "Contact Numbers",
      content: "WhatsApp: +91 8097801972\nEnquiry: +91 9769362964"
    },
    {
      icon: <Mail className="h-6 w-6 text-transport-800" />,
      title: "Email Address",
      content: "info@farhantransport.com"
    },
    {
      icon: <Clock className="h-6 w-6 text-transport-800" />,
      title: "Business Hours",
      content: "Monday-Friday: 8:00 AM - 6:00 PM\nSaturday: 9:00 AM - 1:00 PM"
    }
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-transport-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute h-full w-full bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMyNTI1MjUiIGZpbGwtb3BhY2l0eT0iMC40Ij48cGF0aCBkPSJNMzYgMzRjMC0yLjItMS44LTQtNC00cy00IDEuOC00IDQgMS44IDQgNCA0IDQtMS44IDQtNHptMC0zMGMwLTIuMi0xLjgtNC00LTRzLTQgMS44LTQgNCAxLjggNCA0IDQgNC0xLjggNC00em0wIDYwYzAtMi4yLTEuOC00LTQtNHMtNCAxLjgtNCA0IDEuOCA0IDQgNCA0LTEuOCA0LTR6Ii8+PC9nPjwvZz48L3N2Zz4=')] bg-repeat"></div>
        </div>
        
        <div className="container relative">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Contact Us</h1>
            <p className="text-xl text-gray-300 mb-8">
              Get in touch with our team for transportation solutions tailored to your business needs.
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
      
      {/* Contact Information */}
      <section className="py-16 bg-white">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {contactInfo.map((item, index) => (
              <div key={index} className="bg-gray-50 p-6 rounded-lg border border-gray-100 hover:shadow-md transition-shadow">
                <div className="mb-4 bg-transport-100 w-14 h-14 flex items-center justify-center rounded-full">
                  {item.icon}
                </div>
                <h3 className="text-lg font-semibold mb-2 text-transport-900">{item.title}</h3>
                <p className="text-gray-700 whitespace-pre-line">{item.content}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Contact Form & Map */}
      <section className="py-16 bg-gray-50">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="bg-white p-8 rounded-lg shadow-md">
              <h2 className="text-2xl font-bold mb-6 text-transport-900">Send Us a Message</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name*</Label>
                    <Input 
                      id="name" 
                      name="name" 
                      value={formData.name} 
                      onChange={handleChange} 
                      placeholder="Your full name" 
                      required 
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address*</Label>
                    <Input 
                      id="email" 
                      name="email" 
                      type="email" 
                      value={formData.email} 
                      onChange={handleChange} 
                      placeholder="Your email address" 
                      required 
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input 
                      id="phone" 
                      name="phone" 
                      value={formData.phone} 
                      onChange={handleChange} 
                      placeholder="Your phone number" 
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="company">Company Name</Label>
                    <Input 
                      id="company" 
                      name="company" 
                      value={formData.company} 
                      onChange={handleChange} 
                      placeholder="Your company name" 
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label>Service Type*</Label>
                  <RadioGroup defaultValue="road-freight" value={formData.serviceType} onValueChange={handleRadioChange}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="road-freight" id="road-freight" />
                        <Label htmlFor="road-freight">Road Freight</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="ocean-freight" id="ocean-freight" />
                        <Label htmlFor="ocean-freight">Ocean Freight</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="air-freight" id="air-freight" />
                        <Label htmlFor="air-freight">Air Freight</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="warehousing" id="warehousing" />
                        <Label htmlFor="warehousing">Warehousing</Label>
                      </div>
                    </div>
                  </RadioGroup>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="message">Message*</Label>
                  <Textarea 
                    id="message" 
                    name="message" 
                    value={formData.message} 
                    onChange={handleChange} 
                    placeholder="Please provide details about your transportation needs" 
                    rows={5} 
                    required 
                  />
                </div>
                
                <div className="flex items-start space-x-2">
                  <Checkbox
                    id="consent"
                    checked={formData.consent}
                    onCheckedChange={handleCheckboxChange}
                  />
                  <div className="grid gap-1.5 leading-none">
                    <Label htmlFor="consent" className="text-sm text-gray-500">
                      I consent to Farhan Transport processing my data in accordance with the Privacy Policy.
                    </Label>
                  </div>
                </div>
                
                <Button 
                  type="submit" 
                  className="bg-transport-900 hover:bg-transport-800 w-full sm:w-auto" 
                  disabled={isSubmitting || !formData.consent}
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-2">
                      <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></div>
                      Sending...
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      <Send size={16} />
                      Send Message
                    </span>
                  )}
                </Button>
              </form>
            </div>
            
            {/* Map */}
            <div className="h-[500px] md:h-auto rounded-lg overflow-hidden">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3767.4812424460245!2d72.84855027499707!3d19.222427982012733!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7b0d42c95bdf9%3A0xf116125392e7a157!2sB-104%2C%20Mira%20Bhayandar%20Rd%2C%20opposite%20Solitaire%20Building%2C%20Mumbai%2C%20Maharashtra%20400101!5e0!3m2!1sen!2sin!4v1708481234567!5m2!1sen!2sin"
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen={true} 
                loading="lazy"
                title="Company Location Map"
                className="rounded-lg shadow-md" 
              ></iframe>
            </div>
          </div>
        </div>
      </section>
      
      {/* FAQ CTA */}
      <section className="py-16 bg-transport-900 text-white">
        <div className="container text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Have More Questions?</h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Check our comprehensive FAQ section for answers to commonly asked questions about our transportation services.
          </p>
          <Button asChild className="bg-accent text-black hover:bg-accent/90" size="lg">
            <a href="#faq">View FAQ</a>
          </Button>
        </div>
      </section>
    </Layout>
  );
};

export default ContactPage;
