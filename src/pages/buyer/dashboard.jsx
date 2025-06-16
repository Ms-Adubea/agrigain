import React, { useState } from 'react';
import BuyerNav from '../../components/BuyerDashboard/BuyerNav';
import BuyerMarketplace from '../../components/BuyerDashboard/BuyerMarketplace';
import BuyerProfile from '../../components/BuyerDashboard/BuyerProfile';
import BuyerOrders from '../../components/BuyerDashboard/BuyerOrders';
import BuyerOverview from '../../components/BuyerDashboard/BuyerOverview';

const BuyerDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return <BuyerOverview />;
      case 'marketplace':
        return <BuyerMarketplace />;
      case 'orders':
        return <BuyerOrders />;
      case 'profile':
        return <BuyerProfile />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col md:flex-row">
      <BuyerNav activeTab={activeTab} onTabChange={setActiveTab} />
      <main className="flex-1 p-6">{renderContent()}</main>
    </div>
  );
};

export default BuyerDashboard;
