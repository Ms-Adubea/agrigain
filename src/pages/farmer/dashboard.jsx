import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import DashboardNav from '../../components/FarmerDashboard/DashboardNav';
import FarmerProfile from '../../components/FarmerDashboard/FarmerProfileForm';
import AddProduceForm from '../../components/FarmerDashboard/AddProduceForm';
import ProduceList from '../../components/FarmerDashboard/ProduceList';
import MarketplaceViewer from '../../components/FarmerDashboard/MarketplaceViewer';
import { apiGetFarmerProfile } from '../../services/farmer';
import FarmerOverview from '../../components/FarmerDashboard/FarmerOverview';

const FarmerDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    const tabName = tab.charAt(0).toUpperCase() + tab.slice(1).replace('-', ' ');
    Swal.fire({
      title: `Switched to ${tabName}`,
      icon: 'success',
      toast: true,
      timer: 1500,
      position: 'top-end',
      showConfirmButton: false,
    });
  };

  const handleProfileComplete = () => {
    Swal.fire({
      title: 'Profile Saved',
      text: 'Your farmer profile has been updated successfully.',
      icon: 'success',
      timer: 3000,
      showConfirmButton: false
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar Navigation */}
      <DashboardNav onTabChange={handleTabChange} activeTab={activeTab} hasProfile={true} />

      {/* Main Content */}
      <main className="flex-1 p-6">
        {activeTab === 'profile' && <FarmerProfile onComplete={handleProfileComplete} />}
        {activeTab === 'overview' && <FarmerOverview />}
        {activeTab === 'add-produce' && <AddProduceForm />}
        {activeTab === 'my-produce' && <ProduceList />}
        {activeTab === 'marketplace' && <MarketplaceViewer />}
      </main>
    </div>
  );
};

export default FarmerDashboard;
