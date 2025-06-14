// components/FarmerDashboard/MarketplaceViewer.jsx

import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { apiGetMarketplaceProducts } from '../../services/vendor';


const MarketplaceViewer = () => {
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [filter, setFilter] = useState({ category: '', priceRange: '', sort: '' });

  const fetchMarketplace = async () => {
    try {
      const data = await apiGetMarketplaceProducts();
      setProducts(data);
      setFiltered(data);
    } catch (err) {
      Swal.fire('Error', 'Failed to load marketplace products.', 'error');
    }
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilter((prev) => ({ ...prev, [name]: value }));
  };

  const handleBuyNow = (product) => {
    Swal.fire({
      title: 'Buy Now',
      text: `Are you sure you want to purchase ${product.name} for ₦${product.price}?`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes, Buy',
      cancelButtonText: 'Cancel',
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire('Success', 'Your order has been placed!', 'success');
      }
    });
  };

  useEffect(() => {
    fetchMarketplace();
  }, []);

  useEffect(() => {
    let result = [...products];
    if (filter.category) {
      result = result.filter((p) => p.category === filter.category);
    }
    if (filter.priceRange) {
      const [min, max] = filter.priceRange.split('-').map(Number);
      result = result.filter((p) => p.price >= min && p.price <= max);
    }
    if (filter.sort === 'name') {
      result.sort((a, b) => a.name.localeCompare(b.name));
    } else if (filter.sort === 'price-asc') {
      result.sort((a, b) => a.price - b.price);
    } else if (filter.sort === 'price-desc') {
      result.sort((a, b) => b.price - a.price);
    }
    setFiltered(result);
  }, [filter, products]);

  return (
    <div className="max-w-5xl mx-auto bg-white p-6 rounded-xl shadow-md">
      <h2 className="text-2xl font-bold mb-4">Agro Input Marketplace</h2>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 mb-6">
        <select
          name="category"
          onChange={handleFilterChange}
          value={filter.category}
          className="p-2 border rounded"
        >
          <option value="">All Categories</option>
          <option value="Fertilizer">Fertilizer</option>
          <option value="Pesticide">Pesticide</option>
          <option value="Seed">Seed</option>
        </select>

        <select
          name="priceRange"
          onChange={handleFilterChange}
          value={filter.priceRange}
          className="p-2 border rounded"
        >
          <option value="">All Prices</option>
          <option value="0-5000">₦0 - ₦5,000</option>
          <option value="5000-15000">₦5,000 - ₦15,000</option>
          <option value="15000-100000">₦15,000 and above</option>
        </select>

        <select
          name="sort"
          onChange={handleFilterChange}
          value={filter.sort}
          className="p-2 border rounded"
        >
          <option value="">Sort By</option>
          <option value="name">Name (A-Z)</option>
          <option value="price-asc">Price (Low to High)</option>
          <option value="price-desc">Price (High to Low)</option>
        </select>
      </div>

      {filtered.length === 0 ? (
        <p>No agro inputs match the selected filters.</p>
      ) : (
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
          {filtered.map((product) => (
            <div
              key={product._id}
              className="border rounded-xl p-4 shadow hover:shadow-lg transition flex flex-col"
            >
              <img
                src={product.image?.url || '/placeholder.jpg'}
                alt={product.name}
                className="w-full h-40 object-cover rounded mb-3"
              />
              <h3 className="text-lg font-semibold mb-1">{product.name}</h3>
              <p className="text-sm text-gray-600 mb-2">{product.description}</p>
              <p className="text-green-700 font-bold">₦{product.price}</p>
              <p className="text-sm italic">Category: {product.category}</p>
              <p className="text-sm italic mb-2">Vendor: {product.vendorName}</p>
              <button
                onClick={() => handleBuyNow(product)}
                className="mt-auto bg-blue-600 text-white px-3 py-2 rounded hover:bg-blue-700"
              >
                Buy Now
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MarketplaceViewer;
