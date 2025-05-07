
import Layout from "@/components/Layout";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const faqItems = [
  {
    question: "What areas do you provide transport services in?",
    answer: "We provide transport services throughout Mumbai, Maharashtra, and nationwide across India. For international shipping, please contact our customer service for specific route information."
  },
  {
    question: "How do I track my shipment?",
    answer: "You can easily track your shipment by visiting our Track page and entering your tracking number. Alternatively, you can call our customer service line for assistance."
  },
  {
    question: "What types of vehicles do you offer?",
    answer: "We offer a wide range of vehicles including small commercial vehicles, trucks of various capacities (3.5 ton, 7.5 ton, 10 ton, etc.), refrigerated vehicles, and specialized equipment for unique transportation needs."
  },
  {
    question: "How do I request a quote for transport services?",
    answer: "You can request a quote by filling out our booking form on the Booking page, or by contacting our sales team directly via phone or email."
  },
  {
    question: "What are your payment methods?",
    answer: "We accept multiple payment methods including bank transfers, credit/debit cards, and digital payment platforms. For corporate clients, we also offer credit terms based on agreements."
  },
  {
    question: "How far in advance should I book transport services?",
    answer: "For regular deliveries, we recommend booking at least 24-48 hours in advance. For specialized equipment or during peak seasons, earlier bookings of 3-5 days are advisable."
  },
  {
    question: "Do you offer insurance for transported goods?",
    answer: "Yes, we offer transit insurance options for all shipments. Basic coverage is included in our service, and additional comprehensive coverage can be purchased based on the value of goods."
  },
  {
    question: "What if my goods are damaged during transit?",
    answer: "In the unlikely event of damage during transit, please document the damage, inform our representative immediately, and file a claim through our customer service. We have a streamlined process for handling such situations."
  },
  {
    question: "Do you handle hazardous materials?",
    answer: "Yes, we do handle certain hazardous materials with proper documentation and specialized vehicles. Please contact our operations team in advance to discuss specific requirements and regulations."
  },
  {
    question: "Can you accommodate urgent or same-day deliveries?",
    answer: "Yes, we offer express and same-day delivery services subject to vehicle availability and route feasibility. Additional charges may apply for urgent services."
  }
];

const FAQPage = () => {
  return (
    <Layout>
      <div className="container mx-auto py-16 px-4">
        <h1 className="text-4xl font-bold text-center mb-8 text-transport-900">Frequently Asked Questions</h1>
        <p className="text-lg text-center mb-10 max-w-3xl mx-auto text-transport-700">
          Find answers to common questions about our transport services. If you can't find what you're looking for, please feel free to contact our customer support team.
        </p>
        
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-6 md:p-8">
          <Accordion type="single" collapsible className="w-full">
            {faqItems.map((item, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-lg font-medium text-transport-800 hover:text-accent">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="text-transport-600">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
        
        <div className="mt-12 text-center">
          <h3 className="text-2xl font-semibold mb-3 text-transport-900">Still have questions?</h3>
          <p className="text-lg mb-6 text-transport-700">
            Our customer support team is here to help you with any inquiries.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h4 className="font-medium text-lg mb-2 text-transport-900">Call Us</h4>
              <p className="text-transport-700">+91 9769362964</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h4 className="font-medium text-lg mb-2 text-transport-900">Email Us</h4>
              <p className="text-transport-700">FarhanTransportService.com</p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default FAQPage;
