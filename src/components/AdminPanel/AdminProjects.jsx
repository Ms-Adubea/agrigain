// AdminProjects.jsx with Pagination, Modal Form, Status Toggle, and Link to Detail Page
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import {
  apiGetAllProjects,
  apiCreateProject,
  apiUpdateProject,
  apiDeleteProject,
} from "../../services/admin";
import CreateInvestment from "./CreateInvestment";

const AdminProjects = () => {
  const [projects, setProjects] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const navigate = useNavigate();

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const data = await apiGetAllProjects();
        setProjects(data);
      } catch (err) {
        Swal.fire("Error", "Failed to fetch investment projects.", "error");
      }
    };
    fetchProjects();
  }, []);

 const handleAddOrUpdate = async (data, isEdit = false) => {
  try {
    if (isEdit && editingProject) {
      const { id, ...sanitizedData } = data; // remove _id
      const updated = await apiUpdateProject(_id, sanitizedData);
      setProjects((prev) =>
        prev.map((p) => (p.id === updated.id ? updated : p))
      );
      Swal.fire("Updated", "Project updated successfully.", "success");
    } else {
      const { investment } = await apiCreateProject(data);
      setProjects((prev) => [...prev, investment]);
      Swal.fire("Created", "Project created successfully.", "success");
    }
    setShowForm(false);
    setEditingProject(null);
  } catch (err) {
    Swal.fire("Error", "Failed to save project.", "error");
  }
};


  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "This will delete the project.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it",
    });

    if (confirm.isConfirmed) {
      try {
        await apiDeleteProject(id);
        setProjects((prev) => prev.filter((p) => p._id !== id));
        Swal.fire("Deleted", "Project has been deleted.", "success");
      } catch (err) {
        Swal.fire("Error", "Failed to delete project.", "error");
      }
    }
  };

  const toggleStatus = async (project) => {
    const updated = { ...project, status: project.status === "open" ? "closed" : "open" };
    try {
      await apiUpdateProject(project._id, updated);
      setProjects((prev) =>
        prev.map((p) => (p.id === project.id ? updated : p))
      );
    } catch {
      Swal.fire("Error", "Failed to update status.", "error");
    }
  };

  const filtered = projects
    .filter((p) => p.title.toLowerCase().includes(searchTerm.toLowerCase()))
    .filter((p) => (filterStatus ? p.status === filterStatus : true))
    .sort((a, b) => {
      if (sortBy === "roi") return b.roi - a.roi;
      if (sortBy === "durationMonths") return b.durationMonths - a.durationMonths;
      return 0;
    });

  const pageCount = Math.ceil(filtered.length / itemsPerPage);
  const paginated = filtered.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">Projects</h2>
        <button
          onClick={() => {
            setEditingProject(null);
            setShowForm(true);
          }}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          + Add New Project
        </button>
      </div>

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
          <option value="open">Open</option>
          <option value="closed">Closed</option>
        </select>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="">Sort By</option>
          <option value="roi">ROI</option>
          <option value="durationMonths">Duration</option>
        </select>
      </div>

      {paginated.length === 0 ? (
        <p>No matching projects found.</p>
      ) : (
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
          {paginated.map((proj) => (
            <div
              key={proj._id}
              className="bg-white border rounded shadow p-4 cursor-pointer"
              onClick={() => navigate(`/admin/projects/${proj._id}`)}
            >
              <h3 className="font-semibold text-lg mb-1">{proj.title}</h3>
              <p className="text-sm text-gray-600">ROI: {proj.roi}%</p>
              <p className="text-sm text-gray-600">Duration: {proj.durationMonths} months</p>
              <p className="text-sm text-gray-600">Funding: GH₵{proj.amountRequired}</p>
              <p className="text-xs text-gray-400">Status: {proj.status}</p>
              <div className="flex justify-end gap-2 mt-2">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setEditingProject(proj);
                    setShowForm(true);
                  }}
                  className="text-blue-600 text-sm hover:underline"
                >
                  Edit
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDelete(proj._id);
                  }}
                  className="text-red-600 text-sm hover:underline"
                >
                  Delete
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleStatus(proj);
                  }}
                  className="text-yellow-600 text-sm hover:underline"
                >
                  {proj.status === "open" ? "Close" : "Reopen"}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Pagination */}
      {pageCount > 1 && (
        <div className="flex justify-center gap-2 mt-4">
          {Array.from({ length: pageCount }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`px-3 py-1 border rounded ${
                page === currentPage ? 'bg-green-600 text-white' : 'bg-white'
              }`}
            >
              {page}
            </button>
          ))}
        </div>
      )}

      {showForm && (
        <CreateInvestment
          project={editingProject}
          onClose={() => {
            setShowForm(false);
            setEditingProject(null);
          }}
          onSubmit={handleAddOrUpdate}
        />
      )}
    </div>
  );
};

export default AdminProjects;