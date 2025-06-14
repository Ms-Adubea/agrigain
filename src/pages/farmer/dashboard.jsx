// Sample Farmer Dashboard Layout using React.js, Tailwind CSS, and SweetAlert

import React, { useState } from 'react';
import Swal from 'sweetalert2';
import DashboardNav from '../../components/FarmerDashboard/DashboardNav';
import FarmerProfile from '../../components/FarmerDashboard/FarmerProfile';
import AddProduceForm from '../../components/FarmerDashboard/AddProduceForm';
import ProduceList from '../../components/FarmerDashboard/ProduceList';
import MarketplaceViewer from '../../components/FarmerDashboard/MarketplaceViewer';


const FarmerDashboard = () => {
  const [activeTab, setActiveTab] = useState('profile');

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    Swal.fire({
      title: `Switched to ${tab}`,
      icon: 'info',
      toast: true,
      timer: 1500,
      position: 'top-end',
      showConfirmButton: false,
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar Navigation */}
      <DashboardNav onTabChange={handleTabChange} activeTab={activeTab} />

      {/* Main Content */}
      <main className="flex-1 p-6">
        {activeTab === 'profile' && <FarmerProfile />}
        {activeTab === 'add-produce' && <AddProduceForm />}
        {activeTab === 'my-produce' && <ProduceList />}
        {activeTab === 'marketplace' && <MarketplaceViewer />}
      </main>
    </div>
  );
};

export default FarmerDashboard;
