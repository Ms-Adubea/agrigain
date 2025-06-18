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
    images: []
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [previewImages, setPreviewImages] = useState([]);

  useEffect(() => {
    if (editData) {
      setFormData({
        name: editData.name || '',
        description: editData.description || '',
        price: editData.price || '',
        category: editData.category || '',
        images: []
      });
      if (editData.images && editData.images.length > 0) {
        setPreviewImages(editData.images.map(img => img.url));
      }
    }
  }, [editData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    
    // Create preview URLs
    const newPreviewImages = files.map(file => URL.createObjectURL(file));
    setPreviewImages(prev => [...prev, ...newPreviewImages]);
    
    // Update form data with new files
    setFormData(prev => ({
      ...prev,
      images: [...prev.images, ...files]
    }));
  };

  const removeImage = (index) => {
    const newPreviewImages = [...previewImages];
    const newImages = [...formData.images];
    
    // Revoke the object URL to avoid memory leaks
    if (index < previewImages.length && !previewImages[index].includes('http')) {
      URL.revokeObjectURL(newPreviewImages[index]);
    }
    
    newPreviewImages.splice(index, 1);
    newImages.splice(index, 1);
    
    setPreviewImages(newPreviewImages);
    setFormData(prev => ({ ...prev, images: newImages }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const form = new FormData();
    form.append('name', formData.name);
    form.append('description', formData.description);
    form.append('price', formData.price);
    form.append('category', formData.category);
    
    // Append each image file
    formData.images.forEach((image, index) => {
      form.append('images', image);
    });

    try {
      let response;
      if (editData?._id) {
        response = await apiUpdateListing(editData._id, form);
        Swal.fire({
          title: 'Updated!',
          text: 'Listing updated successfully.',
          icon: 'success'
        });
      } else {
        response = await apiAddListing(form);
        Swal.fire({
          title: 'Success!',
          text: 'New listing added successfully.',
          icon: 'success'
        });
      }

      if (onSuccess) onSuccess();
    } catch (err) {
      console.error('Submission error:', err);
      Swal.fire({
        title: 'Error',
        text: err.response?.data?.message || 'Could not submit listing.',
        icon: 'error'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Clean up object URLs when component unmounts
  useEffect(() => {
    return () => {
      previewImages.forEach(preview => {
        if (!preview.includes('http')) {
          URL.revokeObjectURL(preview);
        }
      });
    };
  }, [previewImages]);

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-xl font-bold mb-4">
        {editData ? 'Edit Listing' : 'Add New Listing'}
      </h2>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Product Name"
          className="w-full border p-2 rounded"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Description"
          className="w-full border p-2 rounded"
          rows="3"
          required
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Price (₦)</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            placeholder="Price"
            className="w-full border p-2 rounded"
            min="0"
            step="0.01"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          >
            <option value="">Select a category</option>
            <option value="Fertilizer">Fertilizer</option>
            <option value="Pesticide">Pesticide</option>
            <option value="Seed">Seed</option>
            <option value="Equipment">Equipment</option>
            <option value="Feed">Animal Feed</option>
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Images</label>
        <div className="flex flex-wrap gap-2 mb-2">
          {previewImages.map((preview, index) => (
            <div key={index} className="relative">
              <img
                src={preview}
                alt={`Preview ${index}`}
                className="w-20 h-20 object-cover rounded border"
              />
              <button
                type="button"
                onClick={() => removeImage(index)}
                className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs"
              >
                ×
              </button>
            </div>
          ))}
        </div>
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="w-full border p-2 rounded"
          multiple
        />
        <p className="text-xs text-gray-500 mt-1">Upload one or more images (JPEG, PNG)</p>
      </div>

      <div className="flex justify-end gap-3 pt-4">
        <button
          type="button"
          onClick={onClose}
          className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
          disabled={isSubmitting}
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:opacity-50"
        >
          {isSubmitting ? (
            <span className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              {editData ? 'Updating...' : 'Submitting...'}
            </span>
          ) : editData ? 'Update Listing' : 'Add Listing'}
        </button>
      </div>
    </form>
  );
};

export default AddNewListingForm;