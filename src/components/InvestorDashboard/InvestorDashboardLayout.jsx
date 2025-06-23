import React, { useState } from 'react';
import InvestorNav from './InvestorNav';
import { Bell, LogOut, Mail, MapPin, Settings, User2, FileText } from 'lucide-react';
import { Menu } from 'lucide-react';
import logo from '../../assets/images/agrigain.PNG'; // Replace with your actual path
import profilePic from '../../assets/images/charity-team.jpeg'; // Replace with your actual path
import { Link } from 'react-router-dom';

const InvestorDashboardLayout = ({ children, activeTab, onTabChange }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <InvestorNav activeTab={activeTab} onTabChange={onTabChange} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="flex justify-between items-center bg-white shadow px-4 py-3">
          {/* Logo */}
          
          <Link to="/" className="flex items-center space-x-2">

            <img src={logo} alt="Agrigain Logo" className="h-8 w-auto" />
            <h1 className="text-lg font-bold text-green-700 hidden md:inline">Agrigain</h1>
          </Link>

          {/* Right Side */}
          <div className="flex items-center space-x-4 relative">
            <button>
              <Bell className="h-6 w-6 text-gray-700" />
            </button>

            <div className="relative">
              <button onClick={() => setDropdownOpen(!dropdownOpen)}>
                <img
                  src={profilePic}
                  alt="Profile"
                  className="h-10 w-10 rounded-full border border-gray-300 object-cover"
                />
              </button>

              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg z-50 overflow-hidden">
                  <div className="p-4 border-b">
                    <div className="flex items-center space-x-3">
                      <img
                        src={profilePic}
                        alt="Profile"
                        className="h-12 w-12 rounded-full border object-cover"
                      />
                      <div>
                        <p className="font-semibold">Irwin Williams</p>
                        <p className="text-sm text-gray-500">Admin</p>
                      </div>
                    </div>
                  </div>

                  <div className="divide-y">
                    <div className="p-3 space-y-3">
                      <div className="flex items-center space-x-2">
                        <FileText size={16} />
                        <span>Contact</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Mail size={16} />
                        <span>email@tali.com</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <MapPin size={16} />
                        <span>Location</span>
                      </div>
                    </div>

                    <div className="p-3 space-y-3">
                      <div className="flex items-center space-x-2">
                        <User2 size={16} />
                        <span>Account</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Settings size={16} />
                        <span>Settings</span>
                      </div>
                    </div>

                    <div className="p-3">
                      <button className="flex items-center text-red-500 space-x-2 w-full">
                        <LogOut size={16} />
                        <span>Log out</span>
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-4">
          {children}
        </main>
      </div>
    </div>
  );
};

export default InvestorDashboardLayout;
