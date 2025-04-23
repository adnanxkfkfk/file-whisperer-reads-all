import Layout from "@/components/Layout";
import { CheckCircle, TruckIcon, ShieldCheck, Users, Award, Target, Building2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const values = [
  {
    icon: <TruckIcon className="h-10 w-10 text-transport-800" />,
    title: "Reliability",
    description: "We understand that timely delivery is crucial for your business operations. Our commitment to reliability ensures your goods arrive on schedule, every time."
  },
  {
    icon: <ShieldCheck className="h-10 w-10 text-transport-800" />,
    title: "Safety",
    description: "The safety of your cargo is our top priority. We implement rigorous safety measures and provide comprehensive training to our team to ensure secure transportation."
  },
  {
    icon: <Users className="h-10 w-10 text-transport-800" />,
    title: "Customer Focus",
    description: "We put our customers at the heart of everything we do. Our dedicated team works closely with you to understand and meet your specific transportation needs."
  },
  {
    icon: <Award className="h-10 w-10 text-transport-800" />,
    title: "Excellence",
    description: "We strive for excellence in every aspect of our operations. From our modern fleet to our professional staff, we maintain the highest standards in the industry."
  }
];

const milestones = [
  {
    year: "2008",
    title: "Company Founded",
    description: "Farhan Transport was established with a vision to provide reliable and efficient transportation services."
  },
  {
    year: "2012",
    title: "Expanded Services",
    description: "Added international shipping services to our portfolio, extending our reach beyond national borders."
  },
  {
    year: "2015",
    title: "Fleet Expansion",
    description: "Significantly increased our fleet size and introduced advanced tracking technology for enhanced service quality."
  },
  {
    year: "2018",
    title: "Industry Recognition",
    description: "Received multiple industry awards for excellence in logistics and customer service."
  },
  {
    year: "2022",
    title: "Sustainability Initiative",
    description: "Launched our eco-friendly transportation program, incorporating electric vehicles and carbon offset measures."
  }
];

const subsidiaries = [
  {
    name: "MS Transport Service",
    description: "Specialized in domestic freight and express delivery solutions",
    features: [
      "Nationwide coverage",
      "Express delivery services",
      "Temperature-controlled transport",
      "Last-mile delivery solutions"
    ]
  },
  {
    name: "DS Logistics",
    description: "Expert in supply chain management and international logistics",
    features: [
      "International freight forwarding",
      "Warehouse management",
      "Supply chain optimization",
      "Customs clearance services"
    ]
  }
];

const AboutPage = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-gradient-to-br from-transport-900 to-transport-800 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute h-full w-full bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMyNTI1MjUiIGZpbGwtb3BhY2l0eT0iMC40Ij48cGF0aCBkPSJNMzYgMzRjMC0yLjItMS44LTQtNC00cy00IDEuOC00IDQgMS44IDQgNCA0IDQtMS44IDQtNHptMC0zMGMwLTIuMi0xLjgtNC00LTRzLTQgMS44LTQgNCAxLjggNCA0IDQgNC0xLjggNC00em0wIDYwYzAtMi4yLTEuOC00LTQtNHMtNCAxLjgtNCA0IDEuOCA0IDQgNCA0LTEuOCA0LTR6Ii8+PC9nPjwvZz48L3N2Zz4=')] bg-repeat"></div>
        </div>
        
        <div className="container relative">
          <div className="max-w-3xl animate-fade-in">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gradient">About Farhan Transport</h1>
            <p className="text-xl text-gray-300 mb-8 leading-relaxed">
              Farhan Transport Service (FTS) is a Vikhroli, Mumbai-based transport company established on 1st January 2017. 
              <span className="block mt-4">
                With over 8 years of experience, we have proudly served reputed clients such as Godrej &amp; Boyce Ltd, Malhar Enterprises, Loadshare Network, MP Logistics, and DK Logistics.
              </span>
            </p>
          </div>
        </div>
        
        <div className="absolute bottom-0 w-full">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
            <path fill="#F0F6FF" fillOpacity="1" d="M0,128L60,122.7C120,117,240,107,360,128C480,149,600,203,720,197.3C840,192,960,128,1080,112C1200,96,1320,128,1380,144L1440,160L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"></path>
          </svg>
        </div>
      </section>
      
      {/* Our Story Section - Enhanced with glass effect and animations */}
      <section className="py-16 bg-[#F0F6FF]">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="animate-slide-up">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-transport-900">Our Story</h2>
              <p className="text-gray-700 mb-4 leading-relaxed">
                Founded in 2008, Farhan Transport began with a single truck and a vision to transform the transportation industry with reliable, customer-focused service.
              </p>
              <div className="mt-8 glass p-6 hover-lift">
                <div className="flex items-center gap-4">
                  <img 
                    src="https://randomuser.me/api/portraits/men/75.jpg" 
                    alt="Farhan Ahmed" 
                    className="w-16 h-16 rounded-full object-cover border-4 border-transport-100"
                  />
                  <div>
                    <h4 className="font-bold text-lg text-transport-900">Farhan Ahmed</h4>
                    <p className="text-gray-600">Founder & CEO</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="relative animate-fade-in" style={{ animationDelay: "0.3s" }}>
              <div className="grid grid-cols-2 gap-4">
                <img 
                  src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?ixlib=rb-4.0.3&auto=format&fit=crop&w=774&q=80" 
                  alt="Company history" 
                  className="rounded-lg shadow-lg hover-lift w-full h-full object-cover"
                />
                <div className="space-y-4">
                  <img 
                    src="https://images.unsplash.com/photo-1570152918566-7f3b995d154d?ixlib=rb-4.0.3&auto=format&fit=crop&w=774&q=80" 
                    alt="Transport fleet" 
                    className="rounded-lg shadow-lg hover-lift w-full h-[48%] object-cover"
                  />
                  <img 
                    src="https://images.unsplash.com/photo-1623000751995-4d8c5cf08f76?ixlib=rb-4.0.3&auto=format&fit=crop&w=774&q=80" 
                    alt="Transport team" 
                    className="rounded-lg shadow-lg hover-lift w-full h-[48%] object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section - Enhanced with new design */}
      <section className="py-16 bg-[#F8F1E4]">
        <div className="container">
          <div className="text-center max-w-3xl mx-auto mb-12 animate-fade-in">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-transport-900">Our Core Values</h2>
            <p className="text-lg text-gray-600">
              These principles guide our operations and define our approach to transportation services.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div 
                key={index} 
                className="glass p-8 rounded-lg hover-lift"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="mb-6 text-transport-800">{value.icon}</div>
                <h3 className="text-xl font-bold mb-3 text-transport-900">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Vision - Enhanced with gradients */}
      <section className="py-16 bg-[#F0F6FF]">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-12">
            <div className="bg-gradient-to-br from-transport-900 to-transport-800 text-white p-8 md:p-12 rounded-lg relative overflow-hidden hover-lift animate-fade-in">
              <div className="absolute top-0 right-0 w-32 h-32 bg-transport-700 opacity-30 rounded-bl-full"></div>
              <Target className="h-14 w-14 mb-6 text-accent animate-float" />
              <h3 className="text-2xl md:text-3xl font-bold mb-4">Our Mission</h3>
              <p className="text-gray-300 mb-4 leading-relaxed">
                Our mission is to build a strong, sustainable transport business by creating a work culture that values both our customers and our team.
              </p>
            </div>
            
            <div className="glass p-8 md:p-12 rounded-lg relative overflow-hidden hover-lift animate-fade-in" style={{ animationDelay: "0.2s" }}>
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-accent opacity-20 rounded-tr-full"></div>
              <Target className="h-14 w-14 mb-6 text-transport-900 animate-float" />
              <h3 className="text-2xl md:text-3xl font-bold mb-4 text-transport-900">Our Vision</h3>
              <p className="text-gray-700 mb-4 leading-relaxed">
                Our vision is to become a trusted pan-India transportation and logistics company, delivering reliable and timely services across the country.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Company Timeline */}
      <section className="py-16 bg-gray-50">
        <div className="container">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-transport-900">Our Journey</h2>
            <p className="text-lg text-gray-600">
              Key milestones that have shaped Farhan Transport into the company it is today.
            </p>
          </div>
          
          <div className="relative">
            {/* Timeline Line */}
            <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-transport-200"></div>
            
            <div className="space-y-12">
              {milestones.map((milestone, index) => (
                <div key={index} className="relative">
                  <div className="md:grid md:grid-cols-2 md:gap-8 items-center">
                    <div className={`md:text-right ${index % 2 === 1 ? "md:order-2" : ""}`}>
                      <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100 mb-4 md:mb-0">
                        <div className="text-accent font-bold text-lg mb-2">{milestone.year}</div>
                        <h3 className="text-xl font-bold mb-2 text-transport-900">{milestone.title}</h3>
                        <p className="text-gray-600">{milestone.description}</p>
                      </div>
                    </div>
                    
                    {/* Timeline Dot */}
                    <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-8 h-8 rounded-full bg-transport-900 border-4 border-white"></div>
                    
                    <div className={`md:text-left ${index % 2 === 1 ? "md:order-1" : ""}`}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      
      {/* Team CTA - Enhanced with gradient */}
      <section className="py-16 bg-gradient-to-br from-transport-900 to-transport-800 text-white">
        <div className="container text-center animate-fade-in">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Join Our Growing Team</h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            We're always looking for talented professionals who share our values and vision.
            Discover career opportunities at Farhan Transport.
          </p>
          <Button asChild className="bg-accent hover:bg-accent/90 animate-float" size="lg">
            <Link to="/careers">View Career Opportunities</Link>
          </Button>
        </div>
      </section>
    </Layout>
  );
};

export default AboutPage;
