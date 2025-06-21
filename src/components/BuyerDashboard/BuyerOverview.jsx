// components/BuyerDashboard/BuyerOverview.jsx
import React, { useEffect, useState } from 'react';
import { Package, ShoppingCart, DollarSign, Heart, TrendingUp, Clock, MapPin } from 'lucide-react';

const BuyerOverview = () => {
  const [orders, setOrders] = useState([]);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const savedOrders = localStorage.getItem('buyerOrders');
    const savedFavorites = localStorage.getItem('buyerFavorites');
    
    if (savedOrders) {
      setOrders(JSON.parse(savedOrders));
    }
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }
  }, []);

  const totalOrders = orders.length;
  const activeOrders = orders.filter(order => order.status === 'Pending').length;
  const totalSpent = orders.reduce((sum, order) => sum + order.total, 0);
  const favoriteVendors = favorites.length;
  const recentOrders = orders.slice(-5).reverse();

  const getStatusStyle = (status) => {
    if (status === 'Pending') return 'bg-yellow-100 text-yellow-700';
    if (status === 'Delivered') return 'bg-green-100 text-green-700';
    return 'bg-gray-100 text-gray-600';
  };

  const getStatusIcon = (status) => {
    if (status === 'Pending') return <Clock className="w-3 h-3" />;
    if (status === 'Delivered') return <Package className="w-3 h-3" />;
    return <Package className="w-3 h-3" />;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      {/* <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex space-x-8">
            <button className="text-gray-900 font-medium border-b-2 border-blue-500 pb-2">
              Marketplace
            </button>
            <button className="text-gray-500 font-medium pb-2">
              My Orders
            </button>
            <button className="text-gray-500 font-medium pb-2">
              Profile
            </button>
            <button className="text-gray-500 font-medium pb-2">
              Favorites
            </button>
          </div>
        </div>
      </div> */}

      <div className="px-6 py-6">
        {/* Main Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-gray-900">{totalOrders}</p>
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
                <ShoppingCart className="w-5 h-5 text-orange-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-gray-900">GH₵{totalSpent.toLocaleString()}</p>
                <p className="text-gray-600 text-sm">Total Spent</p>
                <p className="text-gray-600 text-xs mt-1">This year</p>
              </div>
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-gray-900">{favoriteVendors}</p>
                <p className="text-gray-600 text-sm">Favorite Vendors</p>
                <p className="text-gray-600 text-xs mt-1">Saved vendors</p>
              </div>
              <div className="w-10 h-10 bg-pink-100 rounded-lg flex items-center justify-center">
                <Heart className="w-5 h-5 text-pink-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Recent Activity Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Orders */}
          <div className="lg:col-span-2 bg-white rounded-xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Recent Orders</h3>
              <button className="text-blue-600 text-sm font-medium hover:text-blue-700">
                View All
              </button>
            </div>
            
            {recentOrders.length === 0 ? (
              <div className="text-center py-8">
                <Package className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                <p className="text-gray-500">No orders yet</p>
                <p className="text-gray-400 text-sm">Start shopping to see your orders here</p>
              </div>
            ) : (
              <div className="space-y-4">
                {recentOrders.map((order, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                        <Package className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{order.productName || order.product}</p>
                        <p className="text-sm text-gray-500">
                          {order.quantity} unit(s) • GH₵{order.total.toLocaleString()}
                        </p>
                        <p className="text-xs text-gray-400">
                          {new Date(order.date).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusStyle(order.status)}`}>
                        {getStatusIcon(order.status)}
                        <span>{order.status}</span>
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Quick Actions & Stats */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <button className="w-full flex items-center space-x-3 p-3 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
                  <ShoppingCart className="w-5 h-5 text-blue-600" />
                  <span className="font-medium text-blue-700">Browse Marketplace</span>
                </button>
                <button className="w-full flex items-center space-x-3 p-3 bg-green-50 rounded-lg hover:bg-green-100 transition-colors">
                  <Package className="w-5 h-5 text-green-600" />
                  <span className="font-medium text-green-700">Track Orders</span>
                </button>
                <button className="w-full flex items-center space-x-3 p-3 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors">
                  <Heart className="w-5 h-5 text-purple-600" />
                  <span className="font-medium text-purple-700">View Favorites</span>
                </button>
              </div>
            </div>

            {/* Monthly Summary */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">This Month</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Orders Placed</span>
                  <span className="font-medium text-gray-900">
                    {orders.filter(order => {
                      const orderDate = new Date(order.date);
                      const currentMonth = new Date().getMonth();
                      return orderDate.getMonth() === currentMonth;
                    }).length}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Amount Spent</span>
                  <span className="font-medium text-gray-900">
                    GH₵{orders.filter(order => {
                      const orderDate = new Date(order.date);
                      const currentMonth = new Date().getMonth();
                      return orderDate.getMonth() === currentMonth;
                    }).reduce((sum, order) => sum + order.total, 0).toLocaleString()}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Avg. Order Value</span>
                  <span className="font-medium text-gray-900">
                    GH₵{totalOrders > 0 ? Math.round(totalSpent / totalOrders).toLocaleString() : '0'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BuyerOverview;