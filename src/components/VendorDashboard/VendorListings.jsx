// // components/VendorDashboard/VendorListings.jsx
// import React, { useEffect, useState } from 'react';
// import Swal from 'sweetalert2';
// import { apiDeleteListing, apiGetVendorListings } from '../../services/vendor';


// const VendorListings = () => {
//   const [listings, setListings] = useState([]);

//   const fetchListings = async () => {
//     try {
//       const data = await apiGetVendorListings();
//       setListings(data);
//     } catch (err) {
//       Swal.fire('Error', 'Failed to load listings.', 'error');
//     }
//   };

//   const handleDelete = async (id) => {
//     const confirm = await Swal.fire({
//       title: 'Delete this listing?',
//       text: 'This action cannot be undone.',
//       icon: 'warning',
//       showCancelButton: true,
//       confirmButtonText: 'Yes, delete it',
//     });

//     if (confirm.isConfirmed) {
//       try {
//         await apiDeleteListing(id);
//         Swal.fire('Deleted!', 'Listing removed.', 'success');
//         fetchListings();
//       } catch (err) {
//         Swal.fire('Error', 'Could not delete listing.', 'error');
//       }
//     }
//   };

//   useEffect(() => {
//     fetchListings();
//   }, []);

//   return (
//     <div className="max-w-6xl mx-auto space-y-6">
//       <div className="flex justify-between items-center">
//         <h2 className="text-2xl font-bold">My Listings</h2>
//         <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
//           Add New Listing
//         </button>
//       </div>

//       {listings.length === 0 ? (
//         <p>No listings found.</p>
//       ) : (
//         <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
//           {listings.map((item) => (
//             <div
//               key={item._id}
//               className="bg-white p-4 border rounded shadow space-y-2"
//             >
//               <img
//                 src={item.image?.url || '/placeholder.jpg'}
//                 alt={item.name}
//                 className="w-full h-32 object-cover rounded"
//               />
//               <h3 className="font-semibold text-lg">{item.name}</h3>
//               <p className="text-sm text-gray-500">{item.description}</p>
//               <p className="text-green-600 font-bold">₦{item.price}</p>

//               <div className="flex gap-2">
//                 <button className="text-blue-600 hover:underline">Edit</button>
//                 <button
//                   onClick={() => handleDelete(item._id)}
//                   className="text-red-600 hover:underline"
//                 >
//                   Delete
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default VendorListings;


import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import AddNewListingForm from './AddNewListingForm';
import {
  apiGetVendorListings,
  apiDeleteListing,
} from '../../services/vendor';

const VendorListings = () => {
  const [listings, setListings] = useState([]);
  const [modalState, setModalState] = useState({ show: false, mode: 'add', listing: null });

  const fetchListings = async () => {
    try {
      const data = await apiGetVendorListings();
      setListings(data);
    } catch (err) {
      Swal.fire('Error', 'Failed to load listings.', 'error');
    }
  };

  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: 'Delete this listing?',
      text: 'This action cannot be undone.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it',
    });

    if (confirm.isConfirmed) {
      try {
        await apiDeleteListing(id);
        Swal.fire('Deleted!', 'Listing removed.', 'success');
        fetchListings();
      } catch (err) {
        Swal.fire('Error', 'Could not delete listing.', 'error');
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

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">My Listings</h2>
        <button
          onClick={openAddModal}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Add New Listing
        </button>
      </div>

      {listings.length === 0 ? (
        <p>No listings found.</p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {listings.map((item) => (
            <div
              key={item._id}
              className="bg-white p-4 border rounded shadow space-y-2"
            >
              <img
                src={item.image?.url || '/placeholder.jpg'}
                alt={item.name}
                className="w-full h-32 object-cover rounded"
              />
              <h3 className="font-semibold text-lg">{item.name}</h3>
              <p className="text-sm text-gray-500">{item.description}</p>
              <p className="text-green-600 font-bold">₦{item.price}</p>

              <div className="flex gap-2">
                <button
                  onClick={() => openEditModal(item)}
                  className="text-blue-600 hover:underline"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(item._id)}
                  className="text-red-600 hover:underline"
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
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-xl relative w-full max-w-xl">
            <button
              onClick={() => setModalState({ show: false, mode: 'add', listing: null })}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 text-xl font-bold"
            >
              ×
            </button>
            <AddNewListingForm
              onSuccess={handleSuccess}
              onClose={() => setModalState({ show: false, mode: 'add', listing: null })}
              editData={modalState.listing}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default VendorListings;