import React from "react";
import {
  MapPin,
  Phone,
  Mail,
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  Store,
  Megaphone,
  FileText,
  Gift,
  HelpCircle,
} from "lucide-react";

const Footer = () => {
  return (
      <footer className="bg-[#172337] text-white py-10">
        <div className="max-w-7xl mx-auto px-4">
          {/* Footer Grid */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6 border-b border-gray-600 pb-6">
            {/* About Section */}
            <div>
              <h2 className="text-gray-300 font-semibold mb-4">ABOUT</h2>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <a href="#" className="hover:text-white">
                    Contact Us
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Careers
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Press
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Corporate Information
                  </a>
                </li>
              </ul>
            </div>

            {/* Help Section */}
            <div>
              <h2 className="text-gray-300 font-semibold mb-4">HELP</h2>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <a href="/payments-policy" className="hover:text-white">
                    Payments
                  </a>
                </li>
                <li>
                  <a href="/shipping-policy" className="hover:text-white">
                    Shipping
                  </a>
                </li>
                <li>
                  <a href="/cancellation-refund-policy" className="hover:text-white">
                    Cancellation & Returns
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    FAQ
                  </a>
                </li>
              </ul>
            </div>

            {/* Consumer Policy Section */}
            <div>
              <h2 className="text-gray-300 font-semibold mb-4">CONSUMER POLICY</h2>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <a href="/cancellation-refund-policy" className="hover:text-white">
                    Cancellation & Returns
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Terms Of Use
                  </a>
                </li>
                <li>
                  <a href="/privacy-policy" className="hover:text-white">
                    Privacy
                  </a>
                </li>
                <li>
                  <a href="/shipping-policy" className="hover:text-white">
                    Shipping and Delivery Policy
                  </a>
                </li>
                <li>
                  <a href="/contact_us" className="hover:text-white">
                    Grievance Redressal
                  </a>
                </li>
              </ul>
            </div>

            {/* Address Section */}
            <div>
              <h2 className="text-gray-300 font-semibold mb-4">ADDRESS</h2>
              <p className="flex items-center space-x-2 text-sm text-gray-400">
                <MapPin size={18} className="text-gray-400" />
                <span>Shree Ganesh Museum, Pune, India</span>
              </p>
            </div>

            {/* Contact Section */}
            <div>
              <h2 className="text-gray-300 font-semibold mb-4">CONTACT</h2>
              <p className="flex items-center space-x-2 text-sm text-gray-400">
                <Phone size={18} className="text-gray-400" />
                <span>+91 8805419693</span>
              </p>
              <p className="flex items-center space-x-2 text-sm text-gray-400 mt-2">
                <Mail size={18} className="text-gray-400" />
                <span>santoshbhaskal2127@gmail.com</span>
              </p>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="flex flex-col md:flex-row items-center justify-between text-gray-400 text-sm pt-6">
            {/* Left Links */}
            <div className="flex space-x-6">


              <a
                  href="/terms-and-conditions"
                  className="flex items-center space-x-2 hover:text-white">
                <FileText size={18} className="text-gray-400" />
                <span>Terms & Conditions</span>
              </a>
              <a href="#" className="flex items-center space-x-2 hover:text-white">
                <HelpCircle size={18} className="text-gray-400" />
                <span>Help Center</span>
              </a>
            </div>

            {/* Copyright */}
            <p className="mt-4 md:mt-0">&copy; 2025 Shree Ganesh Museum</p>

            {/* Social Icons */}
            <div className="flex space-x-4 mt-4 md:mt-0">
              <a href="#" className="text-gray-400 hover:text-white">
                <Facebook size={22} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <Twitter size={22} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <Instagram size={22} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <Youtube size={22} />
              </a>
            </div>
          </div>
        </div>
      </footer>
  );
};

export default Footer;
