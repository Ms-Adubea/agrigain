// components/InvestorDashboard/InvestorPortfolio.jsx
import React, { useEffect, useState } from 'react';

const InvestorPortfolio = () => {
  const [investments, setInvestments] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem('investorInvestments');
    if (saved) {
      setInvestments(JSON.parse(saved));
    }
  }, []);

  const getStatus = (roi) => {
    const value = parseInt(roi);
    if (value >= 25) return 'Active';
    if (value >= 18) return 'Growing';
    return 'Pending';
  };

  const getStatusColor = (status) => {
    if (status === 'Active') return 'bg-green-100 text-green-700';
    if (status === 'Growing') return 'bg-yellow-100 text-yellow-700';
    return 'bg-gray-100 text-gray-600';
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <h2 className="text-2xl font-bold">My Portfolio</h2>
      {investments.length === 0 ? (
        <p className="text-gray-500">You haven't invested in any projects yet.</p>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {investments.map((inv, index) => {
            const status = getStatus(inv.roi);
            return (
              <div key={index} className="bg-white p-4 rounded shadow border">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-semibold">{inv.title}</h3>
                    <p className="text-sm text-gray-500">
                      Invested: ₵{inv.amount.toLocaleString()} | ROI: {inv.roi}
                    </p>
                    <p className="text-sm text-gray-400">
                      Date: {new Date(inv.date).toLocaleDateString()}
                    </p>
                  </div>
                  <span
                    className={`text-xs px-3 py-1 rounded-full font-medium ${getStatusColor(status)}`}
                  >
                    {status}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default InvestorPortfolio;