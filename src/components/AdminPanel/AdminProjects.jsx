// components/Admin/AdminProjects.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import ProjectDetailModal from "./ProjectDetailModal";

const dummyProjects = [
  {
    id: "1",
    title: "Rice Farm Expansion",
    roi: "18%",
    duration: "6 months",
    funding: "$80,000",
    status: "active",
  },
  {
    id: "2",
    title: "Greenhouse Tomatoes",
    roi: "22%",
    duration: "9 months",
    funding: "$120,000",
    status: "pending",
  },
];

const AdminProjects = () => {
  const [projects, setProjects] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    roi: "",
    duration: "",
    funding: "",
    description: "",
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [selectedProject, setSelectedProject] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Replace with actual API call
    setProjects(dummyProjects);
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editingId) {
      // Edit logic (replace with API)
      const updated = projects.map((p) =>
        p.id === editingId ? { ...p, ...formData } : p
      );
      setProjects(updated);
      Swal.fire("Updated", "Project updated successfully.", "success");
    } else {
      // Add logic (replace with API)
      setProjects([
        ...projects,
        { ...formData, id: Date.now().toString(), status: "active" },
      ]);
      Swal.fire("Success", "Project added successfully.", "success");
    }
    setShowForm(false);
    setFormData({
      title: "",
      roi: "",
      duration: "",
      funding: "",
      description: "",
    });
    setEditingId(null);
  };

  const openEditModal = (project) => {
    setFormData({ ...project });
    setEditingId(project.id);
    setShowForm(true);
  };

  const handleArchive = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This will archive the project.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, archive it",
    }).then((result) => {
      if (result.isConfirmed) {
        const updated = projects.map((p) =>
          p.id === id ? { ...p, status: "archived" } : p
        );
        setProjects(updated);
        Swal.fire("Archived!", "Project has been archived.", "success");
      }
    });
  };

  const filtered = projects
    .filter((p) => p.title.toLowerCase().includes(searchTerm.toLowerCase()))
    .filter((p) => (filterStatus ? p.status === filterStatus : true))
    .sort((a, b) => {
      if (sortBy === "roi") return parseFloat(b.roi) - parseFloat(a.roi);
      if (sortBy === "duration")
        return parseInt(b.duration) - parseInt(a.duration);
      return 0;
    });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">Projects</h2>
        <button
          onClick={() => setShowForm(true)}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          + Add New Project
        </button>
      </div>

      {/* Filter Controls */}
      <div className="flex flex-col md:flex-row gap-4 md:items-center md:justify-between">
        <input
          type="text"
          placeholder="Search projects..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border p-2 rounded w-full md:w-1/3"
        />
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="">All Statuses</option>
          <option value="active">Active</option>
          <option value="pending">Pending</option>
          <option value="archived">Archived</option>
        </select>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="">Sort By</option>
          <option value="roi">ROI</option>
          <option value="duration">Duration</option>
        </select>
      </div>

      {filtered.length === 0 ? (
        <p>No matching projects found.</p>
      ) : (
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
          {filtered.map((proj) => (
            <div
              key={proj.id}
              className="bg-white border rounded shadow p-4 cursor-pointer"
              //   onClick={() => setSelectedProject(proj)}
              onClick={() => navigate(`/admin/projects/${proj.id}`)}
            >
              <h3 className="font-semibold text-lg mb-1">{proj.title}</h3>
              <p className="text-sm text-gray-600">ROI: {proj.roi}</p>
              <p className="text-sm text-gray-600">Duration: {proj.duration}</p>
              <p className="text-sm text-gray-600">Funding: {proj.funding}</p>
              <p className="text-xs text-gray-400">Status: {proj.status}</p>
              <div className="flex justify-end gap-2 mt-2">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    openEditModal(proj);
                  }}
                  className="text-blue-600 text-sm hover:underline"
                >
                  Edit
                </button>

                <button
                  onClick={(e) => {
                    e.stopPropagation(); // Prevents opening the modal
                    handleArchive(proj.id);
                  }}
                  className="text-red-600 text-sm hover:underline"
                >
                  Archive
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal Form */}
      {showForm && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-30 flex items-center justify-center">
          <div className="bg-white p-6 rounded shadow-md w-full max-w-xl relative">
            <button
              onClick={() => {
                setShowForm(false);
                setEditingId(null);
                setFormData({
                  title: "",
                  roi: "",
                  duration: "",
                  funding: "",
                  description: "",
                });
              }}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-xl font-bold"
            >
              &times;
            </button>
            <h3 className="text-lg font-bold mb-4">
              {editingId ? "Edit Project" : "Add New Project"}
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Project Title"
                required
                className="w-full p-2 border rounded"
              />
              <input
                type="text"
                name="roi"
                value={formData.roi}
                onChange={handleChange}
                placeholder="Expected ROI (e.g. 20%)"
                required
                className="w-full p-2 border rounded"
              />
              <input
                type="text"
                name="duration"
                value={formData.duration}
                onChange={handleChange}
                placeholder="Duration (e.g. 6 months)"
                required
                className="w-full p-2 border rounded"
              />
              <input
                type="text"
                name="funding"
                value={formData.funding}
                onChange={handleChange}
                placeholder="Required Funding (e.g. $100,000)"
                required
                className="w-full p-2 border rounded"
              />
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Brief Description"
                rows={3}
                required
                className="w-full p-2 border rounded"
              />
              <button
                type="submit"
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
              >
                {editingId ? "Update Project" : "Submit Project"}
              </button>
            </form>
          </div>
        </div>
      )}

      <ProjectDetailModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </div>
  );
};

export default AdminProjects;
