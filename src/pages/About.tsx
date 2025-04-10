
import Layout from "@/components/Layout";
import { CheckCircle, TruckIcon, ShieldCheck, Users, Award, Target } from "lucide-react";
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

const AboutPage = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-transport-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute h-full w-full bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMyNTI1MjUiIGZpbGwtb3BhY2l0eT0iMC40Ij48cGF0aCBkPSJNMzYgMzRjMC0yLjItMS44LTQtNC00cy00IDEuOC00IDQgMS44IDQgNCA0IDQtMS44IDQtNHptMC0zMGMwLTIuMi0xLjgtNC00LTRzLTQgMS44LTQgNCAxLjggNCA0IDQgNC0xLjggNC00em0wIDYwYzAtMi4yLTEuOC00LTQtNHMtNCAxLjgtNCA0IDEuOCA0IDQgNCA0LTEuOCA0LTR6Ii8+PC9nPjwvZz48L3N2Zz4=')] bg-repeat"></div>
        </div>
        
        <div className="container relative">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">About Farhan Transport</h1>
            <p className="text-xl text-gray-300 mb-8">
              Learn about our journey, values, and commitment to providing trusted transport solutions since 2008.
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
      
      {/* Our Story */}
      <section className="py-16 bg-white">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-transport-900">Our Story</h2>
              <p className="text-gray-700 mb-4">
                Founded in 2008, Farhan Transport began with a single truck and a vision to transform the transportation industry with reliable, customer-focused service. Our founder, Mr. Farhan Ahmed, recognized the need for a transportation company that truly understood and responded to customer needs.
              </p>
              <p className="text-gray-700 mb-4">
                From these humble beginnings, we've grown into a comprehensive logistics provider with a modern fleet, advanced technology, and a team of dedicated professionals. Throughout our journey, we've remained true to our core values of reliability, safety, and excellence.
              </p>
              <p className="text-gray-700 mb-4">
                Today, Farhan Transport serves clients across multiple industries, providing customized logistics solutions that help businesses optimize their supply chains and grow. Our commitment to "Transport with Trust" is reflected in everything we do, from our rigorous safety protocols to our transparent business practices.
              </p>
              <div className="mt-8">
                <div className="flex items-center gap-4">
                  <img 
                    src="https://randomuser.me/api/portraits/men/75.jpg" 
                    alt="Farhan Ahmed" 
                    className="w-16 h-16 rounded-full object-cover border-4 border-transport-100"
                  />
                  <div>
                    <h4 className="font-bold text-lg">Farhan Ahmed</h4>
                    <p className="text-gray-600">Founder & CEO</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <div className="grid grid-cols-2 gap-4">
                <img 
                  src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?ixlib=rb-4.0.3&auto=format&fit=crop&w=774&q=80" 
                  alt="Company history" 
                  className="rounded-lg shadow-md w-full h-full object-cover"
                />
                <div className="space-y-4">
                  <img 
                    src="https://images.unsplash.com/photo-1570152918566-7f3b995d154d?ixlib=rb-4.0.3&auto=format&fit=crop&w=774&q=80" 
                    alt="Transport fleet" 
                    className="rounded-lg shadow-md w-full h-[48%] object-cover"
                  />
                  <img 
                    src="https://images.unsplash.com/photo-1623000751995-4d8c5cf08f76?ixlib=rb-4.0.3&auto=format&fit=crop&w=774&q=80" 
                    alt="Transport team" 
                    className="rounded-lg shadow-md w-full h-[48%] object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Our Values */}
      <section className="py-16 bg-gray-50">
        <div className="container">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-transport-900">Our Core Values</h2>
            <p className="text-lg text-gray-600">
              These principles guide our operations and define our approach to transportation services.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow border border-gray-100">
                <div className="mb-6">{value.icon}</div>
                <h3 className="text-xl font-bold mb-3 text-transport-900">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Mission & Vision */}
      <section className="py-16 bg-white">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-12">
            <div className="bg-transport-900 text-white p-8 md:p-12 rounded-lg relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-transport-700 opacity-30 rounded-bl-full"></div>
              
              <Target className="h-14 w-14 mb-6 text-accent" />
              <h3 className="text-2xl md:text-3xl font-bold mb-4">Our Mission</h3>
              <p className="text-gray-300 mb-4">
                To provide reliable, efficient, and safe transportation solutions that exceed customer expectations and contribute to their success.
              </p>
              <p className="text-gray-300">
                We achieve this by investing in modern technology, maintaining rigorous safety standards, and employing dedicated professionals who share our commitment to excellence.
              </p>
            </div>
            
            <div className="bg-accent/10 p-8 md:p-12 rounded-lg relative overflow-hidden">
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-accent opacity-20 rounded-tr-full"></div>
              
              <Target className="h-14 w-14 mb-6 text-transport-900" />
              <h3 className="text-2xl md:text-3xl font-bold mb-4 text-transport-900">Our Vision</h3>
              <p className="text-gray-700 mb-4">
                To be the most trusted and preferred transportation partner, recognized for our reliability, innovation, and commitment to sustainable logistics practices.
              </p>
              <p className="text-gray-700">
                We strive to set industry standards for service quality, customer satisfaction, and environmental responsibility while expanding our global footprint.
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
      
      {/* Team CTA */}
      <section className="py-16 bg-transport-900 text-white">
        <div className="container text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Join Our Growing Team</h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            We're always looking for talented professionals who share our values and vision.
            Discover career opportunities at Farhan Transport.
          </p>
          <Button asChild className="bg-accent text-black hover:bg-accent/90" size="lg">
            <Link to="/careers">View Career Opportunities</Link>
          </Button>
        </div>
      </section>
    </Layout>
  );
};

export default AboutPage;
