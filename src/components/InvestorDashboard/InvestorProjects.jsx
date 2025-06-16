// components/InvestorDashboard/InvestorProjects.jsx
import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';

const mockProjects = [
  {
    id: 1,
    title: 'Cassava Farm - Brong Ahafo',
    roi: '22%',
    duration: '8 months',
    funding: '₵15,000',
    description:
      'An established cassava farm seeking final-round funding to scale operations and improve processing facilities.',
  },
  {
    id: 2,
    title: 'Plantain Farm - Western Region',
    roi: '18%',
    duration: '12 months',
    funding: '₵25,000',
    description:
      'This project will expand a growing plantain plantation and introduce irrigation to boost yields.',
  },
  {
    id: 3,
    title: 'Poultry Project - Eastern Region',
    roi: '30%',
    duration: '6 months',
    funding: '₵10,000',
    description:
      'Support a profitable poultry business raising broilers for local markets with guaranteed buy-back.',
  },
];

const InvestorProjects = () => {
  const [selectedProject, setSelectedProject] = useState(null);
  const [amount, setAmount] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [projects, setProjects] = useState(mockProjects);

  useEffect(() => {
    if (searchTerm.trim()) {
      setProjects(
        mockProjects.filter((p) =>
          p.title.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    } else {
      setProjects(mockProjects);
    }
  }, [searchTerm]);

  const handleInvest = () => {
    const investment = {
      title: selectedProject.title,
      amount,
      roi: selectedProject.roi,
      date: new Date().toISOString(),
      duration: selectedProject.duration,
    };

    const existing = JSON.parse(localStorage.getItem('investorInvestments')) || [];
    localStorage.setItem('investorInvestments', JSON.stringify([...existing, investment]));

    Swal.fire('Investment Confirmed', `You have invested ₵${amount} in ${selectedProject.title}`, 'success');
    setSelectedProject(null);
    setAmount('');
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <h2 className="text-2xl font-bold">Available Projects</h2>

      <input
        type="text"
        placeholder="Search by title..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full p-2 border rounded mb-4"
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {projects.map((proj) => (
          <div key={proj.id} className="bg-white p-4 border rounded shadow">
            <h3 className="font-semibold text-lg mb-1">{proj.title}</h3>
            <p className="text-sm text-gray-600 mb-1">ROI: <strong>{proj.roi}</strong></p>
            <p className="text-sm text-gray-600 mb-1">Funding Needed: {proj.funding}</p>
            <p className="text-sm text-gray-600 mb-2">Duration: {proj.duration}</p>
            <button
              onClick={() => setSelectedProject(proj)}
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 w-full"
            >
              View Details
            </button>
          </div>
        ))}
      </div>

      {/* Modal */}
      {selectedProject && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white w-full max-w-lg p-6 rounded-lg shadow-xl relative">
            <button
              onClick={() => setSelectedProject(null)}
              className="absolute top-2 right-2 text-gray-600 hover:text-black text-xl font-bold"
            >
              ×
            </button>
            <h3 className="text-xl font-bold mb-2">{selectedProject.title}</h3>
            <p className="text-sm text-gray-500 mb-2">{selectedProject.description}</p>
            <p className="text-sm mb-1"><strong>ROI:</strong> {selectedProject.roi}</p>
            <p className="text-sm mb-1"><strong>Funding Goal:</strong> {selectedProject.funding}</p>
            <p className="text-sm mb-4"><strong>Duration:</strong> {selectedProject.duration}</p>
            <label className="block mb-1 text-sm font-medium">Enter Amount to Invest</label>
            <input
              type="number"
              min="100"
              className="w-full p-2 border rounded mb-4"
              placeholder="e.g. 3000"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
            <button
              onClick={handleInvest}
              disabled={!amount}
              className="bg-green-600 text-white w-full py-2 rounded hover:bg-green-700 disabled:opacity-50"
            >
              Confirm Investment
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default InvestorProjects;