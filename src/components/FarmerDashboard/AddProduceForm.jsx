import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { apiAddProduce } from '../../services/farmer';

const AddProduceForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    images: []
  });

  const [previews, setPreviews] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const newFiles = Array.from(e.target.files);
    
    // Validate file types
    const validFiles = newFiles.filter(file => file.type.startsWith('image/'));
    
    if (validFiles.length !== newFiles.length) {
      Swal.fire('Invalid Files', 'Please select only image files.', 'warning');
      return;
    }

    // Combine existing images with new ones
    const combinedImages = [...formData.images, ...validFiles];
    
    // Check for duplicates based on file name and size
    const uniqueImages = combinedImages.filter((file, index, arr) => {
      return arr.findIndex(f => f.name === file.name && f.size === file.size) === index;
    });

    // Limit to maximum 10 images to prevent overwhelming the form
    if (uniqueImages.length > 10) {
      Swal.fire('Too Many Images', `You can only upload a maximum of 10 images. You currently have ${formData.images.length} images and tried to add ${validFiles.length} more.`, 'warning');
      return;
    }

    setFormData({ ...formData, images: uniqueImages });
    
    // Create new previews for the newly added files only
    const newPreviews = validFiles.map(file => ({
      file,
      url: URL.createObjectURL(file),
      name: file.name,
      size: (file.size / 1024 / 1024).toFixed(2) // Size in MB
    }));
    
    // Combine existing previews with new ones, but remove duplicates
    const combinedPreviews = [...previews, ...newPreviews];
    const uniquePreviews = combinedPreviews.filter((preview, index, arr) => {
      return arr.findIndex(p => p.name === preview.name && p.size === preview.size) === index;
    });
    
    setPreviews(uniquePreviews);
    
    // Clear the file input so the same files can be selected again if needed
    e.target.value = '';
  };

  const removeImage = (indexToRemove) => {
    const updatedImages = formData.images.filter((_, index) => index !== indexToRemove);
    const updatedPreviews = previews.filter((_, index) => index !== indexToRemove);
    
    // Clean up the removed preview URL
    URL.revokeObjectURL(previews[indexToRemove].url);
    
    setFormData({ ...formData, images: updatedImages });
    setPreviews(updatedPreviews);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate minimum images requirement
    if (formData.images.length < 3) {
      return Swal.fire({
        title: 'Validation Error',
        text: 'Please upload at least 3 images to showcase your produce properly.',
        icon: 'warning',
        confirmButtonColor: '#16a34a'
      });
    }

    // Validate all required fields
    if (!formData.name.trim() || !formData.description.trim() || 
        !formData.price || !formData.category.trim()) {
      return Swal.fire({
        title: 'Missing Information',
        text: 'Please fill in all required fields.',
        icon: 'warning',
        confirmButtonColor: '#16a34a'
      });
    }

    setIsSubmitting(true);

    const form = new FormData();
    form.append('name', formData.name.trim());
    form.append('description', formData.description.trim());
    form.append('price', formData.price);
    form.append('category', formData.category.trim());
    
    // Append all images
    formData.images.forEach((img) => form.append('images', img));

    try {
      const data = await apiAddProduce(form);
      
      await Swal.fire({
        title: 'Success!',
        text: 'Your produce has been added successfully!',
        icon: 'success',
        confirmButtonColor: '#16a34a'
      });

      // Reset form
      setFormData({ name: '', description: '', price: '', category: '', images: [] });
      
      // Clean up preview URLs
      previews.forEach(preview => URL.revokeObjectURL(preview.url));
      setPreviews([]);
      
      // Reset file input
      const fileInput = document.querySelector('input[type="file"]');
      if (fileInput) fileInput.value = '';
      
    } catch (err) {
      console.error('Error adding produce:', err);
      Swal.fire({
        title: 'Error',
        text: err.response?.data?.message || 'Failed to add produce. Please try again.',
        icon: 'error',
        confirmButtonColor: '#16a34a'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Clean up object URLs when component unmounts
  React.useEffect(() => {
    return () => {
      previews.forEach(preview => URL.revokeObjectURL(preview.url));
    };
  }, []);

  return (
    <div className="max-w-4xl mx-auto bg-white p-6 rounded-xl shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Add New Produce</h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Produce Name *
            </label>
            <input
              type="text"
              name="name"
              placeholder="e.g., Fresh Tomatoes"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Category *
            </label>
            <input
              type="text"
              name="category"
              placeholder="e.g., Vegetables, Fruits"
              value={formData.category}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Price *
          </label>
          <input
            type="number"
            name="price"
            placeholder="Enter price"
            value={formData.price}
            onChange={handleChange}
            min="0"
            step="0.01"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Description *
          </label>
          <textarea
            name="description"
            placeholder="Describe your produce, its quality, origin, etc."
            value={formData.description}
            onChange={handleChange}
            rows="4"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
            required
          />
        </div>

        {/* Image Upload Section */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Product Images * (Minimum 3 required)
          </label>
          <div className="mt-1">
            <input
              type="file"
              name="images"
              multiple
              accept="image/*"
              onChange={handleFileChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-green-50 file:text-green-700 hover:file:bg-green-100"
            />
            <p className="mt-2 text-sm text-gray-500">
              Select multiple images to add to your produce gallery. You can select images multiple times to build your collection. (Max 10 images total)
            </p>
            {formData.images.length > 0 && (
              <p className="mt-1 text-sm text-green-600">
                Currently selected: {formData.images.length} image{formData.images.length !== 1 ? 's' : ''}
              </p>
            )}
          </div>
        </div>

        {/* Image Previews */}
        {previews.length > 0 && (
          <div>
            <h3 className="text-lg font-medium text-gray-700 mb-3">
              Image Previews ({previews.length}/3 minimum)
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {previews.map((preview, index) => (
                <div key={index} className="relative group">
                  <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
                    <img
                      src={preview.url}
                      alt={`Preview ${index + 1}`}
                      className="w-full h-full object-cover transition-transform group-hover:scale-105"
                    />
                  </div>
                  
                  {/* Image Info */}
                  <div className="mt-2 text-xs text-gray-500">
                    <p className="truncate" title={preview.name}>
                      {preview.name}
                    </p>
                    <p>{preview.size} MB</p>
                  </div>
                  
                  {/* Remove Button */}
                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-600 transition-colors shadow-lg"
                    title="Remove image"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
            
            {/* Status Indicator */}
            <div className="mt-4 p-3 rounded-lg bg-gray-50">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">
                  Images uploaded: {previews.length}
                </span>
                <span className={`text-sm font-medium ${
                  previews.length >= 3 ? 'text-green-600' : 'text-orange-600'
                }`}>
                  {previews.length >= 3 ? '✓ Requirement met' : `Need ${3 - previews.length} more`}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Submit Button */}
        <div className="pt-4">
          <button
            type="submit"
            disabled={isSubmitting || formData.images.length < 3}
            className={`w-full py-3 px-6 rounded-lg font-medium transition-colors ${
              isSubmitting || formData.images.length < 3
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-green-600 text-white hover:bg-green-700 focus:ring-2 focus:ring-green-500 focus:ring-offset-2'
            }`}
          >
            {isSubmitting ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Adding Produce...
              </span>
            ) : (
              'Add Produce'
            )}
          </button>
          
          {formData.images.length < 3 && (
            <p className="mt-2 text-sm text-orange-600 text-center">
              Please upload at least 3 images to enable submission
            </p>
          )}
        </div>
      </form>
    </div>
  );
};

export default AddProduceForm;