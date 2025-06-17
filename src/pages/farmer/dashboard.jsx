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
  const [isLoadingProfile, setIsLoadingProfile] = useState(true);
  const [profileData, setProfileData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
  // Updated checkProfile function for FarmerDashboard component
const checkProfile = async () => {
  try {
    setIsLoadingProfile(true);
    console.log('Checking for existing profile...');
    
    const response = await apiGetFarmerProfile();
    console.log('Profile check response:', response);
    
    // Handle both response structures: {data: profile} or direct profile object
    let profile = null;
    if (response && response.data) {
      profile = response.data;
    } else if (response && response.farmSize) {
      // Handle case where profile is returned directly
      profile = response;
    }
    
    if (profile) {
      // Check if profile has required fields
      const hasRequiredFields = profile.farmSize && 
                               profile.cropTypes && 
                               profile.region && 
                               profile.experienceYears !== undefined;
      
      if (hasRequiredFields) {
        console.log('Valid profile found:', profile);
        setProfileData(profile);
        setHasProfile(true);
        
        // If we're on the profile tab but have a valid profile, switch to overview
        if (activeTab === 'profile') {
          setActiveTab('overview');
        }
      } else {
        console.log('Profile exists but incomplete:', profile);
        throw new Error('Incomplete profile data');
      }
    } else {
      console.log('No profile data in response');
      throw new Error('No profile found');
    }
  } catch (error) {
    console.error('Profile check failed:', error);
    setHasProfile(false);
    setProfileData(null);
    
    // Only show the warning if we're not already on profile tab
    if (activeTab !== 'profile') {
      // Check if it's a "profile already exists" error
      if (error.response?.data?.message?.includes('already exists')) {
        Swal.fire({
          title: 'Profile Issue',
          text: 'There seems to be an issue with your profile. Please contact support or try updating your profile.',
          icon: 'warning'
        });
      } else {
        Swal.fire({
          title: 'Complete Your Profile',
          text: 'Please complete your profile to access the dashboard.',
          icon: 'info'
        });
      }
      setActiveTab('profile');
    }
  } finally {
    setIsLoadingProfile(false);
  }
};

    checkProfile();
  }, []); // Remove activeTab from dependencies to prevent infinite loops

  const handleTabChange = (tab) => {
    if (!hasProfile && tab !== 'profile') {
      Swal.fire({
        title: 'Profile Required',
        text: 'Please complete your profile to access this section.',
        icon: 'warning'
      });
      return;
    }
    
    setActiveTab(tab);
    
    // Only show success toast for successful navigation
    if (hasProfile && tab !== 'profile') {
      const tabName = tab.charAt(0).toUpperCase() + tab.slice(1).replace('-', ' ');
      Swal.fire({
        title: `Switched to ${tabName}`,
        icon: 'success',
        toast: true,
        timer: 1500,
        position: 'top-end',
        showConfirmButton: false,
      });
    }
  };

  const handleProfileComplete = () => {
    console.log('Profile completion callback triggered');
    
    // Re-check the profile to get the latest data
    checkProfileAfterCreation();
  };

  const checkProfileAfterCreation = async () => {
    try {
      console.log('Re-checking profile after creation...');
      const response = await apiGetFarmerProfile();
      
      if (response && response.data) {
        console.log('Profile found after creation:', response.data);
        setProfileData(response.data);
        setHasProfile(true);
        setActiveTab('overview');
        
        Swal.fire({
          title: 'Welcome to Your Dashboard!',
          text: 'Your profile has been created successfully. You now have access to all dashboard features.',
          icon: 'success',
          timer: 3000,
          showConfirmButton: false
        });
      }
    } catch (error) {
      console.error('Failed to verify profile after creation:', error);
      Swal.fire({
        title: 'Verification Failed',
        text: 'Profile may have been created but verification failed. Please refresh the page.',
        icon: 'warning'
      });
    }
  };

  // Force profile check button (for debugging/manual refresh)
  const forceProfileCheck = async () => {
    setIsLoadingProfile(true);
    try {
      const response = await apiGetFarmerProfile();
      console.log('Force check response:', response);
      
      if (response && response.data && response.data.farmSize) {
        setProfileData(response.data);
        setHasProfile(true);
        setActiveTab('overview');
        Swal.fire('Profile Found!', 'Your profile has been loaded successfully.', 'success');
      } else {
        Swal.fire('No Profile', 'No valid profile found. Please create one.', 'info');
      }
    } catch (error) {
      console.error('Force check failed:', error);
      Swal.fire('Check Failed', 'Could not verify profile status.', 'error');
    } finally {
      setIsLoadingProfile(false);
    }
  };

  // Show loading state
  if (isLoadingProfile) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar Navigation */}
      <DashboardNav onTabChange={handleTabChange} activeTab={activeTab} hasProfile={hasProfile} />

      {/* Main Content */}
      <main className="flex-1 p-6">
        {/* Debug info - remove in production */}
        <div className="mb-4 p-2 bg-yellow-100 rounded text-sm">
          <strong>Debug Info:</strong> Has Profile: {hasProfile ? 'Yes' : 'No'} | 
          Active Tab: {activeTab} | 
          Profile Data: {profileData ? 'Loaded' : 'None'}
          <button 
            onClick={forceProfileCheck}
            className="ml-4 px-2 py-1 bg-blue-500 text-white rounded text-xs"
          >
            Force Check Profile
          </button>
        </div>

        {activeTab === 'profile' && (
          <FarmerProfile onComplete={handleProfileComplete} />
        )}
        {activeTab === 'overview' && hasProfile && <FarmerOverview />}
        {activeTab === 'add-produce' && hasProfile && <AddProduceForm />}
        {activeTab === 'my-produce' && hasProfile && <ProduceList />}
        {activeTab === 'marketplace' && hasProfile && <MarketplaceViewer />}
        
        {/* Show message if trying to access restricted content without profile */}
        {!hasProfile && activeTab !== 'profile' && (
          <div className="max-w-xl mx-auto bg-white p-6 rounded-xl shadow-md text-center">
            <h2 className="text-2xl font-bold mb-4 text-red-600">Profile Required</h2>
            <p className="text-gray-600 mb-4">
              You need to complete your farmer profile before accessing this section.
            </p>
            <button
              onClick={() => setActiveTab('profile')}
              className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
            >
              Complete Profile
            </button>
          </div>
        )}
      </main>
    </div>
  );
};

export default FarmerDashboard;