import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Leaf } from "lucide-react";
import logo from "../assets/images/agrigain-no-bg.png";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Products", path: "/products" },
    { name: "Investors", path: "/investors" },
    { name: "Blog", path: "/blog" },
  ];

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            {/* <Link to="/" className="flex items-center space-x-2"> */}
              {/* <img
                src={logo}
                alt="Agrigain Logo"
                className="h-8 w-8 object-contain"
              /> */}
             <Link to="/" className="flex items-center space-x-2">
              <Leaf className="h-8 w-8 text-green-600" />
              <span className="text-2xl font-bold text-green-700">Agrigain</span>
            </Link>
            {/* </Link> */}
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`px-3 py-2 text-sm font-medium transition-colors ${
                  location.pathname === item.path
                    ? "text-primary-600 border-b-2 border-primary-600"
                    : "text-gray-700 hover:text-primary-600"
                }`}
              >
                {item.name}
              </Link>
            ))}
            <button>
              <Link to="/login">Log In</Link>
            </button>
            <button>
              <Link to="/signup">Sign Up</Link>
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 hover:text-primary-600"
            >
              {isOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`block px-3 py-2 text-base font-medium ${
                    location.pathname === item.path
                      ? "text-primary-600"
                      : "text-gray-700 hover:text-primary-600"
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </Link>
              ))}

              <div className="pt-4 space-y-2">  
                  <Link
                    to="/login"
                    className="px-4 py-2 rounded-md text-sm font-semibold text-green-600 border border-primary-600 hover:bg-primary-600 hover:text-white transition-colors"
                  >
                    Log In
                  </Link>
                  <Link
                    to="/signup"
                    className="px-4 py-2 rounded-md text-sm font-semibold text-white bg-primary-600 hover:bg-primary-700 transition-colors"
                  >
                    Sign Up
                  </Link>
                
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
