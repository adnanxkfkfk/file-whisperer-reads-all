import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, Truck } from "lucide-react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Services", path: "/services" },
    { name: "About Us", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  const handleBookingClick = () => {
    if (location.pathname === '/services') {
      const bookingSection = document.getElementById('booking-section');
      if (bookingSection) {
        bookingSection.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      window.location.href = '/services#booking-section';
    }
  };

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white shadow-md py-3"
          : "bg-transparent py-4 md:py-6"
      }`}
    >
      <div className="container mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <Truck size={32} className="text-transport-900" />
          <div>
            <h1 className="text-xl md:text-2xl font-bold text-transport-900">
              Farhan Transport
            </h1>
            <p className="text-xs text-transport-700 -mt-1">
              Transport with Trust
            </p>
          </div>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          <div className="flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className="text-transport-900 hover:text-transport-700 font-medium transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </div>
          <Button 
            className="bg-transport-900 hover:bg-transport-800 text-white"
            onClick={handleBookingClick}
          >
            Book Now
          </Button>
        </div>

        <button
          className="md:hidden text-transport-900"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {isMenuOpen && (
        <div className="md:hidden bg-white absolute top-full left-0 right-0 shadow-md animate-fade-in">
          <div className="container mx-auto py-4 flex flex-col">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className="py-3 text-transport-900 hover:text-transport-700 font-medium transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            <Button 
              className="mt-4 bg-transport-900 hover:bg-transport-800 text-white"
              onClick={() => {
                setIsMenuOpen(false);
                handleBookingClick();
              }}
            >
              Book Now
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
