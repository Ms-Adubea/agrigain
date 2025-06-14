// components/FarmerDashboard/DashboardOverview.jsx

import React from 'react';
import { Package, ShoppingCart, ClipboardList, TrendingUp } from 'lucide-react';

const FarmerOverview = () => {
  const stats = [
    {
      label: 'Total Produce',
      value: 12,
      change: '+2 from last month',
      icon: <Package size={20} />,
    },
    {
      label: 'Active Listings',
      value: 8,
      change: '+1 from last week',
      icon: <ClipboardList size={20} />,
    },
    {
      label: 'Total Orders',
      value: 45,
      change: '+12 from last month',
      icon: <ShoppingCart size={20} />,
    },
    {
      label: 'Monthly Revenue',
      value: '₦250,000',
      change: '+20.1% from last month',
      icon: <TrendingUp size={20} />,
    },
  ];

  const recentActivities = [
    {
      title: 'Fresh Tomatoes added to marketplace',
      date: '2024-01-15',
      status: 'Active',
    },
    {
      title: 'Organic Corn added to marketplace',
      date: '2024-01-14',
      status: 'Pending',
    },
    {
      title: 'Sweet Potatoes added to marketplace',
      date: '2024-01-12',
      status: 'Active',
    },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      <h1 className="text-3xl font-bold mb-6">Farmer Dashboard</h1>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white p-4 rounded-lg shadow border">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-semibold text-gray-500">{stat.label}</h3>
              {stat.icon}
            </div>
            <p className="text-2xl font-bold">{stat.value}</p>
            <p className="text-xs text-green-600">{stat.change}</p>
          </div>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="bg-white p-4 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-2">Recent Activity</h2>
        <p className="text-sm text-gray-500 mb-4">Your latest produce and marketplace activities</p>
        <ul className="space-y-4">
          {recentActivities.map((item, index) => (
            <li key={index} className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-700">{item.title}</p>
                <p className="text-xs text-gray-500">{item.date}</p>
              </div>
              <span
                className={`px-3 py-1 text-xs font-semibold rounded-full ${
                  item.status === 'Active'
                    ? 'bg-black text-white'
                    : 'bg-gray-100 text-gray-600'
                }`}
              >
                {item.status}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default FarmerOverview; 