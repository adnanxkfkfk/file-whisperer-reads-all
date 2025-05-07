
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

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
    { name: "Track", path: "/track" },
    { name: "Payment", path: "/payment" },
    { name: "About Us", path: "/about" },
    { name: "FAQ", path: "/faq" },
    { name: "Careers", path: "/careers" },
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
      className={`fixed top-0 w-full z-50 transition-all duration-300 backdrop-blur-sm ${
        isScrolled
          ? "bg-transport-50/80 shadow-lg py-3"
          : "bg-transparent py-4 md:py-6"
      }`}
    >
      <div className="container mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <img
            src="/logo.png"
            alt="FTS Logo"
            className="h-12 w-12 md:h-14 md:w-14 object-contain transition-transform group-hover:scale-105 duration-300"
            style={{ minWidth: "3rem" }}
          />
          <div>
            <h1 className="text-xl md:text-2xl font-bold text-transport-900">
              Farhan Transport
            </h1>
            <p className="text-xs text-accent">
              Transporting with Trust
            </p>
          </div>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          <div className="flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`text-transport-900 font-medium transition-colors relative after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-0.5 after:bottom-0 after:left-0 after:bg-accent after:origin-bottom-right after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-bottom-left ${
                  location.pathname === link.path ? "after:scale-x-100 text-accent" : ""
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>
          <Button 
            className="bg-transport-900 hover:bg-transport-800 text-transport-50 shadow-lg hover:shadow-xl transition-all duration-300"
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
        <div className="md:hidden bg-transport-50/95 backdrop-blur-sm absolute top-full left-0 right-0 shadow-lg animate-slide-down">
          <div className="container mx-auto py-4 flex flex-col">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`py-3 text-transport-900 hover:text-accent font-medium transition-colors ${
                  location.pathname === link.path ? "text-accent" : ""
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            <Button 
              className="mt-4 bg-transport-900 hover:bg-transport-800 text-transport-50"
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
