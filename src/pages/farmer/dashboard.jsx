import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import DashboardNav from '../../components/FarmerDashboard/DashboardNav';
import FarmerProfile from '../../components/FarmerDashboard/FarmerProfileForm';
import AddProduceForm from '../../components/FarmerDashboard/AddProduceForm';
import ProduceList from '../../components/FarmerDashboard/ProduceList';
import MarketplaceViewer from '../../components/FarmerDashboard/MarketplaceViewer';
import FarmerOverview from '../../components/FarmerDashboard/FarmerOverview';
import ProfileView from '../../components/FarmerDashboard/ProfileView';
import { apiGetFarmerProfile } from '../../services/farmer';

const FarmerDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [profileData, setProfileData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await apiGetFarmerProfile();
        if (response.data) {
          setProfileData(response.data);
        }
      } catch (error) {
        console.error("Failed to fetch profile:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, []);

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

  const handleProfileComplete = (profile) => {
    setProfileData(profile);
    setIsEditing(false);
    Swal.fire({
      title: 'Profile Saved',
      text: `Your farmer profile has been ${profileData ? 'updated' : 'created'} successfully.`,
      icon: 'success',
      timer: 3000,
      showConfirmButton: false
    });
  };

  const handleEditProfile = () => {
    setIsEditing(true);
  };

  if (isLoading) {
    return <div className="min-h-screen bg-gray-100 flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 flex">
      <DashboardNav 
        onTabChange={handleTabChange} 
        activeTab={activeTab} 
        hasProfile={!!profileData} 
      />

      <main className="flex-1 p-6">
        {activeTab === 'profile' && (
          profileData && !isEditing ? (
            <ProfileView profile={profileData} onEdit={handleEditProfile} />
          ) : (
            <FarmerProfile 
              onComplete={handleProfileComplete} 
              existingProfile={isEditing ? profileData : null} 
            />
          )
        )}
        {activeTab === 'overview' && <FarmerOverview profile={profileData} />}
        {activeTab === 'add-produce' && <AddProduceForm />}
        {activeTab === 'my-produce' && <ProduceList />}
        {activeTab === 'marketplace' && <MarketplaceViewer />}
      </main>
    </div>
  );
};

export default FarmerDashboard;