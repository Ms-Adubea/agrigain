// pages/InvestorDashboard.jsx
import React, { useState } from 'react';
import InvestorNav from '../../components/InvestorDashboard/InvestorNav';
import InvestorOverview from '../../components/InvestorDashboard/InvestorOverview';
import InvestorPortfolio from '../../components/InvestorDashboard/InvestorPortfolio';
import InvestorProfile from '../../components/InvestorDashboard/InvestorProfile';
import InvestorProjects from '../../components/InvestorDashboard/InvestorProjects';


const InvestorDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return <InvestorOverview />;
      case 'projects':
        return <InvestorProjects />;
      case 'portfolio':
        return <InvestorPortfolio />;
      case 'profile':
        return <InvestorProfile />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col md:flex-row">
      <InvestorNav activeTab={activeTab} onTabChange={setActiveTab} />
      <main className="flex-1 p-6">{renderContent()}</main>
    </div>
  );
};

export default InvestorDashboard;