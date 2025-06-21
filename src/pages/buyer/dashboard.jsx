import React, { useState, useEffect } from 'react';
import { LayoutDashboard, ShoppingCart, ClipboardList, User, Heart, Menu, Package, Clock, CheckCircle } from 'lucide-react';
import BuyerMarketplace from '../../components/BuyerDashboard/BuyerMarketplace';
import BuyerProfile from '../../components/BuyerDashboard/BuyerProfile';
import BuyerOverview from '../../components/BuyerDashboard/BuyerOverview';
import BuyerHeader from '../../components/BuyerDashboard/BuyerHeader';

// BuyerNav Component
const BuyerNav = ({ activeTab, onTabChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { key: 'overview', label: 'Overview', icon: <LayoutDashboard size={20} /> },
    { key: 'marketplace', label: 'Marketplace', icon: <ShoppingCart size={20} /> },
    { key: 'myorders', label: 'My Orders', icon: <ClipboardList size={20} /> },
    { key: 'profile', label: 'Profile', icon: <User size={20} /> },
    { key: 'favorites', label: 'Favorites', icon: <Heart size={20} /> },
  ];

  return (
    <>
      {/* Desktop Header Navigation */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-gray-900">Buyer Dashboard</h1>
            </div>
            
            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-8">
              {navItems.map(({ key, label, icon }) => (
                <button
                  key={key}
                  onClick={() => onTabChange(key)}
                  className={`flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                    activeTab === key 
                      ? 'text-green-600 bg-green-50' 
                      : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <span className="mr-2">{icon}</span>
                  {label}
                </button>
              ))}
            </nav>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="text-gray-500 hover:text-gray-700 p-2"
              >
                <Menu size={24} />
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden border-t bg-white">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navItems.map(({ key, label, icon }) => (
                <button
                  key={key}
                  onClick={() => {
                    onTabChange(key);
                    setIsOpen(false);
                  }}
                  className={`flex items-center w-full px-3 py-2 text-base font-medium rounded-md transition-colors ${
                    activeTab === key 
                      ? 'text-green-600 bg-green-50' 
                      : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <span className="mr-3">{icon}</span>
                  {label}
                </button>
              ))}
            </div>
          </div>
        )}
      </header>
    </>
  );
};

// BuyerOrders Component
const BuyerOrders = ({ orders = [], currencySymbol = '₵' }) => {
  const getStatusStyle = (status) => {
    switch (status) {
      case 'Pending':
        return 'bg-yellow-100 text-yellow-700';
      case 'Delivered':
        return 'bg-green-100 text-green-700';
      default:
        return 'bg-gray-100 text-gray-600';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Pending':
        return <Clock className="w-4 h-4" />;
      case 'Delivered':
        return <CheckCircle className="w-4 h-4" />;
      default:
        return <Package className="w-4 h-4" />;
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">My Orders</h2>
        <span className="text-sm text-gray-500">
          {orders.length} order{orders.length !== 1 ? 's' : ''}
        </span>
      </div>
      
      {orders.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-lg shadow-sm">
          <Package className="w-12 h-12 mx-auto text-gray-400 mb-4" />
          <h3 className="text-lg font-medium text-gray-900">No orders yet</h3>
          <p className="text-gray-500 mt-2">
            Your orders will appear here once you place them in the marketplace
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {orders.map((order, index) => (
            <div 
              key={index} 
              className="bg-white p-4 rounded-lg shadow-sm border hover:shadow-md transition-shadow"
            >
              <div className="flex justify-between items-start">
                <div className="flex items-start space-x-4">
                  <div className="bg-blue-50 p-3 rounded-lg">
                    <Package className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">{order.productName || order.product}</h3>
                    <p className="text-sm text-gray-500">
                      {order.quantity} unit{order.quantity !== 1 ? 's' : ''} • 
                      {currencySymbol}{order.total.toLocaleString()}
                    </p>
                    <p className="text-xs text-gray-400 mt-1">
                      Ordered on {new Date(order.date).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <span className={`inline-flex items-center space-x-1 px-3 py-1 rounded-full text-sm font-medium ${getStatusStyle(order.status)}`}>
                    {getStatusIcon(order.status)}
                    <span>{order.status}</span>
                  </span>
                </div>
              </div>
              {order.address && (
                <div className="mt-3 pt-3 border-t border-gray-100">
                  <p className="text-sm text-gray-700">
                    <span className="font-medium">Delivery to:</span> {order.address}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// Main BuyerDashboard Component
const BuyerDashboard = () => {
  const [activeTab, setActiveTab] = useState('marketplace');
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
    // Simulate loading persisted data
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  const updateOrders = (newOrders) => {
    setOrders(newOrders);
  };

  const updateFavorites = (newFavorites) => {
    setFavorites(newFavorites);
  };

  const updateAddress = (newAddress) => {
    setAddress(newAddress);
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
      case 'myorders':
        return <BuyerOrders 
                 orders={orders} 
                 currencySymbol="₵" 
               />;
      case 'profile':
        return <BuyerProfile />;
      case 'favorites':
        return (
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl font-bold mb-6">My Favorites</h2>
            <div className="text-center py-12 bg-white rounded-lg shadow-sm">
              <Heart className="w-12 h-12 mx-auto text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-900">No favorites yet</h3>
              <p className="text-gray-500 mt-2">
                {favorites.length === 0 
                  ? 'Heart products in the marketplace to see them here' 
                  : `You have ${favorites.length} favorite${favorites.length !== 1 ? 's' : ''}`}
              </p>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <BuyerHeader user={mockUser} />
      <BuyerNav activeTab={activeTab} onTabChange={setActiveTab} />
      
      <main className="p-6">
        {renderContent()}
      </main>
    </div>
  );
};

export default BuyerDashboard;