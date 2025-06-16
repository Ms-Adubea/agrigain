// components/BuyerDashboard/BuyerOrders.jsx
import React, { useEffect, useState } from 'react';

const BuyerOrders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem('buyerOrders');
    if (saved) {
      setOrders(JSON.parse(saved));
    }
  }, []);

  const getStatusStyle = (status) => {
    if (status === 'Pending') return 'bg-yellow-100 text-yellow-700';
    if (status === 'Delivered') return 'bg-green-100 text-green-700';
    return 'bg-gray-100 text-gray-600';
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <h2 className="text-2xl font-bold">My Orders</h2>
      {orders.length === 0 ? (
        <p className="text-gray-600">You have not placed any orders yet.</p>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {orders.map((order, index) => (
            <div key={index} className="bg-white p-4 rounded shadow border">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-semibold">{order.product}</h3>
                  <p className="text-sm text-gray-500">
                    {order.quantity} unit(s) — ₦{order.total.toLocaleString()}
                  </p>
                  <p className="text-xs text-gray-400 mt-1">
                    Placed on {new Date(order.date).toLocaleDateString()}
                  </p>
                </div>
                <span className={`text-xs px-3 py-1 rounded-full font-semibold ${getStatusStyle(order.status)}`}>
                  {order.status}
                </span>
              </div>
              <div className="mt-3">
                <p className="text-sm text-gray-700">
                  <strong>Delivery Address:</strong> {order.address}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BuyerOrders;