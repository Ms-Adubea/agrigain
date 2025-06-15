// components/VendorDashboard/VendorOverview.jsx

import React from 'react';
import { Package, ShoppingCart, ClipboardList, TrendingUp } from 'lucide-react';

const VendorOverview = () => {
  const stats = [
    {
      label: 'Total Listings',
      value: 36,
      icon: <Package size={20} />,
    },
    {
      label: 'Active Orders',
      value: 14,
      icon: <ShoppingCart size={20} />,
    },
    {
      label: 'Completed Orders',
      value: 120,
      icon: <ClipboardList size={20} />,
    },
    {
      label: 'Total Revenue',
      value: '₦750,000',
      icon: <TrendingUp size={20} />,
    },
  ];

  const recentOrders = [
    {
      product: 'Organic Fertilizer',
      buyer: 'Kwame Mensah',
      date: '2025-06-12',
      status: 'Pending',
    },
    {
      product: 'Maize Seeds',
      buyer: 'Adjoa Owusu',
      date: '2025-06-11',
      status: 'Shipped',
    },
    {
      product: 'Pesticide X',
      buyer: 'Kofi Yeboah',
      date: '2025-06-10',
      status: 'Delivered',
    },
  ];

  const getStatusStyle = (status) => {
    if (status === 'Pending') return 'bg-yellow-100 text-yellow-700';
    if (status === 'Shipped') return 'bg-blue-100 text-blue-700';
    if (status === 'Delivered') return 'bg-green-100 text-green-700';
    return 'bg-gray-100 text-gray-600';
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <h1 className="text-3xl font-bold">Vendor Overview</h1>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white p-4 shadow rounded border">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold text-gray-500">{stat.label}</h3>
              {stat.icon}
            </div>
            <p className="text-2xl font-bold mt-2">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Recent Orders */}
      <div className="bg-white p-4 rounded shadow mt-8">
        <h2 className="text-xl font-semibold mb-4">Recent Orders</h2>
        <ul className="divide-y">
          {recentOrders.map((order, idx) => (
            <li key={idx} className="py-3 flex justify-between items-center">
              <div>
                <p className="text-sm font-medium text-gray-900">{order.product}</p>
                <p className="text-xs text-gray-500">{order.buyer} — {order.date}</p>
              </div>
              <span className={`px-3 py-1 text-xs font-semibold rounded-full ${getStatusStyle(order.status)}`}>
                {order.status}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default VendorOverview;