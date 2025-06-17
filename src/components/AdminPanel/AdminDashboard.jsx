// components/Admin/AdminDashboard.jsx
import React, { useEffect, useState } from 'react';
import { Users, CalendarDays, ShoppingCart, Inbox } from 'lucide-react';

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    activeListings: 0,
    pendingApprovals: 0,
    totalTransactions: 0,
  });

  useEffect(() => {
    // TODO: Replace with real API calls
    setStats({
      totalUsers: 324,
      activeListings: 52,
      pendingApprovals: 7,
      totalTransactions: 128,
    });
  }, []);

  const statCards = [
    {
      title: 'Total Users',
      value: stats.totalUsers,
      sub: 'Registered users',
      icon: <Users className="text-gray-500" size={18} />,
    },
    {
      title: 'Active Listings',
      value: stats.activeListings,
      sub: 'Products & services',
      icon: <CalendarDays className="text-gray-500" size={18} />,
    },
    {
      title: 'Pending Approvals',
      value: stats.pendingApprovals,
      sub: 'Items to review',
      icon: <Inbox className="text-gray-500" size={18} />,
    },
    {
      title: 'Total Transactions',
      value: stats.totalTransactions,
      sub: 'Processed value',
      icon: <ShoppingCart className="text-gray-500" size={18} />,
    },
  ];

  return (
    <div className="p-4 md:p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p className="text-gray-600">Welcome back, Admin! Here's an overview of your activities.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {statCards.map((card, idx) => (
          <div key={idx} className="bg-white p-4 rounded shadow border">
            <div className="flex justify-between items-center mb-1">
              <p className="text-sm text-gray-500 font-medium">{card.title}</p>
              {card.icon}
            </div>
            <h3 className="text-2xl font-bold">{card.value}</h3>
            <p className="text-xs text-gray-400">{card.sub}</p>
          </div>
        ))}
      </div>

      <div className="bg-white p-4 border rounded shadow">
        <h2 className="text-lg font-bold mb-2">Platform Activity</h2>
        <p className="text-sm text-gray-500">Recent activities across the platform</p>
        <div className="mt-4 text-gray-400 text-sm">No recent platform activities to display.</div>
      </div>
    </div>
  );
};

export default AdminDashboard;