// // components/VendorDashboard/VendorNav.jsx
// import React from 'react';
// import { LayoutDashboard, Package, ClipboardList, User } from 'lucide-react';

// const navItems = [
//   { key: 'overview', label: 'Overview', icon: <LayoutDashboard size={20} /> },
//   { key: 'listings', label: 'My Listings', icon: <Package size={20} /> },
//   { key: 'orders', label: 'Orders', icon: <ClipboardList size={20} /> },
//   { key: 'profile', label: 'Profile', icon: <User size={20} /> },
// ];

// const VendorNav = ({ activeTab, onTabChange, onAddNewItem }) => {
//   return (
//     <aside className="w-64 bg-white shadow p-4 space-y-6 hidden md:block min-h-screen">
//       <h2 className="text-xl font-bold">Vendor Dashboard</h2>
//       <ul className="space-y-2">
//         {navItems.map(({ key, label, icon }) => (
//           <li key={key}>
//             <button
//               onClick={() => onTabChange(key)}
//               className={`flex items-center w-full text-left px-4 py-2 rounded-md transition hover:bg-green-100 ${
//                 activeTab === key ? 'bg-green-200 font-semibold' : ''
//               }`}
//             >
//               <span className="mr-2">{icon}</span> {label}
//             </button>
//           </li>
//         ))}
//       </ul>
//       {onAddNewItem && (
//   <button
//     onClick={onAddNewItem}
//     className="w-full mt-2 bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700"
//   >
//     + Add New Item
//   </button>
// )}

//     </aside>
//   );
// };

// export default VendorNav;


// components/VendorDashboard/VendorNav.jsx
import React, { useState } from 'react';
import { LayoutDashboard, Package, ClipboardList, User, Menu } from 'lucide-react';

const navItems = [
  { key: 'overview', label: 'Overview', icon: <LayoutDashboard size={20} /> },
  { key: 'listings', label: 'My Listings', icon: <Package size={20} /> },
  { key: 'orders', label: 'Orders', icon: <ClipboardList size={20} /> },
  { key: 'profile', label: 'Profile', icon: <User size={20} /> },
];

const VendorNav = ({ activeTab, onTabChange, onAddNewItem }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Desktop */}
      <aside className="hidden md:flex md:flex-col w-64 bg-white shadow p-4 space-y-6 min-h-screen">
        <h2 className="text-xl font-bold">Vendor Dashboard</h2>
        <ul className="space-y-2">
          {navItems.map(({ key, label, icon }) => (
            <li key={key}>
              <button
                onClick={() => onTabChange(key)}
                className={`flex items-center w-full text-left px-4 py-2 rounded-md transition hover:bg-green-100 ${
                  activeTab === key ? 'bg-green-200 font-semibold' : ''
                }`}
              >
                <span className="mr-2">{icon}</span> {label}
              </button>
            </li>
          ))}
        </ul>
        {onAddNewItem && (
          <button
            onClick={onAddNewItem}
            className="w-full mt-2 bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700"
          >
            + Add New Item
          </button>
        )}
      </aside>

      {/* Mobile Toggle */}
      <div className="md:hidden p-4 bg-white shadow flex justify-between items-center">
        <h2 className="text-lg font-bold">Vendor Dashboard</h2>
        <button onClick={() => setIsOpen(!isOpen)}>
          <Menu size={28} />
        </button>
      </div>

      {/* Mobile Dropdown */}
      {isOpen && (
        <div className="md:hidden bg-white shadow px-4 pt-4 pb-6 space-y-4">
          <ul className="space-y-2">
            {navItems.map(({ key, label, icon }) => (
              <li key={key}>
                <button
                  onClick={() => {
                    onTabChange(key);
                    setIsOpen(false);
                  }}
                  className={`flex items-center w-full text-left px-4 py-2 rounded-md transition hover:bg-green-100 ${
                    activeTab === key ? 'bg-green-200 font-semibold' : ''
                  }`}
                >
                  <span className="mr-2">{icon}</span> {label}
                </button>
              </li>
            ))}
          </ul>
          {onAddNewItem && (
            <button
              onClick={() => {
                onAddNewItem();
                setIsOpen(false);
              }}
              className="w-full mt-2 bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700"
            >
              + Add New Item
            </button>
          )}
        </div>
      )}
    </>
  );
};

export default VendorNav;