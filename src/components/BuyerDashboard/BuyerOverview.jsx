// components/BuyerDashboard/BuyerOverview.jsx
import React, { useEffect, useState } from 'react';

const BuyerOverview = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem('buyerOrders');
    if (saved) {
      setOrders(JSON.parse(saved));
    }
  }, []);

  const totalOrders = orders.length;
  const totalSpent = orders.reduce((sum, order) => sum + order.total, 0);
  const recentOrders = orders.slice(-3).reverse();

  const getStatusStyle = (status) => {
    if (status === 'Pending') return 'bg-yellow-100 text-yellow-700';
    if (status === 'Delivered') return 'bg-green-100 text-green-700';
    return 'bg-gray-100 text-gray-600';
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <h2 className="text-2xl font-bold">Overview</h2>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded shadow">
          <p className="text-sm text-gray-500">Total Orders</p>
          <p className="text-2xl font-bold">{totalOrders}</p>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <p className="text-sm text-gray-500">Total Spent</p>
          <p className="text-2xl font-bold">₦{totalSpent.toLocaleString()}</p>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <p className="text-sm text-gray-500">Last Order</p>
          <p className="text-lg">{recentOrders[0]?.product || '—'}</p>
        </div>
      </div>

      {/* Recent Orders */}
      <div className="bg-white p-4 rounded shadow mt-6">
        <h3 className="text-lg font-semibold mb-4">Recent Orders</h3>
        {recentOrders.length === 0 ? (
          <p className="text-sm text-gray-500">No recent orders found.</p>
        ) : (
          <ul className="divide-y">
            {recentOrders.map((order, index) => (
              <li key={index} className="py-3 flex justify-between items-center">
                <div>
                  <p className="text-sm font-medium">{order.product}</p>
                  <p className="text-xs text-gray-500">
                    {order.quantity} unit(s) — ₦{order.total.toLocaleString()}
                  </p>
                </div>
                <span className={`text-xs px-3 py-1 rounded-full font-semibold ${getStatusStyle(order.status)}`}>
                  {order.status}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default BuyerOverview;