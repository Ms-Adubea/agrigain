import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const capitalize = (str) => {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1);
};

const Dashboard = () => {
  const { role } = useParams();
  const navigate = useNavigate();
  const [userRole, setUserRole] = useState(role);

  useEffect(() => {
    // If no role in URL, try to get it from localStorage or redirect to login
    if (!role) {
      const token = localStorage.getItem('token');
      if (!token) {
        // No token, redirect to login
        navigate('/login');
        return;
      }
      
      // You might want to decode the token or make an API call to get user info
      // For now, we'll show a generic dashboard
      setUserRole('user');
    } else {
      setUserRole(role);
    }
  }, [role, navigate]);

  const renderDashboard = () => {
    switch (userRole?.toLowerCase()) {
      case 'investor':
        return (
          <div>
            <h2 className="text-2xl font-bold mb-4">Investor Dashboard</h2>
            <ul className="space-y-2 text-gray-700">
              <li>📊 View funded projects</li>
              <li>💼 Monitor returns</li>
              <li>📈 Track ROI</li>
              <li>💬 Contact project managers</li>
            </ul>
          </div>
        );
      case 'grower':
        return (
          <div>
            <h2 className="text-2xl font-bold mb-4">Grower Dashboard</h2>
            <ul className="space-y-2 text-gray-700">
              <li>🌱 Manage crops</li>
              <li>📥 Access inputs</li>
              <li>🧑‍🏫 Training resources</li>
              <li>📦 Link to buyers</li>
            </ul>
          </div>
        );
      case 'buyer':
        return (
          <div>
            <h2 className="text-2xl font-bold mb-4">Buyer Dashboard</h2>
            <ul className="space-y-2 text-gray-700">
              <li>🛒 Browse produce</li>
              <li>🔍 Filter by category or region</li>
              <li>📦 Track orders</li>
              <li>🤝 Rate sellers</li>
            </ul>
          </div>
        );
      case 'vendor':
        return (
          <div>
            <h2 className="text-2xl font-bold mb-4">Vendor Dashboard</h2>
            <ul className="space-y-2 text-gray-700">
              <li>📤 List tools and services</li>
              <li>📈 Track orders</li>
              <li>💬 Communicate with growers</li>
            </ul>
          </div>
        );
      case 'admin':
        return (
          <div>
            <h2 className="text-2xl font-bold mb-4">Admin Dashboard</h2>
            <ul className="space-y-2 text-gray-700">
              <li>👥 Manage all users</li>
              <li>📊 View platform analytics</li>
              <li>🚨 Handle reports and requests</li>
              <li>⚙️ Set platform settings</li>
            </ul>
          </div>
        );
      case 'user':
        return (
          <div>
            <h2 className="text-2xl font-bold mb-4">Dashboard</h2>
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
              <p className="text-yellow-800">
                Welcome! Your role hasn't been determined yet. Please contact support if you need assistance.
              </p>
            </div>
          </div>
        );
      default:
        return (
          <div className="text-red-500 font-semibold">
            Unknown role: {userRole}
          </div>
        );
    }
  };

  // Show loading state while determining role
  if (!userRole) {
    return (
      <div className="min-h-screen bg-green-50 p-8 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-green-50 p-8">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-6">
        <h1 className="text-3xl font-bold text-green-700 mb-6">
          Welcome, {capitalize(userRole)}!
        </h1>
        {renderDashboard()}
      </div>
    </div>
  );
};

export default Dashboard;