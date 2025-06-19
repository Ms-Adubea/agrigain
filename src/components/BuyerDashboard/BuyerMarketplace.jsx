// components/BuyerDashboard/BuyerMarketplace.jsx
import { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import { apiGetAllProduce } from '../../services/buyer';


const BuyerMarketplace = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [address, setAddress] = useState('');
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchProduce = async () => {
      try {
        const data = await apiGetAllProduce();
        setProducts(data);
        setLoading(false);
      } catch (err) {
        console.error('Failed to fetch produce:', err);
        setError(err.response?.data?.message || 'Failed to load marketplace products.');
        setLoading(false);
      }
    };

    fetchProduce();

    // Load saved orders and address
    const savedOrders = localStorage.getItem('buyerOrders');
    const savedAddress = localStorage.getItem('buyerAddress');
    if (savedOrders) setOrders(JSON.parse(savedOrders));
    if (savedAddress) setAddress(savedAddress);
  }, []);

  const filteredProducts = products.filter(
    (p) =>
      p.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleOrderClick = (product) => {
    setSelectedProduct(product);
  };

  const handleConfirmOrder = () => {
    const newOrder = {
      productId: selectedProduct._id,
      productName: selectedProduct.name,
      quantity,
      address,
      total: selectedProduct.price * quantity,
      date: new Date().toISOString(),
      status: 'Pending',
      farmerId: selectedProduct.userId?._id || 'unknown'
    };

    const updatedOrders = [...orders, newOrder];
    setOrders(updatedOrders);
    localStorage.setItem('buyerOrders', JSON.stringify(updatedOrders));
    localStorage.setItem('buyerAddress', address);

    Swal.fire({
      title: 'Order Placed',
      html: `
        <div class="text-left">
          <p>You've ordered <strong>${quantity} unit(s)</strong> of <strong>${selectedProduct.name}</strong></p>
          <p>Total: <strong>₦${(selectedProduct.price * quantity).toLocaleString()}</strong></p>
          <p class="mt-2 text-sm">Delivery to: ${address}</p>
        </div>
      `,
      icon: 'success'
    });
    
    setSelectedProduct(null);
    setQuantity(1);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        <span className="ml-4">Loading marketplace...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
        <strong className="font-bold">Error!</strong>
        <span className="block sm:inline"> {error}</span>
        <button 
          onClick={() => window.location.reload()}
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
          <div>
            <h2 className="text-2xl font-bold">Farmers' Marketplace</h2>
            <p className="text-gray-500 text-sm">
              Browse fresh produce from local farmers ({filteredProducts.length} items)
            </p>
          </div>
          
          <div className="w-full md:w-1/3 mt-4 md:mt-0">
            <input
              type="text"
              placeholder="Search produce..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full p-2 border rounded-md text-sm"
            />
          </div>
        </div>

        {filteredProducts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg mb-4">
              {products.length === 0 
                ? 'No produce available in the marketplace yet.' 
                : 'No produce matches your search.'}
            </p>
            {products.length > 0 && (
              <button
                onClick={() => setSearchQuery('')}
                className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-md"
              >
                Clear Search
              </button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <div
                key={product._id}
                className="border rounded-xl p-4 shadow hover:shadow-lg transition-all duration-200 flex flex-col"
              >
                <div className="relative pb-[75%] mb-4 overflow-hidden rounded-lg bg-gray-100">
                  <img
                    src={product.images?.[0]?.url || '/placeholder-produce.jpg'}
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
                  <p className="text-gray-600 text-sm mb-2 line-clamp-3">{product.description}</p>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-green-700 font-bold text-lg">
                      ₦{product.price?.toLocaleString() || '0'}
                    </span>
                    <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">
                      {product.category || 'Produce'}
                    </span>
                  </div>
                  {product.userId?.farmName && (
                    <p className="text-xs text-gray-500">
                      From: {product.userId.farmName}
                    </p>
                  )}
                </div>
                
                <button
                  onClick={() => handleOrderClick(product)}
                  className="mt-4 bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-md w-full transition-colors"
                >
                  Order Now
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Order Modal */}
        {selectedProduct && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white p-6 rounded-xl shadow-xl relative w-full max-w-md">
              <button
                onClick={() => setSelectedProduct(null)}
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 text-2xl font-bold"
              >
                &times;
              </button>
              <h3 className="text-xl font-bold mb-4">Order Details</h3>
              
              <div className="mb-4">
                <h4 className="font-semibold">{selectedProduct.name}</h4>
                <p className="text-green-600 font-bold">₦{selectedProduct.price?.toLocaleString()}</p>
                {selectedProduct.description && (
                  <p className="text-gray-600 text-sm mt-1">{selectedProduct.description}</p>
                )}
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Quantity</label>
                  <input
                    type="number"
                    min="1"
                    value={quantity}
                    onChange={(e) => setQuantity(Math.max(1, Number(e.target.value)))}
                    className="w-full p-2 border rounded-md"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Delivery Address</label>
                  <textarea
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full p-2 border rounded-md"
                    rows="3"
                    placeholder="Enter your full delivery address"
                  />
                </div>

                <div className="bg-gray-50 p-3 rounded-md">
                  <p className="font-medium">Order Summary</p>
                  <div className="flex justify-between mt-2">
                    <span>Subtotal:</span>
                    <span>₦{(selectedProduct.price * quantity).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between mt-1">
                    <span>Delivery:</span>
                    <span>₦0 (Free)</span>
                  </div>
                  <div className="flex justify-between mt-2 font-bold">
                    <span>Total:</span>
                    <span>₦{(selectedProduct.price * quantity).toLocaleString()}</span>
                  </div>
                </div>

                <button
                  onClick={handleConfirmOrder}
                  className="w-full bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-md transition-colors"
                >
                  Confirm Order
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BuyerMarketplace;