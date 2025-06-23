// components/InvestorDashboard/InvestorOverview.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiGetAllInvestments } from '../../services/investor';


const InvestorOverview = () => {
  const navigate = useNavigate();
  const [availableProjects, setAvailableProjects] = useState([]);
  const [recentInvestments, setRecentInvestments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalInvested: 0,
    activeProjects: 0,
    expectedReturns: 0,
    payoutsReceived: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Fetch available investments from API
        const investments = await apiGetAllInvestments();
        // Show only first 3 available projects
        setAvailableProjects(investments.slice(0, 3));
        
        // Get recent investments from localStorage
        const storedInvestments = JSON.parse(localStorage.getItem('investorInvestments')) || [];
        // Show only the 4 most recent investments
        const recent = storedInvestments
          .sort((a, b) => new Date(b.date) - new Date(a.date))
          .slice(0, 4);
        setRecentInvestments(recent);
        
        // Calculate stats based on stored investments
        calculateStats(storedInvestments);
        
      } catch (error) {
        console.error('Error fetching data:', error);
        // Fallback to empty arrays if API fails
        setAvailableProjects([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const calculateStats = (investments) => {
    const totalInvested = investments.reduce((sum, inv) => sum + (inv.amount || 0), 0);
    const activeProjects = investments.length;
    const expectedReturns = investments.reduce((sum, inv) => {
      const roi = parseFloat(inv.roi) || 0;
      return sum + (inv.amount * (roi / 100));
    }, 0);
    // Simulate payouts as 60% of expected returns for demo
    const payoutsReceived = expectedReturns * 0.6;

    setStats({
      totalInvested,
      activeProjects,
      expectedReturns,
      payoutsReceived,
    });
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-GH', {
      style: 'currency',
      currency: 'GHS',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const getInvestmentStatus = (investment) => {
    const investmentDate = new Date(investment.date);
    const now = new Date();
    const daysSinceInvestment = Math.floor((now - investmentDate) / (1000 * 60 * 60 * 24));
    const durationInDays = (investment.duration || 6) * 30; // Convert months to days
    const progress = Math.min((daysSinceInvestment / durationInDays) * 100, 100);

    let status = 'Growing';
    if (progress >= 90) status = 'Harvest Ready';
    else if (progress <= 20) status = 'Planting';
    else if (progress >= 70) status = 'Maturing';

    return { status, progress: Math.round(progress) };
  };

  const handleInvestNow = (project) => {
    // Navigate to projects page and potentially scroll to or highlight the specific project
    navigate('/dashboard/investor/projects', { state: { highlightProject: project._id } });
  };

  const statCards = [
    {
      label: 'Total Invested',
      value: formatCurrency(stats.totalInvested),
      note: stats.totalInvested > 0 ? 'Active investments' : 'Start investing today',
      color: 'text-blue-600',
    },
    {
      label: 'Active Projects',
      value: stats.activeProjects.toString(),
      note: stats.activeProjects > 0 ? `Across ${Math.min(stats.activeProjects, 5)} regions` : 'No active projects',
      color: 'text-green-600',
    },
    {
      label: 'Expected Returns',
      value: formatCurrency(stats.expectedReturns),
      note: stats.expectedReturns > 0 ? `Average ROI: ${Math.round((stats.expectedReturns / Math.max(stats.totalInvested, 1)) * 100)}%` : 'Invest to earn returns',
      color: 'text-purple-600',
    },
    {
      label: 'Payouts Received',
      value: formatCurrency(stats.payoutsReceived),
      note: stats.payoutsReceived > 0 ? 'Projected earnings' : 'No payouts yet',
      color: 'text-orange-600',
    },
  ];

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto space-y-6">
        <h2 className="text-2xl font-bold">Investor Overview</h2>
        <div className="flex items-center justify-center py-12">
          <div className="flex items-center space-x-2">
            <svg className="animate-spin h-5 w-5 text-green-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="m4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <span className="text-gray-600">Loading your dashboard...</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Investor Overview</h2>
        <div className="text-sm text-gray-500">
          Last updated: {new Date().toLocaleDateString()}
        </div>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, idx) => (
          <div key={idx} className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                <p className={`text-2xl font-bold ${stat.color} mt-1`}>{stat.value}</p>
                <p className="text-xs text-gray-500 mt-1">{stat.note}</p>
              </div>
              <div className={`w-12 h-12 rounded-full ${stat.color.replace('text-', 'bg-').replace('-600', '-100')} flex items-center justify-center`}>
                {idx === 0 && <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"><path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z"/><path fillRule="evenodd" d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z" clipRule="evenodd"/></svg>}
                {idx === 1 && <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M3 4a1 1 0 011-1h4a1 1 0 010 2H6.414l2.293 2.293a1 1 0 01-1.414 1.414L5 6.414V8a1 1 0 11-2 0V4zm9 1a1 1 0 010-2h4a1 1 0 011 1v4a1 1 0 11-2 0V6.414l-2.293 2.293a1 1 0 11-1.414-1.414L13.586 5H12zm-9 7a1 1 0 112 0v1.586l2.293-2.293a1 1 0 111.414 1.414L6.414 15H8a1 1 0 110 2H4a1 1 0 01-1-1v-4zm13-1a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 110-2h1.586l-2.293-2.293a1 1 0 111.414-1.414L15 13.586V12a1 1 0 011-1z" clipRule="evenodd"/></svg>}
                {idx === 2 && <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" clipRule="evenodd"/></svg>}
                {idx === 3 && <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd"/></svg>}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Investments */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Recent Investments</h3>
            {recentInvestments.length > 0 && (
              <button 
                onClick={() => navigate('/dashboard/investor/portfolio')}
                className="text-green-600 hover:text-green-700 text-sm font-medium"
              >
                View All
              </button>
            )}
          </div>
          
          {recentInvestments.length === 0 ? (
            <div className="text-center py-8">
              <div className="text-gray-400 mb-2">
                <svg className="w-12 h-12 mx-auto" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"/>
                </svg>
              </div>
              <p className="text-gray-500 text-sm">No investments yet</p>
              <button 
                onClick={() => navigate('/dashboard/investor/projects')}
                className="mt-2 text-green-600 hover:text-green-700 text-sm font-medium"
              >
                Start Investing →
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {recentInvestments.map((inv, idx) => {
                const { status, progress } = getInvestmentStatus(inv);
                return (
                  <div key={idx} className="border-l-4 border-green-500 pl-4 py-2">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <p className="font-medium text-sm text-gray-900">{inv.title}</p>
                        <p className="text-xs text-gray-500">
                          {formatCurrency(inv.amount)} • {status}
                        </p>
                      </div>
                      <span className="text-xs text-green-600 font-medium">{inv.roi}% ROI</span>
                    </div>
                    <div className="w-full h-2 bg-gray-200 rounded-full">
                      <div
                        className="h-2 bg-green-500 rounded-full transition-all duration-300"
                        style={{ width: `${progress}%` }}
                      ></div>
                    </div>
                    <p className="text-xs text-gray-400 mt-1">{progress}% complete</p>
                  </div>
                );
              })}
            </div>
          )}
          
          {recentInvestments.length > 0 && (
            <button 
              onClick={() => navigate('/dashboard/investor/portfolio')}
              className="mt-4 w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-colors"
            >
              View All Investments
            </button>
          )}
        </div>

        {/* Available Projects */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Available Projects</h3>
            <button 
              onClick={() => navigate('/dashboard/investor/projects')}
              className="text-green-600 hover:text-green-700 text-sm font-medium"
            >
              View All
            </button>
          </div>
          
          {availableProjects.length === 0 ? (
            <div className="text-center py-8">
              <div className="text-gray-400 mb-2">
                <svg className="w-12 h-12 mx-auto" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3 4a1 1 0 011-1h4a1 1 0 010 2H6.414l2.293 2.293a1 1 0 01-1.414 1.414L5 6.414V8a1 1 0 11-2 0V4zm9 1a1 1 0 010-2h4a1 1 0 011 1v4a1 1 0 11-2 0V6.414l-2.293 2.293a1 1 0 11-1.414-1.414L13.586 5H12zm-9 7a1 1 0 112 0v1.586l2.293-2.293a1 1 0 111.414 1.414L6.414 15H8a1 1 0 110 2H4a1 1 0 01-1-1v-4zm13-1a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 110-2h1.586l-2.293-2.293a1 1 0 111.414-1.414L15 13.586V12a1 1 0 011-1z" clipRule="evenodd"/>
                </svg>
              </div>
              <p className="text-gray-500 text-sm">No projects available</p>
            </div>
          ) : (
            <div className="space-y-4">
              {availableProjects.map((proj, idx) => (
                <div key={proj._id || idx} className="border border-gray-200 rounded-lg p-4 hover:border-green-300 transition-colors">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-medium text-sm text-gray-900 line-clamp-1">{proj.title}</h4>
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      proj.status === 'active' ? 'bg-green-100 text-green-800' : 
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {proj.status}
                    </span>
                  </div>
                  
                  <p className="text-xs text-gray-600 mb-3 line-clamp-2">{proj.description}</p>
                  
                  <div className="grid grid-cols-2 gap-2 text-xs text-gray-600 mb-3">
                    <div>
                      <span>ROI: </span>
                      <span className="text-green-600 font-semibold">{proj.roi}%</span>
                    </div>
                    <div>
                      <span>Duration: </span>
                      <span className="font-medium">{proj.durationMonths}mo</span>
                    </div>
                    <div className="col-span-2">
                      <span>Funding: </span>
                      <span className="font-semibold">{formatCurrency(proj.amountRequired)}</span>
                    </div>
                  </div>
                  
                  <button 
                    onClick={() => handleInvestNow(proj)}
                    className="bg-green-500 text-white text-sm w-full py-2 rounded-lg hover:bg-green-600 transition-colors"
                  >
                    Invest Now
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default InvestorOverview;