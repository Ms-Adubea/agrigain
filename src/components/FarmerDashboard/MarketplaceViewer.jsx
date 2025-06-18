// // components/FarmerDashboard/MarketplaceViewer.jsx
// import React, { useEffect, useState } from 'react';
// import Swal from 'sweetalert2';
// import { apiGetMarketplaceProducts } from '../../services/vendor';

// const MarketplaceViewer = () => {
//   const [products, setProducts] = useState([]);
//   const [filtered, setFiltered] = useState([]);
//   const [filter, setFilter] = useState({ 
//     category: '', 
//     priceRange: '', 
//     sort: '' 
//   });
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   const fetchMarketplace = async () => {
//     setLoading(true);
//     setError(null);
//     try {
//       const response = await apiGetMarketplaceProducts();
//       // Ensure we're working with an array
//       const data = Array.isArray(response?.data) ? response.data : [];
//       setProducts(data);
//       setFiltered(data);
//     } catch (err) {
//       console.error('Failed to load marketplace:', err);
//       setError(err.response?.data?.message || 'Failed to load marketplace products.');
//       setProducts([]);
//       setFiltered([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleFilterChange = (e) => {
//     const { name, value } = e.target;
//     setFilter(prev => ({ ...prev, [name]: value }));
//   };

//   const handleBuyNow = (product) => {
//     Swal.fire({
//       title: 'Confirm Purchase',
//       html: `
//         <div class="text-left">
//           <p>You're about to purchase:</p>
//           <p class="font-bold">${product.name}</p>
//           <p>Price: ₦${product.price.toLocaleString()}</p>
//           <p>Category: ${product.category}</p>
//         </div>
//       `,
//       icon: 'question',
//       showCancelButton: true,
//       confirmButtonText: 'Confirm Purchase',
//       cancelButtonText: 'Cancel',
//       confirmButtonColor: '#3085d6',
//       cancelButtonColor: '#d33',
//     }).then((result) => {
//       if (result.isConfirmed) {
//         Swal.fire(
//           'Order Placed!',
//           'Your purchase has been confirmed.',
//           'success'
//         );
//       }
//     });
//   };

//   useEffect(() => {
//     fetchMarketplace();
//   }, []);

//   useEffect(() => {
//     if (!Array.isArray(products)) return;

//     let result = [...products];
    
//     // Apply category filter
//     if (filter.category) {
//       result = result.filter(p => p.category === filter.category);
//     }
    
//     // Apply price range filter
//     if (filter.priceRange) {
//       const [min, max] = filter.priceRange.split('-').map(Number);
//       if (!isNaN(min) && !isNaN(max)) {
//         result = result.filter(p => p.price >= min && (max === 0 ? true : p.price <= max));
//       }
//     }
    
//     // Apply sorting
//     if (filter.sort === 'name') {
//       result.sort((a, b) => a.name.localeCompare(b.name));
//     } else if (filter.sort === 'price-asc') {
//       result.sort((a, b) => a.price - b.price);
//     } else if (filter.sort === 'price-desc') {
//       result.sort((a, b) => b.price - a.price);
//     }
    
//     setFiltered(result);
//   }, [filter, products]);

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center h-64">
//         <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
//         <strong className="font-bold">Error!</strong>
//         <span className="block sm:inline"> {error}</span>
//         <button 
//           onClick={fetchMarketplace}
//           className="absolute top-0 bottom-0 right-0 px-4 py-3"
//         >
//           <svg className="fill-current h-6 w-6 text-red-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
//             <path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z"/>
//           </svg>
//         </button>
//       </div>
//     );
//   }

//   return (
//     <div className="max-w-7xl mx-auto px-4 py-8">
//       <div className="bg-white rounded-xl shadow-md p-6">
//         <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
//           <h2 className="text-2xl font-bold mb-4 md:mb-0">Agro Input Marketplace</h2>
          
//           <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
//             <select
//               name="category"
//               onChange={handleFilterChange}
//               value={filter.category}
//               className="p-2 border rounded-md text-sm w-full"
//             >
//               <option value="">All Categories</option>
//               <option value="Fertilizer">Fertilizer</option>
//               <option value="Pesticide">Pesticide</option>
//               <option value="Seed">Seed</option>
//               <option value="Equipment">Equipment</option>
//               <option value="Feed">Animal Feed</option>
//             </select>

//             <select
//               name="priceRange"
//               onChange={handleFilterChange}
//               value={filter.priceRange}
//               className="p-2 border rounded-md text-sm w-full"
//             >
//               <option value="">All Prices</option>
//               <option value="0-5000">Under ₦5,000</option>
//               <option value="5000-15000">₦5,000 - ₦15,000</option>
//               <option value="15000-50000">₦15,000 - ₦50,000</option>
//               <option value="50000-0">Above ₦50,000</option>
//             </select>

//             <select
//               name="sort"
//               onChange={handleFilterChange}
//               value={filter.sort}
//               className="p-2 border rounded-md text-sm w-full"
//             >
//               <option value="">Sort By</option>
//               <option value="name">Name (A-Z)</option>
//               <option value="price-asc">Price (Low to High)</option>
//               <option value="price-desc">Price (High to Low)</option>
//             </select>
//           </div>
//         </div>

//         {filtered.length === 0 ? (
//           <div className="text-center py-12">
//             <p className="text-gray-500 text-lg mb-4">
//               {products.length === 0 
//                 ? 'No products available in the marketplace.' 
//                 : 'No products match your filters.'}
//             </p>
//             <button
//               onClick={() => setFilter({ category: '', priceRange: '', sort: '' })}
//               className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-md"
//               disabled={products.length === 0}
//             >
//               Reset Filters
//             </button>
//           </div>
//         ) : (
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
//             {filtered.map((product) => (
//               <div
//                 key={product._id}
//                 className="border rounded-xl p-4 shadow hover:shadow-lg transition-all duration-200 flex flex-col h-full"
//               >
//                 <div className="relative pb-[75%] mb-4 overflow-hidden rounded-lg">
//                   <img
//                     src={product.images?.[0]?.url || '/placeholder-product.jpg'}
//                     alt={product.name}
//                     className="absolute top-0 left-0 w-full h-full object-cover"
//                     loading="lazy"
//                   />
//                 </div>
                
//                 <div className="flex-grow">
//                   <h3 className="text-lg font-semibold mb-1 line-clamp-2">{product.name}</h3>
//                   <p className="text-gray-600 text-sm mb-3 line-clamp-3">{product.description}</p>
//                   <div className="flex justify-between items-center mb-2">
//                     <span className="text-green-700 font-bold text-lg">
//                       ₦{product.price.toLocaleString()}
//                     </span>
//                     <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
//                       {product.category}
//                     </span>
//                   </div>
//                 </div>
                
//                 <button
//                   onClick={() => handleBuyNow(product)}
//                   className="mt-4 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md w-full transition-colors"
//                 >
//                   Buy Now
//                 </button>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default MarketplaceViewer;

import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { apiGetMarketplaceProducts } from '../../services/vendor';

const MarketplaceViewer = () => {
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [filter, setFilter] = useState({ 
    category: '', 
    priceRange: '', 
    sort: '',
    search: ''
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchMarketplace = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await apiGetMarketplaceProducts();
      setProducts(data);
      setFiltered(data);
    } catch (err) {
      console.error('Failed to load marketplace:', err);
      setError(err.response?.data?.message || 'Failed to load marketplace products.');
      setProducts([]);
      setFiltered([]);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilter(prev => ({ ...prev, [name]: value }));
  };

  const handleBuyNow = (product) => {
    Swal.fire({
      title: 'Confirm Purchase',
      html: `
        <div class="text-left">
          <p>You're about to purchase:</p>
          <p class="font-bold">${product.name}</p>
          <p>Vendor: ${product.userId?.businessName || 'Unknown Vendor'}</p>
          <p>Price: ₦${product.price?.toLocaleString() || '0'}</p>
          <p>Category: ${product.category || 'Uncategorized'}</p>
          <p class="text-sm text-gray-500 mt-2">Added on ${new Date(product.createdAt).toLocaleDateString()}</p>
        </div>
      `,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Confirm Purchase',
      cancelButtonText: 'Cancel',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          'Order Placed!',
          'Your purchase has been confirmed. The vendor will contact you shortly.',
          'success'
        );
      }
    });
  };

  useEffect(() => {
    fetchMarketplace();
  }, []);

  useEffect(() => {
    let result = [...products];
    
    if (filter.search) {
      const searchTerm = filter.search.toLowerCase();
      result = result.filter(p => 
        p.name.toLowerCase().includes(searchTerm) ||
        p.description.toLowerCase().includes(searchTerm) ||
        p.category.toLowerCase().includes(searchTerm)
      )
    };
    
    if (filter.category) {
      result = result.filter(p => p.category === filter.category);
    };
    
    if (filter.priceRange) {
      const [min, max] = filter.priceRange.split('-').map(Number);
      if (!isNaN(min) && !isNaN(max)) {
        result = result.filter(p => p.price >= min && (max === 0 ? true : p.price <= max));
      }
    };
    
    if (filter.sort === 'name') {
      result.sort((a, b) => a.name.localeCompare(b.name));
    } else if (filter.sort === 'price-asc') {
      result.sort((a, b) => a.price - b.price);
    } else if (filter.sort === 'price-desc') {
      result.sort((a, b) => b.price - a.price);
    } else if (filter.sort === 'newest') {
      result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    } else if (filter.sort === 'oldest') {
      result.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
    }
    
    setFiltered(result);
  }, [filter, products]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        <p className="ml-4">Loading marketplace products...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
        <strong className="font-bold">Error!</strong>
        <span className="block sm:inline"> {error}</span>
        <button 
          onClick={fetchMarketplace}
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
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h2 className="text-2xl font-bold">Agro Input Marketplace</h2>
            <p className="text-gray-500 text-sm">
              Browse products from various vendors ({filtered.length} {filtered.length === 1 ? 'item' : 'items'})
            </p>
          </div>
          
          <div className="w-full md:w-1/3">
            <input
              type="text"
              name="search"
              value={filter.search}
              onChange={handleFilterChange}
              placeholder="Search products..."
              className="w-full p-2 border rounded-md text-sm"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <select
            name="category"
            onChange={handleFilterChange}
            value={filter.category}
            className="p-2 border rounded-md text-sm"
          >
            <option value="">All Categories</option>
            <option value="Fertilizer">Fertilizer</option>
            <option value="Pesticide">Pesticide</option>
            <option value="Seed">Seed</option>
            <option value="Equipment">Equipment</option>
            <option value="Feed">Animal Feed</option>
          </select>

          <select
            name="priceRange"
            onChange={handleFilterChange}
            value={filter.priceRange}
            className="p-2 border rounded-md text-sm"
          >
            <option value="">All Prices</option>
            <option value="0-5000">Under ₦5,000</option>
            <option value="5000-15000">₦5,000 - ₦15,000</option>
            <option value="15000-50000">₦15,000 - ₦50,000</option>
            <option value="50000-0">Above ₦50,000</option>
          </select>

          <select
            name="sort"
            onChange={handleFilterChange}
            value={filter.sort}
            className="p-2 border rounded-md text-sm"
          >
            <option value="">Sort By</option>
            <option value="name">Name (A-Z)</option>
            <option value="price-asc">Price (Low to High)</option>
            <option value="price-desc">Price (High to Low)</option>
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
          </select>

          <button
            onClick={() => setFilter({ category: '', priceRange: '', sort: '', search: '' })}
            className="p-2 bg-gray-100 hover:bg-gray-200 rounded-md text-sm"
            disabled={!filter.category && !filter.priceRange && !filter.sort && !filter.search}
          >
            Clear Filters
          </button>
        </div>

        {filtered.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg mb-4">
              {products.length === 0 
                ? 'No products available in the marketplace yet.' 
                : 'No products match your filters.'}
            </p>
            {products.length > 0 && (
              <button
                onClick={() => setFilter({ category: '', priceRange: '', sort: '', search: '' })}
                className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-md"
              >
                Show All Products
              </button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filtered.map((product) => (
              <div
                key={product._id}
                className="border rounded-xl p-4 shadow hover:shadow-lg transition-all duration-200 flex flex-col h-full"
              >
                <div className="relative pb-[75%] mb-4 overflow-hidden rounded-lg bg-gray-100">
                  <img
                    src={product.images?.[0]?.url || '/placeholder-product.jpg'}
                    alt={product.name}
                    className="absolute top-0 left-0 w-full h-full object-cover"
                    loading="lazy"
                  />
                  {product.createdAt && (
                    <div className="absolute bottom-2 left-2 bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded">
                      {new Date(product.createdAt).toLocaleDateString()}
                    </div>
                  )}
                </div>
                
                <div className="flex-grow">
                  <h3 className="text-lg font-semibold mb-1 line-clamp-2">{product.name}</h3>
                  <p className="text-gray-600 text-sm mb-3 line-clamp-3">{product.description}</p>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-green-700 font-bold text-lg">
                      ₦{product.price?.toLocaleString() || '0'}
                    </span>
                    <span className={`px-2 py-1 text-xs rounded ${
                      product.category === 'Fertilizer' ? 'bg-green-100 text-green-800' :
                      product.category === 'Pesticide' ? 'bg-red-100 text-red-800' :
                      product.category === 'Seed' ? 'bg-blue-100 text-blue-800' :
                      product.category === 'Equipment' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {product.category || 'Uncategorized'}
                    </span>
                  </div>
                  {product.userId?.businessName && (
                    <p className="text-xs text-gray-500 mt-1">
                      Sold by: {product.userId.businessName}
                    </p>
                  )}
                </div>
                
                <button
                  onClick={() => handleBuyNow(product)}
                  className="mt-4 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md w-full transition-colors"
                >
                  Buy Now
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MarketplaceViewer;