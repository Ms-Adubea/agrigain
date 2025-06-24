// AdminProjectPage.jsx (Updated with Pagination, Status Toggle, Full Detail Page, Edit Modal)
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ChevronLeft, Pencil, ToggleLeft, ToggleRight } from 'lucide-react';
import Swal from 'sweetalert2';

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

const AdminProjectPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    const found = dummyProjects.find((proj) => proj.id === id);
    setProject(found);
    setFormData(found);
  }, [id]);

  const toggleStatus = () => {
    const updatedStatus = project.status === 'active' ? 'pending' : 'active';
    setProject((prev) => ({ ...prev, status: updatedStatus }));
    Swal.fire('Status Updated', `Project marked as ${updatedStatus}`, 'success');
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setProject(formData);
    setEditModalOpen(false);
    Swal.fire('Updated', 'Project updated successfully', 'success');
  };

  if (!project) {
    return <div className="p-6">Project not found.</div>;
  }

  return (
    <div className="p-6 max-w-3xl mx-auto relative">
      <button
        onClick={() => navigate(-1)}
        className="mb-4 flex items-center text-sm text-green-700 hover:underline"
      >
        <ChevronLeft className="mr-1" size={16} /> Back to Projects
      </button>

      <div className="flex justify-between items-center mb-2">
        <h1 className="text-2xl font-bold">{project.title}</h1>
        <div className="flex gap-2 items-center">
          <button onClick={() => setEditModalOpen(true)} className="text-sm text-blue-600 flex items-center hover:underline">
            <Pencil size={16} className="mr-1" /> Edit
          </button>
          <button onClick={toggleStatus} className="text-sm text-gray-600 hover:text-green-600">
            {project.status === 'active' ? <ToggleRight size={24} /> : <ToggleLeft size={24} />}
          </button>
        </div>
      </div>

      <p className="text-gray-500 text-sm mb-4 capitalize">Status: {project.status}</p>

      <div className="space-y-2">
        <p><strong>ROI:</strong> {project.roi}</p>
        <p><strong>Duration:</strong> {project.duration}</p>
        <p><strong>Funding:</strong> {project.funding}</p>
        <p><strong>Description:</strong></p>
        <p className="whitespace-pre-wrap text-gray-700 text-sm">{project.description}</p>
      </div>

      {editModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-md max-w-md w-full shadow-xl relative">
            <button
              onClick={() => setEditModalOpen(false)}
              className="absolute top-2 right-3 text-lg font-bold text-gray-500 hover:text-gray-700"
            >
              ×
            </button>
            <h2 className="text-xl font-semibold mb-4">Edit Project</h2>
            <form onSubmit={handleFormSubmit} className="space-y-3">
              <input
                name="title"
                value={formData.title || ''}
                onChange={handleInputChange}
                placeholder="Title"
                className="w-full p-2 border rounded"
                required
              />
              <input
                name="roi"
                value={formData.roi || ''}
                onChange={handleInputChange}
                placeholder="ROI"
                className="w-full p-2 border rounded"
              />
              <input
                name="duration"
                value={formData.duration || ''}
                onChange={handleInputChange}
                placeholder="Duration"
                className="w-full p-2 border rounded"
              />
              <input
                name="funding"
                value={formData.funding || ''}
                onChange={handleInputChange}
                placeholder="Funding"
                className="w-full p-2 border rounded"
              />
              <textarea
                name="description"
                value={formData.description || ''}
                onChange={handleInputChange}
                placeholder="Description"
                className="w-full p-2 border rounded"
                rows="4"
              />
              <button
                type="submit"
                className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 w-full"
              >
                Save Changes
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminProjectPage;