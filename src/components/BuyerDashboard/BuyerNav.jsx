// components/BuyerDashboard/BuyerNav.jsx
import React, { useState } from 'react';
import { LayoutDashboard, ShoppingCart, ClipboardList, User, Menu } from 'lucide-react';

const navItems = [
  { key: 'overview', label: 'Overview', icon: <LayoutDashboard size={20} /> },
  { key: 'marketplace', label: 'Marketplace', icon: <ShoppingCart size={20} /> },
  { key: 'orders', label: 'My Orders', icon: <ClipboardList size={20} /> },
  { key: 'profile', label: 'Profile', icon: <User size={20} /> },
];

const BuyerNav = ({ activeTab, onTabChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex md:flex-col w-64 bg-white shadow p-4 space-y-6 min-h-screen">
        <h2 className="text-xl font-bold">Buyer Dashboard</h2>
        <ul className="space-y-2">
          {navItems.map(({ key, label, icon }) => (
            <li key={key}>
              <button
                onClick={() => onTabChange(key)}
                className={`flex items-center w-full text-left px-4 py-2 rounded-md transition hover:bg-green-100 ${
                  activeTab === key ? 'bg-green-200 font-semibold' : ''
                }`}
              >
                <span className="mr-2">{icon}</span> {label}
              </button>
            </li>
          ))}
        </ul>
      </aside>

      {/* Mobile Header */}
      <div className="md:hidden p-4 bg-white shadow flex justify-between items-center">
        <h2 className="text-lg font-bold">Buyer Dashboard</h2>
        <button onClick={() => setIsOpen(!isOpen)}>
          <Menu size={28} />
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {isOpen && (
        <div className="md:hidden bg-white shadow px-4 pt-4 pb-6 space-y-4">
          <ul className="space-y-2">
            {navItems.map(({ key, label, icon }) => (
              <li key={key}>
                <button
                  onClick={() => {
                    onTabChange(key);
                    setIsOpen(false);
                  }}
                  className={`flex items-center w-full text-left px-4 py-2 rounded-md transition hover:bg-green-100 ${
                    activeTab === key ? 'bg-green-200 font-semibold' : ''
                  }`}
                >
                  <span className="mr-2">{icon}</span> {label}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
};

export default BuyerNav;
