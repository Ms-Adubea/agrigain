// components/VendorDashboard/VendorNav.jsx
import React from 'react';
import { LayoutDashboard, Package, ClipboardList, User } from 'lucide-react';

const navItems = [
  { key: 'overview', label: 'Overview', icon: <LayoutDashboard size={20} /> },
  { key: 'listings', label: 'My Listings', icon: <Package size={20} /> },
  { key: 'orders', label: 'Orders', icon: <ClipboardList size={20} /> },
  { key: 'profile', label: 'Profile', icon: <User size={20} /> },
];

const VendorNav = ({ activeTab, onTabChange }) => {
  return (
    <aside className="w-64 bg-white shadow p-4 space-y-6 hidden md:block min-h-screen">
      <h2 className="text-xl font-bold">Vendor Dashboard</h2>
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
  );
};

export default VendorNav;
