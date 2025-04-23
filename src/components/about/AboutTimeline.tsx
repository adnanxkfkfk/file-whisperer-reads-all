
import React from 'react';
import { Target } from 'lucide-react';

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

export const AboutTimeline = () => {
  return (
    <>
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
                      <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100 mb-4 md:mb-0 hover:shadow-lg transition-shadow">
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
    </>
  );
};
