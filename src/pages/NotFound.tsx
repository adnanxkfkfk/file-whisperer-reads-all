
import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-transport-50 to-white">
      <div className="text-center px-4">
        <h1 className="text-6xl font-bold text-transport-900 mb-4">404</h1>
        <p className="text-xl text-gray-600 mb-6">Oops! Page not found</p>
        <p className="text-gray-500 mb-8">
          The page you are looking for might have been removed or is temporarily unavailable.
        </p>
        <Button asChild size="lg" className="bg-transport-900 hover:bg-transport-800">
          <Link to="/" className="flex items-center gap-2">
            <Home size={18} /> Return to Home
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
