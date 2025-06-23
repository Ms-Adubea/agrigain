// components/InvestorDashboard/InvestorHeader.jsx
import React, { useState } from 'react';
import { Bell, LogOut, Mail, MapPin, Settings, User2, Contact } from 'lucide-react';
import logo from '../../assets/agrigain-logo.png'; // Replace with your logo path
import profilePic from '../../assets/profile.jpg'; // Replace with actual profile image

const InvestorHeader = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <header className="w-full flex items-center justify-between px-6 py-4 bg-white shadow relative z-40">
      <div className="flex items-center space-x-3">
        <img src={logo} alt="Agrigain Logo" className="h-8" />
      </div>
      <div className="flex items-center space-x-4">
        <Bell className="w-6 h-6 text-gray-600 cursor-pointer" />

        <div className="relative">
          <img
            src={profilePic}
            alt="Profile"
            className="w-10 h-10 rounded-full cursor-pointer"
            onClick={() => setDropdownOpen(!dropdownOpen)}
          />

          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-64 bg-white border rounded-lg shadow-xl p-4 space-y-4">
              <div className="flex items-center space-x-3">
                <img
                  src={profilePic}
                  alt="Profile"
                  className="w-10 h-10 rounded-full"
                />
                <div>
                  <p className="font-semibold">Irwin Williams</p>
                  <p className="text-sm text-gray-500">Admin</p>
                </div>
              </div>

              <hr />

              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Contact size={16} />
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

              <hr />

              <div className="space-y-2">
                <div className="flex items-center space-x-2 cursor-pointer">
                  <User2 size={16} />
                  <span>Account</span>
                </div>
                <div className="flex items-center space-x-2 cursor-pointer">
                  <Settings size={16} />
                  <span>Settings</span>
                </div>
              </div>

              <hr />

              <div className="flex items-center space-x-2 text-red-500 cursor-pointer">
                <LogOut size={16} />
                <span>Log out</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default InvestorHeader;
