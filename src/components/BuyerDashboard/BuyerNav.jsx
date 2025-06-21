// components/BuyerDashboard/BuyerNav.jsx
import React, { useState } from 'react';
import { LayoutDashboard, ShoppingCart, ClipboardList, User, Heart, Menu } from 'lucide-react';

const navItems = [
  { key: 'marketplace', label: 'Marketplace', icon: <ShoppingCart size={20} /> },
  { key: 'orders', label: 'My Orders', icon: <ClipboardList size={20} /> },
  { key: 'profile', label: 'Profile', icon: <User size={20} /> },
  { key: 'favorites', label: 'Favorites', icon: <Heart size={20} /> },
];

const BuyerNav = ({ activeTab, onTabChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Desktop Header Navigation */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-gray-900">Buyer Dashboard</h1>
            </div>
            
            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-8">
              {navItems.map(({ key, label, icon }) => (
                <button
                  key={key}
                  onClick={() => onTabChange(key)}
                  className={`flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                    activeTab === key 
                      ? 'text-green-600 bg-green-50' 
                      : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <span className="mr-2">{icon}</span>
                  {label}
                </button>
              ))}
            </nav>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="text-gray-500 hover:text-gray-700 p-2"
              >
                <Menu size={24} />
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden border-t bg-white">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navItems.map(({ key, label, icon }) => (
                <button
                  key={key}
                  onClick={() => {
                    onTabChange(key);
                    setIsOpen(false);
                  }}
                  className={`flex items-center w-full px-3 py-2 text-base font-medium rounded-md transition-colors ${
                    activeTab === key 
                      ? 'text-green-600 bg-green-50' 
                      : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <span className="mr-3">{icon}</span>
                  {label}
                </button>
              ))}
            </div>
          </div>
        )}
      </header>
    </>
  );
};

export default BuyerNav;
