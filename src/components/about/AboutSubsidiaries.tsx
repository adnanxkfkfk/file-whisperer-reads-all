
import React from 'react';
import { Building2 } from 'lucide-react';

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

export const AboutSubsidiaries = () => {
  return (
    <section className="py-16 bg-[#F0F6FF]">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto mb-12 animate-fade-in">
          <h2 className="text-3xl font-bold mb-4 text-transport-900">Our Subsidiary Companies</h2>
          <p className="text-lg text-gray-600">
            Our family of specialized business units working together to provide comprehensive logistics solutions.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8">
          {subsidiaries.map((company, index) => (
            <div 
              key={index} 
              className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-all glass border border-transport-100/20 hover-lift"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <div className="flex items-start gap-4 mb-4">
                <div className="bg-transport-100 p-3 rounded-lg">
                  <Building2 className="h-7 w-7 text-transport-900" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-transport-900 mb-2">{company.name}</h3>
                  <p className="text-gray-600 mb-6">{company.description}</p>
                </div>
              </div>
              
              <ul className="space-y-3">
                {company.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center gap-3">
                    <span className="w-2 h-2 bg-accent rounded-full"></span>
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
