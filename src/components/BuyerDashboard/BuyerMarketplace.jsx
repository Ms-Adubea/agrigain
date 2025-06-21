import { useState, useEffect } from 'react';
import { Search, Filter, Heart, Star, MapPin, Package } from 'lucide-react';
import Swal from 'sweetalert2';
import { apiGetAllProduce } from '../../services/buyer';

const BuyerMarketplace = ({ 
  orders, 
  setOrders, 
  favorites, 
  setFavorites, 
  address, 
  setAddress,
  currencySymbol = '₵'
}) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);

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
  }, []);

  const filteredProducts = products.filter(
    (p) =>
      p.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalSpent = orders.reduce((sum, order) => sum + order.total, 0);
  const activeOrders = orders.filter(order => order.status === 'Pending').length;

  const toggleFavorite = (productId) => {
    const updatedFavorites = favorites.includes(productId)
      ? favorites.filter(id => id !== productId)
      : [...favorites, productId];
    
    setFavorites(updatedFavorites);
  };

  const handleOrderClick = (product) => {
    setSelectedProduct(product);
  };

  const handleConfirmOrder = () => {
    const newOrder = {
      productId: selectedProduct._id,
      productName: selectedProduct.name,
      product: selectedProduct.name,
      quantity,
      address,
      total: selectedProduct.price * quantity,
      date: new Date().toISOString(),
      status: 'Pending',
      farmerId: selectedProduct.userId?._id || 'unknown'
    };

    const updatedOrders = [...orders, newOrder];
    setOrders(updatedOrders);

    Swal.fire({
      title: 'Order Placed',
      html: `
        <div class="text-left">
          <p>You've ordered <strong>${quantity} unit(s)</strong> of <strong>${selectedProduct.name}</strong></p>
          <p>Total: <strong>${currencySymbol}${(selectedProduct.price * quantity).toLocaleString()}</strong></p>
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
      <div className="min-h-screen bg-gray-50">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          <span className="ml-4">Loading marketplace...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
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
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Stats Cards */}
      <div className="px-6 py-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-gray-900">{orders.length}</p>
                <p className="text-gray-600 text-sm">Total Orders</p>
                <p className="text-green-600 text-xs mt-1">+3 from last month</p>
              </div>
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <Package className="w-5 h-5 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-gray-900">{activeOrders}</p>
                <p className="text-gray-600 text-sm">Active Orders</p>
                <p className="text-blue-600 text-xs mt-1">In progress</p>
              </div>
              <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                <Package className="w-5 h-5 text-orange-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-gray-900">{currencySymbol}{totalSpent.toLocaleString()}</p>
                <p className="text-gray-600 text-sm">Total Spent</p>
                <p className="text-gray-600 text-xs mt-1">This year</p>
              </div>
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <span className="text-green-600 font-bold">{currencySymbol}</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-gray-900">{favorites.length}</p>
                <p className="text-gray-600 text-sm">Favorite Vendors</p>
                <p className="text-gray-600 text-xs mt-1">Saved vendors</p>
              </div>
              <div className="w-10 h-10 bg-pink-100 rounded-lg flex items-center justify-center">
                <Heart className="w-5 h-5 text-pink-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Search and Filter Bar */}
        <div className="bg-white rounded-xl p-4 shadow-sm mb-6">
          <div className="flex items-center space-x-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search for produce..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <button className="flex items-center space-x-2 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50">
              <Filter className="w-4 h-4" />
              <span>Filter</span>
            </button>
          </div>
        </div>

        {/* Products Grid */}
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
                className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg"
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
                className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-200"
              >
                <div className="relative">
                  <img
                    src={product.images?.[0]?.url || '/placeholder-produce.jpg'}
                    alt={product.name}
                    className="w-full h-48 object-cover"
                    loading="lazy"
                  />
                  <button
                    onClick={() => toggleFavorite(product._id)}
                    className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-sm hover:shadow-md transition-all"
                  >
                    <Heart 
                      className={`w-4 h-4 ${
                        favorites.includes(product._id) 
                          ? 'text-red-500 fill-current' 
                          : 'text-gray-400'
                      }`} 
                    />
                  </button>
                  {product.userId?.farmName && (
                    <div className="absolute bottom-3 left-3 flex items-center space-x-1 bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded">
                      <MapPin className="w-3 h-3" />
                      <span>{product.userId.farmName}</span>
                    </div>
                  )}
                </div>
                
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900 mb-1">{product.name}</h3>
                  <div className="flex items-center space-x-1 mb-2">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="text-sm font-medium">4.8</span>
                    <span className="text-sm text-gray-500">{product.category || 'Vegetables'}</span>
                  </div>
                  
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-lg font-bold text-green-600">
                      {currencySymbol}{product.price?.toLocaleString() || '0'}
                    </span>
                    <span className="text-sm text-gray-500">per kg</span>
                  </div>

                  <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
                    <span>{product.images?.length || 4} photos available</span>
                    <span className="px-2 py-1 bg-green-100 text-green-800 rounded text-xs font-medium">
                      In Stock
                    </span>
                  </div>
                  
                  <button
                    onClick={() => handleOrderClick(product)}
                    className="w-full bg-orange-500 hover:bg-orange-600 text-white py-2 px-4 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2"
                  >
                    <Package className="w-4 h-4" />
                    <span>Order Now</span>
                  </button>
                </div>
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
                <p className="text-green-600 font-bold">{currencySymbol}{selectedProduct.price?.toLocaleString()}</p>
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
                    <span>{currencySymbol}{(selectedProduct.price * quantity).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between mt-1">
                    <span>Delivery:</span>
                    <span>{currencySymbol}0 (Free)</span>
                  </div>
                  <div className="flex justify-between mt-2 font-bold">
                    <span>Total:</span>
                    <span>{currencySymbol}{(selectedProduct.price * quantity).toLocaleString()}</span>
                  </div>
                </div>

                <button
                  onClick={handleConfirmOrder}
                  disabled={!address.trim()}
                  className={`w-full bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-md transition-colors ${
                    !address.trim() ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
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