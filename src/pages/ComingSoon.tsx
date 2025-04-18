
import { Button } from "@/components/ui/button";
import { Mail } from "lucide-react";

const ComingSoon = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-transport-900 to-transport-700">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Coming Soon
          </h1>
          <p className="text-lg md:text-xl text-white/90 mb-8">
            We're working hard to bring you the best transport and logistics solutions. Stay tuned!
          </p>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 mb-8">
            <form className="flex flex-col sm:flex-row gap-4 justify-center">
              <input
                type="email"
                placeholder="Enter your email"
                className="px-4 py-2 rounded-md bg-white/90 text-transport-900 placeholder:text-transport-900/60 focus:outline-none focus:ring-2 focus:ring-custom-green"
              />
              <Button className="bg-custom-green hover:bg-custom-green-dark text-white">
                <Mail className="mr-2 h-4 w-4" />
                Notify Me
              </Button>
            </form>
          </div>
          <p className="text-white/60 text-sm">
            © {new Date().getFullYear()} Farhan Transport. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ComingSoon;
