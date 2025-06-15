// pages/VendorDashboard.jsx

import React, { useState } from 'react';
import VendorOverview from '../../components/VendorDashboard/VendorOverview';
import VendorListings from '../../components/VendorDashboard/VendorListings';
import VendorOrders from '../../components/VendorDashboard/VendorOrders';
import VendorProfile from '../../components/VendorDashboard/VendorProfile';
import VendorNav from '../../components/VendorDashboard/VendorNav';


const VendorDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex">
      <VendorNav onTabChange={handleTabChange} activeTab={activeTab} />
      <main className="flex-1 p-6">
        {activeTab === 'overview' && <VendorOverview />}
        {activeTab === 'listings' && <VendorListings />}
        {activeTab === 'orders' && <VendorOrders />}
        {activeTab === 'profile' && <VendorProfile />}
      </main>
    </div>
  );
};

export default VendorDashboard;