import React from 'react';
import { useParams } from 'react-router-dom';

const capitalize = (str) => {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1);
};

const Dashboard = () => {
  const { role } = useParams();

  if (!role) {
    return (
      <div className="h-screen flex items-center justify-center">
        <p className="text-red-600 text-lg font-semibold">Error: Role not specified in the URL.</p>
      </div>
    );
  }

  const renderDashboard = () => {
    switch (role.toLowerCase()) {
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
              <li>⚙️ Adjust platform settings</li>
            </ul>
          </div>
        );
      default:
        return (
          <div className="text-red-500 font-semibold">
            Unknown role: {role}
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-green-50 p-8">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-6">
        <h1 className="text-3xl font-bold text-green-700 mb-6">
          Welcome, {capitalize(role)}!
        </h1>
        {renderDashboard()}
      </div>
    </div>
  );
};

export default Dashboard;
