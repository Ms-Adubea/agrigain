// FarmerDashboard.jsx

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
  const [hasProfile, setHasProfile] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkProfile = async () => {
      try {
        const profile = await apiGetFarmerProfile();
        if (profile && profile.data && Object.keys(profile.data).length > 0) {
  setHasProfile(true);
} else {
          throw new Error('Incomplete profile');
        }
      } catch {
        Swal.fire('Complete Your Profile', 'Please complete your profile to continue.', 'info');
        setActiveTab('profile');
      }
    };

    checkProfile();
  }, []);

  
useEffect(() => {
  if (!hasProfile && activeTab !== 'profile') {
    setActiveTab('profile');
  }
}, [hasProfile, activeTab]);

  const handleTabChange = (tab) => {
    if (!hasProfile && tab !== 'profile') {
      Swal.fire('Action Denied', 'Please complete your profile first.', 'warning');
      return;
    }
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

  const handleProfileComplete = () => {
    setHasProfile(true);
    setActiveTab('add-produce');
    Swal.fire('Profile Complete', 'You can now access the full dashboard!', 'success');
  };

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar Navigation */}
      <DashboardNav onTabChange={handleTabChange} activeTab={activeTab} hasProfile={hasProfile} />

      {/* Main Content */}
      <main className="flex-1 p-6">
        {activeTab === 'profile' && <FarmerProfile onComplete={handleProfileComplete} />}
        {activeTab === 'overview' && <FarmerOverview onComplete={handleProfileComplete} />}
        {activeTab === 'add-produce' && <AddProduceForm />}
        {activeTab === 'my-produce' && <ProduceList />}
        {activeTab === 'marketplace' && <MarketplaceViewer />}
      </main>
    </div>
  );
};

export default FarmerDashboard;
