// components/FarmerDashboard/ProduceList.jsx

import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { apiDeleteProduce, apiUpdateProduce, apiGetUserProduce } from '../../services/farmer';

const ProduceList = () => {
  const [produceList, setProduceList] = useState([]);
  const [editItemId, setEditItemId] = useState(null);
  const [editForm, setEditForm] = useState({ name: '', description: '', price: '', category: '' });

  const fetchProduce = async () => {
    try {
      const data = await apiGetUserProduce();
      setProduceList(data);
    } catch (err) {
      Swal.fire('Error', 'Failed to fetch produce list.', 'error');
    }
  };

  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: 'Are you sure?',
      text: 'This will permanently delete the produce.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    });

    if (confirm.isConfirmed) {
      try {
        await apiDeleteProduce(id);
        Swal.fire('Deleted!', 'Produce has been deleted.', 'success');
        fetchProduce();
      } catch (err) {
        Swal.fire('Error', 'Failed to delete produce.', 'error');
      }
    }
  };

  const startEdit = (item) => {
    setEditItemId(item._id);
    setEditForm({
      name: item.name,
      description: item.description,
      price: item.price,
      category: item.category,
    });
  };

  const handleEditChange = (e) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  };

  const submitEdit = async (id) => {
    try {
      await apiUpdateProduce(id, editForm);
      Swal.fire('Updated!', 'Produce updated successfully.', 'success');
      setEditItemId(null);
      fetchProduce();
    } catch (err) {
      Swal.fire('Error', 'Failed to update produce.', 'error');
    }
  };

  useEffect(() => {
    fetchProduce();
  }, []);

  return (
    <div className="max-w-4xl mx-auto bg-white p-6 rounded-xl shadow-md">
      <h2 className="text-2xl font-bold mb-4">My Produce</h2>
      {produceList.length === 0 ? (
        <p>No produce added yet.</p>
      ) : (
        <div className="grid md:grid-cols-2 gap-4">
          {produceList.map((item) => (
            <div key={item._id} className="border rounded p-4 flex flex-col gap-2">
              <div className="flex gap-2 overflow-x-auto">
                {item.images.map((img, index) => (
                  <img
                    key={index}
                    src={img.url}
                    alt={item.name}
                    className="w-20 h-20 object-cover rounded border"
                  />
                ))}
              </div>
              {editItemId === item._id ? (
                <div className="space-y-2">
                  <input
                    type="text"
                    name="name"
                    value={editForm.name}
                    onChange={handleEditChange}
                    className="w-full p-2 border rounded"
                  />
                  <textarea
                    name="description"
                    value={editForm.description}
                    onChange={handleEditChange}
                    className="w-full p-2 border rounded"
                  />
                  <input
                    type="number"
                    name="price"
                    value={editForm.price}
                    onChange={handleEditChange}
                    className="w-full p-2 border rounded"
                  />
                  <input
                    type="text"
                    name="category"
                    value={editForm.category}
                    onChange={handleEditChange}
                    className="w-full p-2 border rounded"
                  />
                  <button
                    onClick={() => submitEdit(item._id)}
                    className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
                  >
                    Save
                  </button>
                </div>
              ) : (
                <>
                  <h3 className="text-lg font-semibold">{item.name}</h3>
                  <p>{item.description}</p>
                  <p className="text-green-600 font-bold">₦{item.price}</p>
                  <p className="text-sm italic">Category: {item.category}</p>
                  <div className="flex gap-2">
                    <button
                      onClick={() => startEdit(item)}
                      className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(item._id)}
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProduceList;
