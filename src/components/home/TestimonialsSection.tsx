
import { Card, CardContent } from "@/components/ui/card";
import { Quote } from "lucide-react";

const testimonials = [
  {
    name: "Sarah Johnson",
    position: "Logistics Manager, XYZ Corp",
    image: "https://randomuser.me/api/portraits/women/45.jpg",
    quote: "Farhan Transport has been our logistics partner for over 5 years. Their reliability and attention to detail have significantly improved our supply chain efficiency."
  },
  {
    name: "Michael Chen",
    position: "Operations Director, Global Trade Ltd",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
    quote: "The level of service provided by Farhan Transport is exceptional. Their team goes above and beyond to ensure timely delivery and excellent communication throughout the process."
  },
  {
    name: "Amina Patel",
    position: "CEO, Innovative Solutions Inc",
    image: "https://randomuser.me/api/portraits/women/68.jpg",
    quote: "Since partnering with Farhan Transport, we've seen a dramatic reduction in transit times and damages. Their commitment to quality service is unmatched in the industry."
  }
];

const TestimonialsSection = () => {
  return (
    <section className="section-padding gradient-bg text-white">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="section-title text-white">What Our Clients Say</h2>
          <p className="text-gray-200 text-lg">
            Don't just take our word for it. Hear what our satisfied clients have to say about our transport services.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="bg-white/10 backdrop-blur-sm border-0 text-white hover:bg-white/20 transition-colors">
              <CardContent className="pt-8">
                <Quote className="h-12 w-12 text-accent mb-6 opacity-80" />
                <p className="mb-8 italic text-gray-200">"{testimonial.quote}"</p>
                <div className="flex items-center gap-4">
                  <img 
                    src={testimonial.image} 
                    alt={testimonial.name}
                    className="h-12 w-12 rounded-full object-cover"
                  />
                  <div>
                    <h4 className="font-semibold">{testimonial.name}</h4>
                    <p className="text-sm text-gray-300">{testimonial.position}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
