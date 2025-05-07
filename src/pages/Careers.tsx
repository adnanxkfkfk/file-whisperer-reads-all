
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Briefcase, MapPin, User } from "lucide-react";

const jobListings = [
  {
    title: "Logistics Coordinator",
    location: "Mumbai, Maharashtra",
    type: "Full-time",
    description: "We're looking for an experienced Logistics Coordinator to manage day-to-day operations, coordinate with drivers, and ensure timely deliveries. The ideal candidate will have experience in transport logistics and excellent communication skills.",
    requirements: [
      "3+ years of experience in logistics or transportation",
      "Excellent communication and organizational skills",
      "Familiarity with route planning software",
      "Ability to work under pressure and solve problems quickly"
    ]
  },
  {
    title: "Truck Driver",
    location: "Multiple Locations",
    type: "Full-time",
    description: "Join our team of professional drivers to transport goods across India. We offer competitive pay, benefits, and a supportive work environment.",
    requirements: [
      "Valid commercial driving license",
      "Minimum 2 years of professional driving experience",
      "Clean driving record",
      "Knowledge of vehicle maintenance and safety procedures"
    ]
  },
  {
    title: "Operations Manager",
    location: "Mumbai, Maharashtra",
    type: "Full-time",
    description: "Lead our operations team to ensure efficient transport services, manage resources, and implement process improvements for better service delivery.",
    requirements: [
      "5+ years of experience in transport operations management",
      "Strong leadership and team management skills",
      "Excellent problem-solving abilities",
      "Knowledge of logistics management systems"
    ]
  },
  {
    title: "Customer Service Representative",
    location: "Mumbai, Maharashtra",
    type: "Full-time",
    description: "Handle customer inquiries, booking requests, and provide information about our services. You'll be the first point of contact for our valued customers.",
    requirements: [
      "Previous customer service experience",
      "Excellent communication skills in English and Hindi",
      "Basic computer skills",
      "Positive attitude and client-focused approach"
    ]
  }
];

const CareersPage = () => {
  return (
    <Layout>
      <div className="container mx-auto py-16 px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-4xl font-bold mb-6 text-transport-900">Career Opportunities</h1>
          <p className="text-lg text-transport-700">
            Join our growing team at Farhan Transport Service. We're looking for talented individuals who are passionate about logistics and transportation.
          </p>
        </div>

        <div className="bg-gradient-to-r from-transport-900 to-transport-800 text-white p-8 rounded-lg mb-16">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h2 className="text-3xl font-bold mb-4">Why Work With Us?</h2>
              <p className="mb-6 text-transport-50">
                At Farhan Transport Service, we believe our people are our greatest asset. We foster a culture of growth, respect, and innovation.
              </p>
              <ul className="space-y-3">
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-custom-green-light rounded-full"></div>
                  <span>Competitive salaries and benefits</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-custom-green-light rounded-full"></div>
                  <span>Professional development opportunities</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-custom-green-light rounded-full"></div>
                  <span>Collaborative and supportive work environment</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-custom-green-light rounded-full"></div>
                  <span>Work-life balance</span>
                </li>
              </ul>
            </div>
            <div className="flex items-center justify-center">
              <img 
                src="https://images.unsplash.com/photo-1558222218-b7b54eede3f3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80" 
                alt="Team working together" 
                className="rounded-lg shadow-lg max-h-60 object-cover"
              />
            </div>
          </div>
        </div>

        <h2 className="text-3xl font-bold mb-8 text-transport-900">Current Openings</h2>
        
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {jobListings.map((job, index) => (
            <Card key={index} className="border-transport-100 hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <CardTitle className="text-2xl text-transport-900">{job.title}</CardTitle>
                <CardDescription>
                  <div className="flex items-center gap-2 mt-2 text-transport-600">
                    <MapPin size={18} />
                    <span>{job.location}</span>
                  </div>
                  <div className="flex items-center gap-2 mt-1 text-transport-600">
                    <Briefcase size={18} />
                    <span>{job.type}</span>
                  </div>
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="mb-4 text-transport-700">{job.description}</p>
                <h4 className="font-semibold mb-2 text-transport-800">Requirements:</h4>
                <ul className="list-disc pl-5 space-y-1 mb-6 text-transport-700">
                  {job.requirements.map((req, i) => (
                    <li key={i}>{req}</li>
                  ))}
                </ul>
                <Button className="bg-transport-900 hover:bg-transport-800 text-white">
                  Apply Now
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="bg-transport-50 p-8 rounded-lg text-center">
          <h3 className="text-2xl font-bold mb-4 text-transport-900">Don't see the right position?</h3>
          <p className="mb-6 text-transport-700 max-w-2xl mx-auto">
            We're always looking for talented individuals to join our team. Send us your resume and we'll keep you in mind for future opportunities.
          </p>
          <div className="flex justify-center">
            <Button className="bg-transport-900 hover:bg-transport-800 text-white flex items-center gap-2">
              <User size={18} />
              <span>Submit Your Resume</span>
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CareersPage;
