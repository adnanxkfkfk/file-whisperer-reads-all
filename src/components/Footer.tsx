
import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, Clock, Facebook, Twitter, Instagram, Linkedin, Truck } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-transport-900 text-white pt-16">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 pb-12">
          {/* Column 1 - Company Info */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Truck size={28} />
              <div>
                <h3 className="text-xl font-bold">Farhan Transport</h3>
                <p className="text-xs text-gray-300">Transport with Trust</p>
              </div>
            </div>
            <p className="text-gray-300 mb-4">
              Providing reliable transportation solutions with a commitment to excellence, safety, and customer satisfaction.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                <Linkedin size={20} />
              </a>
            </div>
          </div>

          {/* Column 2 - Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-300 hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-gray-300 hover:text-white transition-colors">
                  Our Services
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-300 hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-300 hover:text-white transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/tracking" className="text-gray-300 hover:text-white transition-colors">
                  Track Shipment
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3 - Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Information</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <MapPin className="mt-1 flex-shrink-0" size={18} />
                <span className="text-gray-300">123 Transport Avenue, Business District, City, Country</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={18} />
                <span className="text-gray-300">+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={18} />
                <span className="text-gray-300">info@farhantransport.com</span>
              </li>
              <li className="flex items-start gap-3">
                <Clock className="mt-1 flex-shrink-0" size={18} />
                <span className="text-gray-300">Mon-Fri: 8:00 AM - 6:00 PM<br />Sat: 9:00 AM - 1:00 PM</span>
              </li>
            </ul>
          </div>

          {/* Column 4 - Newsletter */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Newsletter</h4>
            <p className="text-gray-300 mb-4">
              Subscribe to our newsletter to get the latest updates and offers.
            </p>
            <form className="flex flex-col gap-2">
              <input
                type="email"
                placeholder="Your Email"
                className="px-4 py-2 bg-transport-800 text-white border border-transport-700 rounded-md focus:outline-none focus:ring-2 focus:ring-accent"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-accent text-black font-medium rounded-md hover:bg-accent/90 transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-transport-800 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center text-gray-400 text-sm">
            <p>&copy; {currentYear} Farhan Transport Service. All rights reserved.</p>
            <div className="flex gap-4 mt-2 md:mt-0">
              <Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
              <Link to="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
