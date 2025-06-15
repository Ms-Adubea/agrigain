// pages/VendorDashboard.jsx

import React, { useState } from 'react';
import VendorNav from '../../components/VendorDashboard/VendorNav';
import VendorOverview from '../../components/VendorDashboard/VendorOverview';
import VendorListings from '../../components/VendorDashboard/VendorListings';
import VendorOrders from '../../components/VendorDashboard/VendorOrders';
import VendorProfile from '../../components/VendorDashboard/VendorProfile';
import AddNewListingForm from '../../components/VendorDashboard/AddNewListingForm';

const VendorDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [modalState, setModalState] = useState({ show: false, mode: 'add', listing: null });

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const openAddModal = () => setModalState({ show: true, mode: 'add', listing: null });
  const closeModal = () => setModalState({ show: false, mode: 'add', listing: null });

  return (
    <div className="min-h-screen bg-gray-100 flex">
      <VendorNav
        onTabChange={handleTabChange}
        activeTab={activeTab}
        onAddNewItem={openAddModal}
      />
      <main className="flex-1 p-6">
        {activeTab === 'overview' && <VendorOverview />}
        {activeTab === 'listings' && <VendorListings />}
        {activeTab === 'orders' && <VendorOrders />}
        {activeTab === 'profile' && <VendorProfile />}
      </main>

      {modalState.show && (
        <div className="fixed inset-0 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-xl relative w-full max-w-xl">
            <button
              onClick={closeModal}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 text-xl font-bold"
            >
              ×
            </button>
            <AddNewListingForm
              onSuccess={closeModal}
              onClose={closeModal}
              editData={modalState.listing}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default VendorDashboard;