// components/VendorDashboard/VendorOrders.jsx

import React, { useState } from 'react';
import Swal from 'sweetalert2';

const dummyOrders = [
  {
    _id: '1',
    product: 'Organic Fertilizer',
    buyer: 'Kwame Mensah',
    quantity: 5,
    total: 12500,
    status: 'Pending',
  },
  {
    _id: '2',
    product: 'Maize Seeds',
    buyer: 'Adjoa Owusu',
    quantity: 10,
    total: 20000,
    status: 'Shipped',
  },
  {
    _id: '3',
    product: 'Pesticide X',
    buyer: 'Kofi Yeboah',
    quantity: 3,
    total: 7500,
    status: 'Delivered',
  },
];

const statusOptions = ['Pending', 'Shipped', 'Delivered'];
const filterOptions = ['All', ...statusOptions];
const stepLabels = ['Ordered', 'Shipped', 'Delivered'];

const VendorOrders = () => {
  const [orders, setOrders] = useState(dummyOrders);
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const updateStatus = async (id, newStatus) => {
    const confirm = await Swal.fire({
      title: 'Change Order Status?',
      text: `Set status to ${newStatus}?`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes, change it',
    });

    if (confirm.isConfirmed) {
      const updated = orders.map((order) =>
        order._id === id ? { ...order, status: newStatus } : order
      );
      setOrders(updated);
      Swal.fire('Updated!', 'Order status changed.', 'success');
    }
  };

  const filteredOrders =
    selectedStatus === 'All'
      ? orders
      : orders.filter((order) => order.status === selectedStatus);

  const openModal = (order) => {
    setSelectedOrder(order);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedOrder(null);
  };

  const getStepIndex = (status) => {
    if (status === 'Pending') return 1;
    if (status === 'Shipped') return 2;
    if (status === 'Delivered') return 3;
    return 0;
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <h2 className="text-2xl font-bold">Vendor Orders</h2>

      {/* Status Filter */}
      <div className="flex gap-2 mb-4">
        {filterOptions.map((status) => (
          <button
            key={status}
            onClick={() => setSelectedStatus(status)}
            className={`px-4 py-1 rounded-full border text-sm ${
              selectedStatus === status
                ? 'bg-green-600 text-white border-green-600'
                : 'bg-white text-gray-700 border-gray-300'
            }`}
          >
            {status}
          </button>
        ))}
      </div>

      <div className="overflow-x-auto">
        <table className="w-full bg-white border rounded shadow">
          <thead className="bg-gray-100 text-left">
            <tr>
              <th className="p-3">Product</th>
              <th className="p-3">Buyer</th>
              <th className="p-3">Qty</th>
              <th className="p-3">Total</th>
              <th className="p-3">Status</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.map((order) => (
              <tr key={order._id} className="border-t">
                <td className="p-3 font-medium">{order.product}</td>
                <td className="p-3">{order.buyer}</td>
                <td className="p-3">{order.quantity}</td>
                <td className="p-3">₦{order.total.toLocaleString()}</td>
                <td className="p-3">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      order.status === 'Pending'
                        ? 'bg-yellow-100 text-yellow-700'
                        : order.status === 'Shipped'
                        ? 'bg-blue-100 text-blue-700'
                        : 'bg-green-100 text-green-700'
                    }`}
                  >
                    {order.status}
                  </span>
                </td>
                <td className="p-3 space-x-2">
                  <select
                    value={order.status}
                    onChange={(e) => updateStatus(order._id, e.target.value)}
                    className="border p-1 rounded"
                  >
                    {statusOptions.map((status) => (
                      <option key={status} value={status}>
                        {status}
                      </option>
                    ))}
                  </select>
                  <button
                    onClick={() => openModal(order)}
                    className="text-sm text-blue-600 underline ml-2"
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filteredOrders.length === 0 && (
          <p className="text-center text-sm text-gray-500 mt-4">No orders found for "{selectedStatus}".</p>
        )}
      </div>

      {/* Order Detail Modal */}
      {showModal && selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md relative">
            <button
              onClick={closeModal}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-lg"
            >
              ×
            </button>
            <h3 className="text-xl font-bold mb-4">Order Details</h3>
            <p><strong>Product:</strong> {selectedOrder.product}</p>
            <p><strong>Buyer:</strong> {selectedOrder.buyer}</p>
            <p><strong>Quantity:</strong> {selectedOrder.quantity}</p>
            <p><strong>Total:</strong> ₦{selectedOrder.total.toLocaleString()}</p>
            <p><strong>Status:</strong> {selectedOrder.status}</p>

            <div className="mt-6">
              <h4 className="font-semibold mb-2">Timeline</h4>
              <ul className="border-l-2 border-gray-200 pl-4 space-y-3">
                {stepLabels.map((label, index) => {
                  const isComplete = index < getStepIndex(selectedOrder.status);
                  return (
                    <li key={label} className="relative">
                      <span
                        className={`absolute -left-3 top-1 w-3 h-3 rounded-full ${
                          isComplete ? 'bg-green-500' : 'bg-gray-300'
                        }`}
                      ></span>
                      <p className={`text-sm ${isComplete ? 'text-gray-900' : 'text-gray-400'}`}>{label}</p>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VendorOrders;