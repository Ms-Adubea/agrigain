// components/VendorDashboard/VendorListings.jsx
import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import AddNewListingForm from './AddNewListingForm';
import { apiGetVendorListings, apiDeleteListing } from '../../services/vendor';

const VendorListings = () => {
  const [listingsData, setListingsData] = useState({
    count: 0,
    assets: []
  });
  const [modalState, setModalState] = useState({ 
    show: false, 
    mode: 'add', 
    listing: null 
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchListings = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await apiGetVendorListings();
      // Ensure we have the correct response structure
      const data = {
        count: response?.count || 0,
        assets: Array.isArray(response?.assets) ? response.assets : []
      };
      setListingsData(data);
    } catch (err) {
      console.error('Failed to fetch listings:', err);
      setError(err.response?.data?.message || 'Failed to load listings.');
      setListingsData({ count: 0, assets: [] });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: 'Delete this listing?',
      text: 'This action cannot be undone.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it',
      confirmButtonColor: '#d33',
      cancelButtonText: 'Cancel'
    });

    if (confirm.isConfirmed) {
      try {
        await apiDeleteListing(id);
        Swal.fire('Deleted!', 'Listing removed successfully.', 'success');
        fetchListings();
      } catch (err) {
        Swal.fire('Error', err.response?.data?.message || 'Could not delete listing.', 'error');
      }
    }
  };

  const handleSuccess = () => {
    setModalState({ show: false, mode: 'add', listing: null });
    fetchListings();
  };

  const openAddModal = () => {
    setModalState({ show: true, mode: 'add', listing: null });
  };

  const openEditModal = (listing) => {
    setModalState({ show: true, mode: 'edit', listing });
  };

  useEffect(() => {
    fetchListings();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
        <strong className="font-bold">Error!</strong>
        <span className="block sm:inline"> {error}</span>
        <button 
          onClick={fetchListings}
          className="absolute top-0 bottom-0 right-0 px-4 py-3"
        >
          <svg className="fill-current h-6 w-6 text-red-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
            <path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z"/>
          </svg>
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="bg-white rounded-xl shadow-md p-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <h2 className="text-2xl font-bold mb-4 md:mb-0">
            My Listings <span className="text-sm font-normal text-gray-500">({listingsData.count} items)</span>
          </h2>
          <button
            onClick={openAddModal}
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-md transition-colors"
          >
            Add New Listing
          </button>
        </div>

        {listingsData.assets.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg mb-4">You haven't created any listings yet.</p>
            <button
              onClick={openAddModal}
              className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-md"
            >
              Create Your First Listing
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {listingsData.assets.map((item) => (
              <div
                key={item._id}
                className="border rounded-xl p-4 shadow hover:shadow-lg transition-all duration-200 flex flex-col"
              >
                <div className="relative pb-[75%] mb-4 overflow-hidden rounded-lg">
                  <img
                    src={item.images?.[0]?.url || '/placeholder-product.jpg'}
                    alt={item.name}
                    className="absolute top-0 left-0 w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
                
                <div className="flex-grow">
                  <h3 className="text-lg font-semibold mb-1 line-clamp-2">{item.name}</h3>
                  <p className="text-gray-600 text-sm mb-2 line-clamp-3">{item.description}</p>
                  <p className="text-green-700 font-bold text-lg mb-3">₵{item.price.toLocaleString()}</p>

                  <p className="text-sm text-gray-500">Category: {item.category}</p>
                </div>
                
                <div className="flex gap-2 mt-4">
                  <button
                    onClick={() => openEditModal(item)}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-3 rounded-md text-sm"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(item._id)}
                    className="flex-1 bg-red-500 hover:bg-red-600 text-white py-2 px-3 rounded-md text-sm"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Modal */}
        {modalState.show && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white p-6 rounded-xl shadow-xl relative w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <button
                onClick={() => setModalState({ show: false, mode: 'add', listing: null })}
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 text-2xl font-bold"
              >
                &times;
              </button>
              <h3 className="text-xl font-bold mb-4">
                {modalState.mode === 'add' ? 'Add New Listing' : 'Edit Listing'}
              </h3>
              <AddNewListingForm
                onSuccess={handleSuccess}
                onClose={() => setModalState({ show: false, mode: 'add', listing: null })}
                editData={modalState.listing}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default VendorListings;