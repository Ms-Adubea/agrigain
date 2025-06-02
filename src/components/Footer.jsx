import { Link } from 'react-router-dom';
import logo from "../assets/images/agrigain.PNG";

const Footer = () => {
  return (
    <footer className="bg-green-700 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            {/* <div className="flex items-center space-x-2 mb-4">
              <Leaf className="h-8 w-8 text-primary-500" />
              <span className="text-2xl font-bold">Agrigain</span>
            </div> */}
            <div className="flex items-center">
                        <Link to="/" className="flex items-center space-x-2">
                          <img
                            src={logo}
                            alt="Agrigain Logo"
                            className="h-25 w-45 object-contain"
                          />
                         <Link to="/" className="flex items-center space-x-2">
                          {/* <Leaf className="h-8 w-8 text-green-600" /> */}
                          <span className="text-2xl font-bold text-white">Agrigain</span>
                        </Link>
                        </Link>
                      </div>
            <p className="text-gray-200 mb-4 max-w-md">
              Connecting investors, farmers, vendors, and buyers to build sustainable agricultural value chains in Ghana and beyond.
            </p>
            <p className="text-sm text-gray-300">
              10% of our profits go directly to community development projects.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/about" className="text-gray-200 hover:text-primary-400">About Us</Link></li>
              <li><Link to="/products" className="text-gray-200 hover:text-primary-400">Products</Link></li>
              <li><Link to="/investors" className="text-gray-200 hover:text-primary-400">For Investors</Link></li>
              <li><Link to="/blog" className="text-gray-200 hover:text-primary-400">Blog</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Get Started</h3>
            <ul className="space-y-2">
              <li><Link to="/signup" className="text-gray-200 hover:text-primary-400">Join as Investor</Link></li>
              <li><Link to="/signup" className="text-gray-200 hover:text-primary-400">Become a Grower</Link></li>
              <li><Link to="/signup" className="text-gray-200 hover:text-primary-400">Supply Inputs</Link></li>
              <li><Link to="/signup" className="text-gray-200 hover:text-primary-400">Buy Produce</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-300">
            © 2025 Agrigain. All rights reserved. Building sustainable agricultural futures.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;