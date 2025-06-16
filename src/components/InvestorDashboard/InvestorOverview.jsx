// // components/InvestorDashboard/InvestorOverview.jsx
// import React from 'react';
// import {
//   TrendingUp,
//   Clock,
//   BarChart2,
//   DollarSign
// } from 'lucide-react';

// const InvestorOverview = () => {
//   const stats = [
//     {
//       label: 'Total Investments',
//       value: 8,
//       note: '+2 from last quarter',
//       icon: <Clock size={20} />,
//     },
//     {
//       label: 'Active Investments',
//       value: 5,
//       note: 'Currently active',
//       icon: <BarChart2 size={20} />,
//     },
//     {
//       label: 'Portfolio Value',
//       value: '₦2,500,000',
//       note: '+8.2% from last month',
//       icon: <DollarSign size={20} />,
//     },
//     {
//       label: 'Monthly Returns',
//       value: '₦45,000',
//       note: '+12.5% from last month',
//       icon: <TrendingUp size={20} />,
//     },
//   ];

//   const recentActivity = [
//     {
//       title: 'Investment return received',
//       subtitle: 'Green Acres Farm',
//       amount: 15000,
//       status: 'Completed',
//     },
//     {
//       title: 'New investment opportunity',
//       subtitle: 'Sunrise Agriculture',
//       amount: 50000,
//       status: 'Pending',
//     },
//     {
//       title: 'Investment milestone reached',
//       subtitle: 'Modern Farms Ltd',
//       amount: 25000,
//       status: 'Active',
//     },
//   ];

//   const getStatusStyle = (status) => {
//     if (status === 'Completed') return 'bg-black text-white';
//     if (status === 'Pending') return 'bg-gray-100 text-gray-600';
//     if (status === 'Active') return 'bg-purple-100 text-purple-700';
//     return 'bg-gray-100 text-gray-600';
//   };

//   return (
//     <div className="max-w-6xl mx-auto space-y-6">
//       <h2 className="text-2xl font-bold">Investor Dashboard</h2>

//       {/* Stats Cards */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
//         {stats.map((stat, index) => (
//           <div key={index} className="bg-white p-4 rounded shadow border">
//             <div className="flex justify-between items-center">
//               <p className="text-sm font-medium text-gray-500">{stat.label}</p>
//               {stat.icon}
//             </div>
//             <p className="text-2xl font-bold mt-2">{stat.value}</p>
//             <p className="text-xs text-gray-400">{stat.note}</p>
//           </div>
//         ))}
//       </div>

//       {/* Recent Investment Activity */}
//       <div className="bg-white p-4 rounded shadow mt-6">
//         <h3 className="text-lg font-semibold mb-1">Recent Investment Activity</h3>
//         <p className="text-sm text-gray-500 mb-4">Your latest investment activities and updates</p>
//         <ul className="divide-y">
//           {recentActivity.map((item, index) => (
//             <li key={index} className="py-3 flex justify-between items-center">
//               <div className="flex items-start gap-3">
//                 <div className="bg-purple-100 text-purple-700 p-2 rounded">
//                   <TrendingUp size={18} />
//                 </div>
//                 <div>
//                   <p className="text-sm font-medium text-black">{item.title}</p>
//                   <p className="text-xs text-gray-500">{item.subtitle}</p>
//                 </div>
//               </div>
//               <div className="text-right">
//                 <p className="text-sm font-semibold text-black">₦{item.amount.toLocaleString()}</p>
//                 <span
//                   className={`text-xs px-3 py-1 rounded-full font-medium inline-block mt-1 ${getStatusStyle(
//                     item.status
//                   )}`}
//                 >
//                   {item.status}
//                 </span>
//               </div>
//             </li>
//           ))}
//         </ul>
//       </div>
//     </div>
//   );
// };

// export default InvestorOverview;


// components/InvestorDashboard/InvestorOverview.jsx
import React from 'react';

const InvestorOverview = () => {
  const stats = [
    {
      label: 'Total Invested',
      value: '₵45,000',
      note: '+20% from last month',
    },
    {
      label: 'Active Projects',
      value: '12',
      note: 'Across 3 regions',
    },
    {
      label: 'Expected Returns',
      value: '₵11,250',
      note: '25% average ROI',
    },
    {
      label: 'Payouts Received',
      value: '₵8,750',
      note: 'Last payout: 2 weeks ago',
    },
  ];

  const recentInvestments = [
    {
      title: 'Tomato Farm - Kumasi',
      amount: '₵5,000',
      status: 'Growing',
      progress: 60,
    },
    {
      title: 'Maize Farm - Tamale',
      amount: '₵8,000',
      status: 'Harvest Ready',
      progress: 95,
    },
    {
      title: 'Rice Farm - Volta',
      amount: '₵3,000',
      status: 'Planting',
      progress: 20,
    },
  ];

  const availableProjects = [
    {
      title: 'Cassava Farm - Brong Ahafo',
      roi: '22%',
      duration: '8 months',
      funding: '₵15,000',
    },
    {
      title: 'Plantain Farm - Western',
      roi: '18%',
      duration: '12 months',
      funding: '₵25,000',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <h2 className="text-2xl font-bold">Investor Overview</h2>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, idx) => (
          <div key={idx} className="bg-white p-4 rounded shadow">
            <p className="text-sm text-gray-500">{stat.label}</p>
            <p className="text-2xl font-bold">{stat.value}</p>
            <p className="text-xs text-gray-400">{stat.note}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Investments */}
        <div className="bg-white p-4 rounded shadow">
          <h3 className="text-lg font-semibold mb-2">Recent Investments</h3>
          {recentInvestments.map((inv, idx) => (
            <div key={idx} className="mb-4">
              <p className="font-medium text-sm">{inv.title}</p>
              <p className="text-xs text-gray-500 mb-1">{inv.amount} • {inv.status}</p>
              <div className="w-full h-2 bg-gray-200 rounded">
                <div
                  className="h-2 bg-green-500 rounded"
                  style={{ width: `${inv.progress}%` }}
                ></div>
              </div>
            </div>
          ))}
          <button className="mt-4 w-full bg-green-600 text-white py-2 rounded hover:bg-green-700">
            View All Investments
          </button>
        </div>

        {/* Available Projects */}
        <div className="bg-white p-4 rounded shadow">
          <h3 className="text-lg font-semibold mb-2">Available Projects</h3>
          {availableProjects.map((proj, idx) => (
            <div key={idx} className="mb-4 border rounded p-4">
              <p className="font-medium text-sm mb-1">{proj.title}</p>
              <div className="text-xs text-gray-600 mb-2">
                ROI: <span className="text-green-600 font-semibold">{proj.roi}</span><br />
                Funding needed: {proj.funding} <br />
                Duration: {proj.duration}
              </div>
              <button className="bg-green-500 text-white text-sm w-full py-2 rounded hover:bg-green-600">
                Invest Now
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default InvestorOverview;