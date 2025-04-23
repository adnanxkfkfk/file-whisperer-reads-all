
import React from 'react';
import { TruckIcon, ShieldCheck, Users, Award } from 'lucide-react';

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

export const AboutValues = () => {
  return (
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
  );
};
