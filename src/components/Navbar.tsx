import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import Auth from "./Auth";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { label: "Accueil", href: "#home" },
    { label: "Formules", href: "#formules" },
    { label: "Réservation", href: "#reservation" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <nav className="fixed w-full bg-gradient-to-r from-blue-600 to-blue-400 text-white backdrop-blur-sm z-50 shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <a
            href="#"
            className="font-heading text-2xl font-bold text-white flex items-center space-x-2"
          >
            <img
              src="/carwash-logo.png" // Remplacer par votre logo
              alt="DeustyWash"
              className="w-10 h-10"
            />
            {/*<span>DeustyWash</span> */}
          </a>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-white hover:text-yellow-300 transition-colors flex items-center space-x-1"
              >
                <span>{item.label}</span>
              </a>
            ))}
            <Auth />
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden py-4 bg-white shadow-lg">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="block py-2 text-gray-800 hover:text-primary-600 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </a>
            ))}
            <div className="mt-4">
              <Auth />
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
