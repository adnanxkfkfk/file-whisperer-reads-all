
import { ReactNode, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import ErrorBoundary from "./ErrorBoundary";

interface LayoutProps {
  children: ReactNode;
  fullWidth?: boolean;
  className?: string;
  noFooter?: boolean;
}

const Layout = ({ children, fullWidth = false, className = "", noFooter = false }: LayoutProps) => {
  const location = useLocation();
  
  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);
  
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className={`flex-grow pt-16 ${className}`}>
        <ErrorBoundary>
          {fullWidth ? (
            children
          ) : (
            <div className="container mx-auto">
              {children}
            </div>
          )}
        </ErrorBoundary>
      </main>
      
      {!noFooter && <Footer />}
    </div>
  );
};

export default Layout;
