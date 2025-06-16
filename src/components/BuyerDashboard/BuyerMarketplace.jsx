// components/BuyerDashboard/BuyerMarketplace.jsx
import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';

const dummyProducts = [
  {
    _id: '1',
    name: 'Tomatoes',
    price: 2500,
    description: 'Fresh tomatoes directly from the farm.',
    image: '/images/tomatoes.jpg',
  },
  {
    _id: '2',
    name: 'Cabbage',
    price: 1800,
    description: 'Crisp green cabbage, organic and healthy.',
    image: '/images/cabbage.jpg',
  },
  {
    _id: '3',
    name: 'Okra',
    price: 1500,
    description: 'Locally grown okra, perfect for soups.',
    image: '/images/okra.jpg',
  },
];

const BuyerMarketplace = () => {
  const [products] = useState(dummyProducts);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [address, setAddress] = useState('123 Greenfield Estate, Abuja');
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem('buyerOrders');
    if (saved) {
      setOrders(JSON.parse(saved));
    }
  }, []);

  const filteredProducts = products.filter(
    (p) =>
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleOrderClick = (product) => {
    setSelectedProduct(product);
  };

  const handleConfirmOrder = () => {
    const newOrder = {
      product: selectedProduct.name,
      quantity,
      address,
      total: selectedProduct.price * quantity,
      date: new Date().toISOString(),
      status: 'Pending',
    };

    const updatedOrders = [...orders, newOrder];
    setOrders(updatedOrders);
    localStorage.setItem('buyerOrders', JSON.stringify(updatedOrders));

    Swal.fire('Order Placed', `You've ordered ${quantity} unit(s) of ${selectedProduct.name}.`, 'success');
    setSelectedProduct(null);
    setQuantity(1);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <h2 className="text-2xl font-bold">Marketplace</h2>

      {/* Search Input */}
      <input
        type="text"
        placeholder="Search produce..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="w-full p-2 border rounded mb-4"
      />

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredProducts.map((product) => (
          <div key={product._id} className="bg-white p-4 rounded shadow border">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-40 object-cover rounded mb-3"
            />
            <h3 className="text-lg font-semibold">{product.name}</h3>
            <p className="text-sm text-gray-500 mb-2">{product.description}</p>
            <p className="text-green-600 font-bold mb-2">₦{product.price.toLocaleString()}</p>
            <button
              onClick={() => handleOrderClick(product)}
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 w-full"
            >
              Order Now
            </button>
          </div>
        ))}
      </div>

      {/* Order Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-xl w-full max-w-md relative">
            <button
              onClick={() => setSelectedProduct(null)}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 text-lg"
            >
              ×
            </button>
            <h3 className="text-xl font-bold mb-4">Confirm Order</h3>
            <p><strong>Product:</strong> {selectedProduct.name}</p>
            <p><strong>Price:</strong> ₦{selectedProduct.price.toLocaleString()}</p>
            <div className="mt-4">
              <label className="block mb-1 font-medium">Quantity</label>
              <input
                type="number"
                min="1"
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                className="w-full p-2 border rounded"
              />
            </div>
            <div className="mt-4">
              <label className="block mb-1 font-medium">Delivery Address</label>
              <textarea
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full p-2 border rounded"
              ></textarea>
            </div>
            <button
              onClick={handleConfirmOrder}
              className="mt-6 w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
            >
              Place Order
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default BuyerMarketplace;