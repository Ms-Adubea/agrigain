import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { apiCreateProject } from '../../services/admin';


const CreateInvestment = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    roi: '',
    amountRequired: '',
    durationMonths: '',
    deadline: '',
    location: '',
    status: 'open'
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const payload = {
        ...formData,
        roi: Number(formData.roi),
        amountRequired: Number(formData.amountRequired),
        durationMonths: Number(formData.durationMonths)
      };

      const result = await apiCreateProject(payload);

      Swal.fire('Success', 'Investment created successfully!', 'success');

      // Reset form
      setFormData({
        title: '',
        description: '',
        roi: '',
        amountRequired: '',
        durationMonths: '',
        deadline: '',
        location: '',
        status: 'open'
      });
    } catch (error) {
      console.error('Failed to create investment:', error);
      Swal.fire(
        'Error',
        error.response?.data?.message || 'Something went wrong while creating investment.',
        'error'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto bg-white p-6 rounded-xl shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Create New Investment</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {[
          { name: 'title', label: 'Title' },
          { name: 'description', label: 'Description', type: 'textarea' },
          { name: 'roi', label: 'ROI (%)', type: 'number' },
          { name: 'amountRequired', label: 'Amount Required (GHS)', type: 'number' },
          { name: 'durationMonths', label: 'Duration (Months)', type: 'number' },
          { name: 'deadline', label: 'Deadline', type: 'date' },
          { name: 'location', label: 'Location' }
        ].map(({ name, label, type = 'text' }) => (
          <div key={name}>
            <label className="block text-sm font-medium text-gray-700">{label}</label>
            {type === 'textarea' ? (
              <textarea
                name={name}
                value={formData[name]}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-lg"
                rows="3"
                required
              />
            ) : (
              <input
                type={type}
                name={name}
                value={formData[name]}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-lg"
                required
              />
            )}
          </div>
        ))}

        <div>
          <label className="block text-sm font-medium text-gray-700">Status</label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-lg"
            required
          >
            <option value="open">Open</option>
            <option value="closed">Closed</option>
          </select>
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition ${
            loading ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          {loading ? 'Creating...' : 'Create Investment'}
        </button>
      </form>
    </div>
  );
};

export default CreateInvestment;
