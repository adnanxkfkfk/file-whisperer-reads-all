
import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Home, ArrowLeft, Search } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    // Log the 404 error for analytics
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
    
    // Report to analytics if needed
    // reportError({ type: '404', path: location.pathname });
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-transport-50 to-white px-4">
      <div className="text-center max-w-md animate-fade-in">
        <div className="relative mb-8">
          <div className="w-32 h-32 mx-auto bg-transport-100 rounded-full flex items-center justify-center">
            <span className="text-6xl font-bold text-transport-900">404</span>
          </div>
          <div className="absolute -right-4 -bottom-4 bg-primary rounded-full p-3">
            <Search className="h-6 w-6 text-white" />
          </div>
        </div>
        
        <h1 className="text-4xl font-bold text-transport-900 mb-4">Page not found</h1>
        
        <p className="text-lg text-gray-600 mb-6">
          We couldn't find the page you're looking for. It might have been moved or doesn't exist.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild size="lg" variant="outline" className="border-transport-200 hover:bg-transport-50">
            <Link to={-1 as any} className="flex items-center gap-2">
              <ArrowLeft size={18} /> Go Back
            </Link>
          </Button>
          
          <Button asChild size="lg" className="bg-transport-900 hover:bg-transport-800">
            <Link to="/" className="flex items-center gap-2">
              <Home size={18} /> Return to Home
            </Link>
          </Button>
        </div>
      </div>
      
      <div className="mt-12 text-sm text-gray-500">
        <p>Error code: 404 | Path: {location.pathname}</p>
      </div>
    </div>
  );
};

export default NotFound;
