// components/VendorDashboard/VendorOverview.jsx
import React from 'react';
import { Package, ShoppingCart, TrendingUp, ClipboardList } from 'lucide-react';

const VendorOverview = () => {
  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <h1 className="text-3xl font-bold">Vendor Overview</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-4 shadow rounded border">
          <div className="flex justify-between items-center">
            <p className="text-sm text-gray-500">Total Listings</p>
            <Package size={20} />
          </div>
          <p className="text-2xl font-bold">36</p>
        </div>

        <div className="bg-white p-4 shadow rounded border">
          <div className="flex justify-between items-center">
            <p className="text-sm text-gray-500">Active Orders</p>
            <ShoppingCart size={20} />
          </div>
          <p className="text-2xl font-bold">14</p>
        </div>

        <div className="bg-white p-4 shadow rounded border">
          <div className="flex justify-between items-center">
            <p className="text-sm text-gray-500">Completed Orders</p>
            <ClipboardList size={20} />
          </div>
          <p className="text-2xl font-bold">120</p>
        </div>

        <div className="bg-white p-4 shadow rounded border">
          <div className="flex justify-between items-center">
            <p className="text-sm text-gray-500">Total Revenue</p>
            <TrendingUp size={20} />
          </div>
          <p className="text-2xl font-bold">₦750,000</p>
        </div>
      </div>
    </div>
  );
};

export default VendorOverview;
