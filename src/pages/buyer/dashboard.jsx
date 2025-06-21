import React, { useState, useEffect } from 'react';
import BuyerMarketplace from '../../components/BuyerDashboard/BuyerMarketplace';
import BuyerProfile from '../../components/BuyerDashboard/BuyerProfile';
import BuyerOrders from '../../components/BuyerDashboard/BuyerOrders';
import BuyerOverview from '../../components/BuyerDashboard/BuyerOverview';
import BuyerHeader from '../../components/BuyerDashboard/BuyerHeader';

const BuyerDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [orders, setOrders] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [address, setAddress] = useState('');
  const [loading, setLoading] = useState(true);

  const mockUser = {
    firstName: 'Irwin',
    lastName: 'Williams',
    email: 'email@tail.com',
    role: 'Admin'
  };

  useEffect(() => {
    // Load all persisted data from localStorage
    const savedOrders = localStorage.getItem('buyerOrders');
    const savedFavorites = localStorage.getItem('buyerFavorites');
    const savedAddress = localStorage.getItem('buyerAddress');

    if (savedOrders) setOrders(JSON.parse(savedOrders));
    if (savedFavorites) setFavorites(JSON.parse(savedFavorites));
    if (savedAddress) setAddress(savedAddress);
    
    setLoading(false);
  }, []);

  const updateOrders = (newOrders) => {
    setOrders(newOrders);
    localStorage.setItem('buyerOrders', JSON.stringify(newOrders));
  };

  const updateFavorites = (newFavorites) => {
    setFavorites(newFavorites);
    localStorage.setItem('buyerFavorites', JSON.stringify(newFavorites));
  };

  const updateAddress = (newAddress) => {
    setAddress(newAddress);
    localStorage.setItem('buyerAddress', newAddress);
  };

  const renderContent = () => {
    if (loading) {
      return (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      );
    }

    switch (activeTab) {
      case 'overview':
        return <BuyerOverview 
                 orders={orders} 
                 favorites={favorites} 
                 currencySymbol="₵" 
               />;
      case 'marketplace':
        return <BuyerMarketplace 
                 orders={orders} 
                 setOrders={updateOrders}
                 favorites={favorites}
                 setFavorites={updateFavorites}
                 address={address}
                 setAddress={updateAddress}
                 currencySymbol="₵" 
               />;
      case 'orders':
        return <BuyerOrders 
                 orders={orders} 
                 currencySymbol="₵" 
               />;
      case 'profile':
        return <BuyerProfile />;
      case 'favorites':
        return <div className="text-gray-500 text-center mt-10">
                 {favorites.length === 0 ? 'No favorites yet' : `${favorites.length} favorites`}
               </div>;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <BuyerHeader user={mockUser} />

      <div className="bg-white shadow px-6 py-4 flex flex-wrap gap-6 text-sm font-medium">
        {['Overview', 'Marketplace', 'My Orders', 'Profile', 'Favorites'].map((label) => {
          const key = label.toLowerCase().replace(' ', '');
          return (
            <button
              key={key}
              onClick={() => setActiveTab(key)}
              className={`py-2 border-b-2 ${
                activeTab === key
                  ? 'border-green-600 text-green-700 font-semibold'
                  : 'border-transparent text-gray-600'
              } hover:text-green-600 transition`}
            >
              {label}
            </button>
          );
        })}
      </div>

      <main className="p-6">
        {renderContent()}
      </main>
    </div>
  );
};

export default BuyerDashboard;