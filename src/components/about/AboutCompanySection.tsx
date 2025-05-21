
import React from 'react';

export const AboutCompanySection = () => {
  return (
    <section className="py-16 bg-[#F0F6FF]">
      <div className="container">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="animate-slide-up">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-transport-900">Our Story</h2>
            <p className="text-gray-700 mb-4 leading-relaxed">
              Founded in 2017, Farhan Transport began with a single truck and a vision to transform the transportation industry with reliable, customer-focused service.
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
  );
};
