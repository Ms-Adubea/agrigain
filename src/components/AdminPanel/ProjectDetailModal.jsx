// components/Admin/ProjectDetailModal.jsx
import React from 'react';

const ProjectDetailModal = ({ project, onClose }) => {
  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-2xl relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-xl font-bold text-gray-500 hover:text-gray-700"
        >
          &times;
        </button>

        <h2 className="text-2xl font-bold mb-2">{project.title}</h2>
        <p className="text-sm text-gray-600 mb-4">Status: <span className="font-semibold capitalize">{project.status}</span></p>

        <div className="space-y-2">
          <p><strong>ROI:</strong> {project.roi}</p>
          <p><strong>Duration:</strong> {project.duration}</p>
          <p><strong>Funding:</strong> {project.funding}</p>
          <p><strong>Description:</strong></p>
          <p className="text-sm text-gray-700 whitespace-pre-wrap">{project.description}</p>
        </div>

        <div className="mt-6 flex justify-end gap-3">
          <button
            onClick={() => alert('Edit logic TBD')}
            className="px-4 py-2 text-sm bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Edit
          </button>
          <button
            onClick={() => alert('Archive logic TBD')}
            className="px-4 py-2 text-sm bg-red-600 text-white rounded hover:bg-red-700"
          >
            Archive
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetailModal;