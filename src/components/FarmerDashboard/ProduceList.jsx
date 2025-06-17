// components/FarmerDashboard/ProduceList.jsx
import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { apiDeleteProduce, apiUpdateProduce, apiGetUserProduce } from '../../services/farmer';

const ProduceList = () => {
  const [produceData, setProduceData] = useState({
    count: 0,
    produce: []
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editItemId, setEditItemId] = useState(null);
  const [editForm, setEditForm] = useState({ 
    name: '', 
    description: '', 
    price: '', 
    category: '' 
  });

  const fetchProduce = async () => {
    setLoading(true);
    setError(null);
    try {
      console.log('Fetching produce...');
      const response = await apiGetUserProduce();
      console.log('Raw API response:', response);
      
      // Handle both cases: response.data or direct response
      const responseData = response.data || response;
      console.log('Response data:', responseData);
      
      // Ensure we have the correct response structure
      const data = {
        count: responseData?.count || 0,
        produce: Array.isArray(responseData?.produce) ? responseData.produce : []
      };
      
      console.log('Processed data:', data);
      setProduceData(data);
    } catch (err) {
      console.error('Failed to fetch produce:', err);
      console.error('Error details:', {
        message: err.message,
        status: err.response?.status,
        statusText: err.response?.statusText,
        data: err.response?.data
      });
      
      setError(err.response?.data?.message || err.message || 'Failed to load produce. Please try again.');
      setProduceData({ count: 0, produce: [] });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: 'Are you sure?',
      text: 'This will permanently delete the produce item.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    });

    if (confirm.isConfirmed) {
      try {
        await apiDeleteProduce(id);
        Swal.fire('Deleted!', 'Produce item has been deleted.', 'success');
        fetchProduce();
      } catch (err) {
        Swal.fire('Error', err.response?.data?.message || 'Failed to delete produce.', 'error');
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
      Swal.fire('Error', err.response?.data?.message || 'Failed to update produce.', 'error');
    }
  };

  useEffect(() => {
    fetchProduce();
  }, []);

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto bg-white p-6 rounded-xl shadow-md">
        <div className="flex justify-center items-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading your produce...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-6xl mx-auto bg-white p-6 rounded-xl shadow-md">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
          <div className="flex items-center justify-between">
            <div>
              <strong className="font-bold">Error Loading Produce!</strong>
              <span className="block sm:inline ml-2">{error}</span>
            </div>
            <button 
              onClick={fetchProduce}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded ml-4"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto bg-white p-6 rounded-xl shadow-md">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">My Produce</h2>
        <div className="flex items-center gap-4">
          <span className="text-gray-600 bg-gray-100 px-3 py-1 rounded-full">
            Total: {produceData.count} items
          </span>
          <button
            onClick={fetchProduce}
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded transition-colors"
          >
            Refresh
          </button>
        </div>
      </div>
      
      {produceData.produce.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <div className="max-w-md mx-auto">
            <div className="w-24 h-24 mx-auto mb-4 bg-gray-200 rounded-full flex items-center justify-center">
              <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No Produce Items Yet</h3>
            <p className="text-gray-500 text-sm mb-6">
              You haven't added any produce items to your inventory. Start by adding your first product!
            </p>
            <div className="flex gap-3 justify-center">
              <button
                onClick={fetchProduce}
                className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-2 rounded transition-colors"
              >
                Check Again
              </button>
              <button
                onClick={() => window.location.reload()}
                className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded transition-colors"
              >
                Add Produce
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {produceData.produce.map((item) => (
            <div key={item._id} className="border border-gray-200 rounded-lg p-4 flex flex-col gap-3 hover:shadow-lg transition-shadow bg-white">
              {/* Image Gallery */}
              {item.images?.length > 0 && (
                <div className="flex gap-2 overflow-x-auto pb-2">
                  {item.images.map((img, index) => (
                    <img
                      key={img._id || index}
                      src={img.url}
                      alt={`${item.name} - Image ${index + 1}`}
                      className="w-20 h-20 object-cover rounded border flex-shrink-0 hover:scale-105 transition-transform cursor-pointer"
                      onError={(e) => {
                        e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjI0IiBoZWlnaHQ9IjI0IiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0xMiAxNkM5Ljc5IDEzLjc5IDkuNzkgMTAuMjEgMTIgOEM5Ljc5IDUuNzkgMTAuMjEgNS43OSAxMiA4QzE0LjIxIDEwLjIxIDE0LjIxIDEzLjc5IDEyIDE2WiIgZmlsbD0iIzlDQTNBRiIvPgo8L3N2Zz4K';
                      }}
                    />
                  ))}
                </div>
              )}
              
              {/* Edit Mode */}
              {editItemId === item._id ? (
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                    <input
                      type="text"
                      name="name"
                      value={editForm.name}
                      onChange={handleEditChange}
                      className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                    <textarea
                      name="description"
                      value={editForm.description}
                      onChange={handleEditChange}
                      className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                      rows="3"
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Price (₦)</label>
                      <input
                        type="number"
                        name="price"
                        value={editForm.price}
                        onChange={handleEditChange}
                        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                        min="0"
                        step="0.01"
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                      <input
                        type="text"
                        name="category"
                        value={editForm.category}
                        onChange={handleEditChange}
                        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                      />
                    </div>
                  </div>
                  
                  <div className="flex gap-2 mt-4">
                    <button
                      onClick={() => submitEdit(item._id)}
                      className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 flex-1 transition-colors"
                    >
                      Save Changes
                    </button>
                    <button
                      onClick={() => setEditItemId(null)}
                      className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 flex-1 transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  {/* View Mode */}
                  <div className="flex-grow">
                    <h3 className="text-xl font-semibold mb-2 text-gray-800">{item.name}</h3>
                    <p className="text-gray-600 mb-3 text-sm line-clamp-3">{item.description}</p>
                    
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-green-600 font-bold text-lg">₦{Number(item.price).toLocaleString()}</span>
                      <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                        {item.category}
                      </span>
                    </div>
                    
                    <div className="text-xs text-gray-500 space-y-1">
                      <p>📅 Created: {new Date(item.createdAt).toLocaleDateString('en-US', { 
                        year: 'numeric', 
                        month: 'short', 
                        day: 'numeric' 
                      })}</p>
                      <p>🔄 Updated: {new Date(item.updatedAt).toLocaleDateString('en-US', { 
                        year: 'numeric', 
                        month: 'short', 
                        day: 'numeric' 
                      })}</p>
                      {item.images?.length > 0 && (
                        <p>🖼️ Images: {item.images.length}</p>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex gap-2 mt-4">
                    <button
                      onClick={() => startEdit(item)}
                      className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg flex-1 transition-colors"
                    >
                      ✏️ Edit
                    </button>
                    <button
                      onClick={() => handleDelete(item._id)}
                      className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg flex-1 transition-colors"
                    >
                      🗑️ Delete
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