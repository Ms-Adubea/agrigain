import { ArrowRight, Users, TrendingUp, Leaf, ShoppingCart } from 'lucide-react';
import bgImage from "../assets/images/farm-bg.jpg"; // Replace with your image path
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <section
      className="relative bg-cover bg-center text-white"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="absolute inset-0 bg-black/70 z-0" /> {/* Overlay */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: Text Content */}
          <div>
            <h1 className="text-4xl sm:text-5xl font-bold leading-tight mb-6">
              Growing Ghana’s <br />
              Agricultural Future
            </h1>
            <p className="text-lg text-gray-300 mb-8 max-w-xl">
              Connect with farmers, invest in sustainable agriculture, and earn up to 25% ROI while supporting food security and community development across Ghana.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/signup"
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-md font-semibold text-lg flex items-center gap-2"
              >
                Start Investing
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                to="/about"
                className="border border-white text-white hover:bg-white hover:text-gray-900 px-6 py-3 rounded-md font-semibold text-lg"
              >
                Learn More
              </Link>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap gap-10 mt-12 text-white">
              <div>
                <div className="text-3xl font-bold">500+</div>
                <div className="text-sm text-gray-300">Active Farmers</div>
              </div>
              <div>
                <div className="text-3xl font-bold">25%</div>
                <div className="text-sm text-gray-300">Average ROI</div>
              </div>
              <div>
                <div className="text-3xl font-bold">€2M+</div>
                <div className="text-sm text-gray-300">Funds Deployed</div>
              </div>
            </div>
          </div>

          {/* Right: Cards */}
          <div className="grid grid-cols-2 gap-6">
            <div className="bg-white text-gray-900 p-6 rounded-lg shadow-md">
              <Users className="h-8 w-8 text-green-700 mb-4" />
              <h3 className="font-semibold text-lg">For Investors</h3>
              <p className="text-sm text-gray-600">Earn returns while supporting sustainable agriculture</p>
            </div>
            <div className="bg-white text-gray-900 p-6 rounded-lg shadow-md">
              <TrendingUp className="h-8 w-8 text-green-700 mb-4" />
              <h3 className="font-semibold text-lg">For Buyers</h3>
              <p className="text-sm text-gray-600">Source certified commodities grown to specification</p>
            </div>
            <div className="bg-white text-gray-900 p-6 rounded-lg shadow-md">
              <Leaf className="h-8 w-8 text-green-700 mb-4" />
              <h3 className="font-semibold text-lg">For Farmers</h3>
              <p className="text-sm text-gray-600">Access global markets and premium inputs</p>
            </div>
            <div className="bg-white text-gray-900 p-6 rounded-lg shadow-md">
              <ShoppingCart className="h-8 w-8 text-green-700 mb-4" />
              <h3 className="font-semibold text-lg">For Vendors</h3>
              <p className="text-sm text-gray-600">Supply tools and services to growing farms</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

