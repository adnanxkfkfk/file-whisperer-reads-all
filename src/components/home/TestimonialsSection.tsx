
import { Card, CardContent } from "@/components/ui/card";
import { Quote } from "lucide-react";

const testimonials = [
  {
    name: "Rajesh Sharma",
    position: "Operations Manager, Godrej & Boyce Ltd",
    image: "https://randomuser.me/api/portraits/men/45.jpg",
    quote: "Farhan Transport Service has been our logistics partner for over 3 years. Their reliability and consistent delivery schedules have significantly improved our supply chain efficiency. We can always count on them for urgent deliveries."
  },
  {
    name: "Priya Mehta",
    position: "Supply Chain Head, Malhar Enterprises",
    image: "https://randomuser.me/api/portraits/women/32.jpg",
    quote: "We've been working with Farhan Transport Service since 2021. Their team is responsive and professional, ensuring our goods are delivered safely and on time. Their domestic warehousing solutions have been invaluable for our business operations."
  },
  {
    name: "Vikram Patel",
    position: "Director, MP Logistics",
    image: "https://randomuser.me/api/portraits/men/68.jpg",
    quote: "As a logistics company ourselves, we partner with Farhan Transport Service for specialized routes. Their expertise in both domestic and international shipping has helped us expand our service offerings to clients. Highly recommended!"
  }
];

const TestimonialsSection = () => {
  return (
    <section className="py-16 bg-transport-900 text-white">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-bold mb-4 text-white">Client Testimonials</h2>
          <p className="text-gray-200 text-lg">
            Here's what our clients have to say about our transport services.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="bg-white/10 backdrop-blur-sm border-0 text-white hover:bg-white/20 transition-colors">
              <CardContent className="pt-8">
                <Quote className="h-12 w-12 text-custom-green-light mb-6 opacity-80" />
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
