// components/FarmerDashboard/AddProduceForm.jsx

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

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setFormData({ ...formData, images: files });
    setPreviews(files.map(file => URL.createObjectURL(file)));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.images.length < 3) {
      return Swal.fire('Validation Error', 'Please upload at least 3 images.', 'warning');
    }

    const form = new FormData();
    form.append('name', formData.name);
    form.append('description', formData.description);
    form.append('price', formData.price);
    form.append('category', formData.category);
    formData.images.forEach((img) => form.append('images', img));

    try {
      const data = await apiAddProduce(form);
      Swal.fire('Success', 'Produce added successfully!', 'success');
      setFormData({ name: '', description: '', price: '', category: '', images: [] });
      setPreviews([]);
    } catch (err) {
      Swal.fire('Error', err.response?.data?.message || 'Failed to add produce', 'error');
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-6 rounded-xl shadow-md">
      <h2 className="text-2xl font-bold mb-4">Add New Produce</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Produce Name"
          value={formData.name}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={formData.price}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="text"
          name="category"
          placeholder="Category"
          value={formData.category}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="file"
          name="images"
          multiple
          accept="image/*"
          onChange={handleFileChange}
          className="w-full p-2 border rounded"
          required
        />

        {previews.length > 0 && (
          <div className="flex flex-wrap gap-4">
            {previews.map((src, index) => (
              <img
                key={index}
                src={src}
                alt={`preview-${index}`}
                className="w-24 h-24 object-cover rounded border"
              />
            ))}
          </div>
        )}

        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddProduceForm;
