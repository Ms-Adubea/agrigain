// pages/investor/InvestorProjectPage.jsx
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';

const dummyProjects = [
  {
    id: '1',
    title: 'Rice Farm Expansion',
    roi: '18%',
    duration: '6 months',
    funding: '$80,000',
    status: 'active',
    description: 'Expand our rice production with modern irrigation equipment and improved seeds.'
  },
  {
    id: '2',
    title: 'Greenhouse Tomatoes',
    roi: '22%',
    duration: '9 months',
    funding: '$120,000',
    status: 'pending',
    description: 'Launch a climate-controlled greenhouse for year-round tomato supply to urban markets.'
  }
];

const InvestorProjectPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);

  useEffect(() => {
    // Replace with API fetch logic
    const found = dummyProjects.find((p) => p.id === id);
    setProject(found);
  }, [id]);

  if (!project) return <div className="p-6">Project not found.</div>;

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <button
        onClick={() => navigate(-1)}
        className="mb-4 flex items-center text-sm text-green-700 hover:underline"
      >
        <ChevronLeft className="mr-1" size={16} /> Back to Projects
      </button>

      <h1 className="text-2xl font-bold mb-1">{project.title}</h1>
      <p className="text-gray-500 text-sm mb-4 capitalize">Status: {project.status}</p>

      <div className="space-y-2">
        <p><strong>ROI:</strong> {project.roi}</p>
        <p><strong>Duration:</strong> {project.duration}</p>
        <p><strong>Funding:</strong> {project.funding}</p>
        <p><strong>Description:</strong></p>
        <p className="whitespace-pre-wrap text-gray-700 text-sm">{project.description}</p>
      </div>

      <div className="mt-6">
        <button
          onClick={() => alert('Investment flow coming soon!')}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Invest Now
        </button>
      </div>
    </div>
  );
};

export default InvestorProjectPage;