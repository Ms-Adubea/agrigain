// components/VendorDashboard/AddNewListingForm.jsx

import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { apiAddListing, apiUpdateListing } from '../../services/vendor';

const AddNewListingForm = ({ onSuccess, editData, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    image: null,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (editData) {
      setFormData({
        name: editData.name || '',
        description: editData.description || '',
        price: editData.price || '',
        category: editData.category || '',
        image: null, // file input will remain empty
      });
    }
  }, [editData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const form = new FormData();
    form.append('name', formData.name);
    form.append('description', formData.description);
    form.append('price', formData.price);
    form.append('category', formData.category);
    if (formData.image) {
      form.append('image', formData.image);
    }

    try {
      if (editData?._id) {
        await apiUpdateListing(editData._id, form);
        Swal.fire('Updated!', 'Listing updated successfully.', 'success');
      } else {
        await apiAddListing(form);
        Swal.fire('Success', 'Listing added!', 'success');
      }

      if (onSuccess) onSuccess();
    } catch (err) {
      Swal.fire('Error', 'Could not submit listing.', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow space-y-4 max-w-xl">
      <h2 className="text-xl font-bold">{editData ? 'Edit Listing' : 'Add New Listing'}</h2>
      <input
        type="text"
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="Product Name"
        className="w-full border p-2 rounded"
        required
      />
      <textarea
        name="description"
        value={formData.description}
        onChange={handleChange}
        placeholder="Description"
        className="w-full border p-2 rounded"
        required
      />
      <input
        type="number"
        name="price"
        value={formData.price}
        onChange={handleChange}
        placeholder="Price"
        className="w-full border p-2 rounded"
        required
      />
      <input
        type="text"
        name="category"
        value={formData.category}
        onChange={handleChange}
        placeholder="Category"
        className="w-full border p-2 rounded"
        required
      />
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="w-full border p-2 rounded"
      />
      <div className="flex justify-between">
        <button
          type="button"
          onClick={onClose}
          className="text-sm text-gray-500 hover:underline"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 disabled:opacity-50"
        >
          {isSubmitting ? 'Submitting...' : editData ? 'Update' : 'Submit'}
        </button>
      </div>
    </form>
  );
};

export default AddNewListingForm;