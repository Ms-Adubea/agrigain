// components/Admin/AdminSidebar.jsx
import React, { useState } from 'react';
import {
  Home,
  Users,
  ListOrdered,
  BarChart3,
  LogOut,
  Settings,
  Menu,
  X
} from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const navItems = [
  { label: 'Dashboard', icon: <Home size={18} />, path: '/dashboard/admin' },
  { label: 'All Users', icon: <Users size={18} />, path: '/dashboard/admin/users' },
  { label: 'Applications', icon: <ListOrdered size={18} />, path: '/dashboard/admin/applications' },
  { label: 'Projects', icon: <BarChart3 size={18} />, path: '/dashboard/admin/projects' },
];

const AdminSidebar = () => {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const isActive = (path) => location.pathname === path;

  const renderLinks = () => (
    <ul className="space-y-2">
      {navItems.map((item) => (
        <li key={item.path}>
          <Link
            to={item.path}
            className={`flex items-center gap-2 px-4 py-2 rounded transition hover:bg-green-100 text-sm font-medium ${
              isActive(item.path) ? 'bg-green-200 font-semibold' : ''
            }`}
          >
            {item.icon} {item.label}
          </Link>
        </li>
      ))}
    </ul>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex flex-col w-64 bg-white p-4 border-r min-h-screen">
        <h1 className="text-2xl font-bold mb-6 text-green-700">Agri<span className="text-black">Gain</span></h1>
        <div className="mb-6">
          <div className="bg-green-600 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold">
            U
          </div>
          <p className="mt-2 font-medium text-sm">adubea@gmail.com</p>
          <p className="text-xs text-gray-500">Admin</p>
        </div>
        {renderLinks()}
        <div className="mt-auto space-y-2">
          <button className="flex items-center gap-2 px-4 py-2 rounded hover:bg-green-100 w-full text-sm">
            <Settings size={18} /> Settings
          </button>
          <button className="flex items-center gap-2 px-4 py-2 rounded hover:bg-red-100 text-red-600 w-full text-sm">
            <LogOut size={18} /> Logout
          </button>
        </div>
      </aside>

      {/* Mobile Nav Toggle */}
      <div className="md:hidden p-2 flex items-center justify-between bg-white shadow">
        <h1 className="text-xl font-bold text-green-700">Agri<span className="text-black">Gain</span></h1>
        <button onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Sidebar */}
      {mobileOpen && (
        <div className="md:hidden fixed inset-0 bg-white z-50 p-4 space-y-4 shadow-xl">
          <div className="flex justify-between items-center">
            <div>
              <div className="bg-green-600 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold">
                U
              </div>
              <p className="mt-1 font-medium text-sm">adubea@gmail.com</p>
              <p className="text-xs text-gray-500">Admin</p>
            </div>
            <button onClick={() => setMobileOpen(false)}>
              <X size={24} />
            </button>
          </div>
          {renderLinks()}
          <div className="pt-4 space-y-2">
            <button className="flex items-center gap-2 px-4 py-2 rounded hover:bg-green-100 w-full text-sm">
              <Settings size={18} /> Settings
            </button>
            <button className="flex items-center gap-2 px-4 py-2 rounded hover:bg-red-100 text-red-600 w-full text-sm">
              <LogOut size={18} /> Logout
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default AdminSidebar;