// components/InvestorDashboard/InvestorProjects.jsx
import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { apiGetAllInvestments } from '../../services/investor';


const InvestorProjects = () => {
  const [selectedProject, setSelectedProject] = useState(null);
  const [amount, setAmount] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch investments on component mount
  useEffect(() => {
    const fetchInvestments = async () => {
      try {
        setLoading(true);
        setError(null);
        const investments = await apiGetAllInvestments();
        setProjects(investments);
        setFilteredProjects(investments);
      } catch (err) {
        console.error('Error fetching investments:', err);
        setError('Failed to load investment opportunities. Please try again.');
        // Fallback to empty array
        setProjects([]);
        setFilteredProjects([]);
      } finally {
        setLoading(false);
      }
    };

    fetchInvestments();
  }, []);

  // Filter projects based on search term
  useEffect(() => {
    if (searchTerm.trim()) {
      setFilteredProjects(
        projects.filter((p) =>
          p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          p.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
          p.description.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    } else {
      setFilteredProjects(projects);
    }
  }, [searchTerm, projects]);

  const handleInvest = () => {
    if (!amount || amount <= 0) {
      Swal.fire({
        icon: 'warning',
        title: 'Invalid Amount',
        text: 'Please enter a valid investment amount.',
        confirmButtonColor: '#16a34a',
      });
      return;
    }

    const investment = {
      projectId: selectedProject._id,
      title: selectedProject.title,
      amount: parseFloat(amount),
      roi: selectedProject.roi,
      date: new Date().toISOString(),
      duration: selectedProject.durationMonths,
      location: selectedProject.location,
    };

    const existing = JSON.parse(localStorage.getItem('investorInvestments')) || [];
    localStorage.setItem('investorInvestments', JSON.stringify([...existing, investment]));

    Swal.fire({
      icon: 'success',
      title: 'Investment Confirmed',
      text: `You have invested ₵${amount} in ${selectedProject.title}`,
      confirmButtonColor: '#16a34a',
    });
    
    setSelectedProject(null);
    setAmount('');
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-GH', {
      style: 'currency',
      currency: 'GHS',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const formatDeadline = (deadline) => {
    return new Date(deadline).toLocaleDateString('en-GB', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto space-y-6">
        <h2 className="text-2xl font-bold">Available Projects</h2>
        <div className="flex items-center justify-center py-12">
          <div className="flex items-center space-x-2">
            <svg className="animate-spin h-5 w-5 text-green-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="m4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <span className="text-gray-600">Loading investment opportunities...</span>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-6xl mx-auto space-y-6">
        <h2 className="text-2xl font-bold">Available Projects</h2>
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800">Error Loading Projects</h3>
              <div className="mt-2 text-sm text-red-700">
                <p>{error}</p>
              </div>
              <div className="mt-4">
                <button
                  onClick={() => window.location.reload()}
                  className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 text-sm"
                >
                  Try Again
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <h2 className="text-2xl font-bold">Available Projects</h2>

      <input
        type="text"
        placeholder="Search by title, location, or description..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
      />

      {filteredProjects.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-gray-500 text-lg">
            {searchTerm ? 'No projects match your search criteria.' : 'No investment opportunities available at the moment.'}
          </div>
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="mt-4 text-green-600 hover:text-green-700 underline"
            >
              Clear search
            </button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((proj) => (
            <div key={proj._id} className="bg-white p-6 border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start mb-3">
                <h3 className="font-semibold text-lg text-gray-900 line-clamp-2">{proj.title}</h3>
                <span className={`px-2 py-1 text-xs rounded-full ${
                  proj.status === 'active' ? 'bg-green-100 text-green-800' : 
                  proj.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 
                  'bg-gray-100 text-gray-800'
                }`}>
                  {proj.status}
                </span>
              </div>
              
              <p className="text-sm text-gray-600 mb-3 line-clamp-2">{proj.description}</p>
              
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">ROI:</span>
                  <span className="font-semibold text-green-600">{proj.roi}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Required:</span>
                  <span className="font-semibold">{formatCurrency(proj.amountRequired)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Duration:</span>
                  <span className="font-semibold">{proj.durationMonths} months</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Location:</span>
                  <span className="font-semibold">{proj.location}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Deadline:</span>
                  <span className="font-semibold text-red-600">{formatDeadline(proj.deadline)}</span>
                </div>
              </div>
              
              <button
                onClick={() => setSelectedProject(proj)}
                className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 w-full mt-4 transition-colors"
              >
                View Details & Invest
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Investment Modal */}
      {selectedProject && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white w-full max-w-lg p-6 rounded-lg shadow-xl relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setSelectedProject(null)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-2xl font-bold"
            >
              ×
            </button>
            
            <h3 className="text-xl font-bold mb-4 pr-8">{selectedProject.title}</h3>
            
            <div className="space-y-3 mb-6">
              <p className="text-gray-700">{selectedProject.description}</p>
              
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-600">ROI:</span>
                  <span className="ml-2 font-semibold text-green-600">{selectedProject.roi}%</span>
                </div>
                <div>
                  <span className="text-gray-600">Duration:</span>
                  <span className="ml-2 font-semibold">{selectedProject.durationMonths} months</span>
                </div>
                <div>
                  <span className="text-gray-600">Required:</span>
                  <span className="ml-2 font-semibold">{formatCurrency(selectedProject.amountRequired)}</span>
                </div>
                <div>
                  <span className="text-gray-600">Location:</span>
                  <span className="ml-2 font-semibold">{selectedProject.location}</span>
                </div>
                <div className="col-span-2">
                  <span className="text-gray-600">Deadline:</span>
                  <span className="ml-2 font-semibold text-red-600">{formatDeadline(selectedProject.deadline)}</span>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Enter Amount to Invest (GHS)
                </label>
                <input
                  type="number"
                  min="100"
                  max={selectedProject.amountRequired}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="e.g. 3000"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                />
                <p className="text-xs text-gray-500 mt-1">
                  Minimum: GHS 100 • Maximum: {formatCurrency(selectedProject.amountRequired)}
                </p>
              </div>
              
              <button
                onClick={handleInvest}
                disabled={!amount || amount <= 0}
                className="bg-green-600 text-white w-full py-3 rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Confirm Investment
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InvestorProjects;