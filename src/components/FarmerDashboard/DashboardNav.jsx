// components/FarmerDashboard/DashboardNav.jsx

import React, { useState } from 'react';
import { Home, PlusCircle, List, ShoppingBag, Menu, X } from 'lucide-react';

const navItems = [
  { key: 'profile', label: 'Profile', icon: <Home size={20} /> },
  { key: 'add-produce', label: 'Add Produce', icon: <PlusCircle size={20} /> },
  { key: 'my-produce', label: 'My Produce', icon: <List size={20} /> },
  { key: 'marketplace', label: 'Marketplace', icon: <ShoppingBag size={20} /> },
];

const DashboardNav = ({ onTabChange, activeTab }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <>
      {/* Mobile Hamburger Button */}
      <div className="md:hidden p-4">
        <button onClick={toggleMenu} className="text-gray-700 z-50 relative">
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          onClick={toggleMenu}
          className="fixed inset-0 bg-inherit bg-opacity-50 z-30 md:hidden"
        ></div>
      )}

      {/* Sidebar for medium and up or conditional mobile */}
      <aside
        className={`bg-white shadow-md p-4 w-64 md:block fixed md:relative z-40 transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } md:translate-x-0 md:min-h-screen h-full top-0 left-0`}
      >
        <h2 className="text-xl font-semibold mb-6">Farmer Dashboard</h2>
        <ul className="space-y-2">
          {navItems.map(({ key, label, icon }) => (
            <li key={key}>
              <button
                onClick={() => {
                  onTabChange(key);
                  setIsOpen(false);
                }}
                className={`flex items-center w-full text-left px-4 py-2 rounded-md hover:bg-green-100 transition ${
                  activeTab === key ? 'bg-green-200 font-semibold' : ''
                }`}
              >
                <span className="mr-2">{icon}</span> {label}
              </button>
            </li>
          ))}
        </ul>
      </aside>
    </>
  );
};

export default DashboardNav;
