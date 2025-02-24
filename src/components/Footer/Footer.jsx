import React from "react";
import { Link } from "react-router-dom";
import { FaFacebookF, FaTwitter, FaInstagram } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="relative bg-gray-900 text-white py-12 px-4 backdrop-blur-lg bg-opacity-90">
      <div className="absolute inset-0 border-t-4 border-indigo-500 opacity-50"></div>

      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start space-y-8 md:space-y-0">
        <div className="flex flex-col items-center md:items-start">
          <h1 className="text-3xl font-bold text-indigo-400">
            Shree Ganesh Museum
          </h1>
          <p className="mt-4 text-gray-400 text-center md:text-left">
            Experience the divine journey of Lord Ganesha.
          </p>
        </div>

        <div className="flex flex-col md:flex-row space-y-8 md:space-y-0 md:space-x-16">
          <div>
            <h2 className="text-xl font-semibold text-indigo-400 mb-4">
              Quick Links
            </h2>
            <ul className="space-y-2">
              {["Home", "About Us", "Services", "Contact"].map(
                (item, index) => (
                  <li key={index}>
                    <Link
                      to={`#${item.toLowerCase().replace(/\s+/g, "")}`}
                      className="text-gray-400 hover:text-white transition-transform transform hover:scale-105"
                    >
                      {item}
                    </Link>
                  </li>
                )
              )}
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-indigo-400 mb-4">
              Resources
            </h2>
            <ul className="space-y-2">
              {["FAQ", "Support"].map((item, index) => (
                <li key={index}>
                  <Link
                    to={`#${item.toLowerCase()}`}
                    className="text-gray-400 hover:text-white transition-transform transform hover:scale-105"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex flex-col items-center md:items-start">
          <h2 className="text-xl font-semibold text-indigo-400 mb-4">
            Follow Us
          </h2>
          <div className="flex space-x-4">
            {[
              { icon: <FaFacebookF size={20} />, link: "https://facebook.com" },
              { icon: <FaTwitter size={20} />, link: "https://twitter.com" },
              {
                icon: <FaInstagram size={20} />,
                link: "https://instagram.com",
              },
            ].map((social, index) => (
              <Link
                key={index}
                to={social.link}
                className="text-gray-400 hover:text-white transition-transform transform hover:scale-125"
                aria-label="Social Media"
              >
                {social.icon}
              </Link>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-gray-700 mt-12 pt-6 text-center text-gray-500">
        <p>
          &copy; {new Date().getFullYear()}{" "}
          <span className="text-indigo-400">Shree Ganesh Museum</span>. All
          rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
