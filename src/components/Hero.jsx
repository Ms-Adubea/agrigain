// import { ArrowRight, Users, TrendingUp, Leaf, ShoppingCart } from 'lucide-react';
// import videoSrc from "../assets/videos/hero-bg.mp4"

// const Hero = () => {
//   return (
//     <div className="relative min-h-screen overflow-hidden">
//       {/* Video Background */}
      
//         <video
//           className="absolute inset-0 w-full h-full object-cover"
//           autoPlay
//           muted
//           loop
//           playsInline
//           preload="auto"
//         >
//           <source src={videoSrc} type="video/mp4" />

//         </video>
      
      
//       {/* Overlay */}
//       <div className="absolute inset-0 bg-black bg-opacity-40 z-10"></div>
      
//       {/* Content */}
//       <div className="relative z-10 min-h-screen flex items-center">
//         <div className="container mx-auto px-6 lg:px-8">
//           <div className="grid lg:grid-cols-2 gap-12 items-center">
            
//             {/* Left Column - Main Content */}
//             <div className="text-white">
//               <h1 className="text-5xl lg:text-6xl font-bold leading-tight mb-6">
//                 Growing Ghana's{' '}
//                 <span className="text-green-400">Agricultural Future</span>
//               </h1>
              
//               <p className="text-xl lg:text-2xl text-gray-200 mb-8 leading-relaxed">
//                 Connect with farmers, invest in sustainable agriculture, and earn 
//                 up to 25% ROI while supporting food security and community 
//                 development across Ghana.
//               </p>
              
//               <div className="flex flex-col sm:flex-row gap-4 mb-12">
//                 <button className="bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 flex items-center justify-center gap-2 group">
//                   Start Investing
//                   <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
//                 </button>
                
//                 <button className="border-2 border-white text-white hover:bg-white hover:text-gray-900 px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300">
//                   Learn More
//                 </button>
//               </div>
              
//               {/* Stats */}
//               <div className="grid grid-cols-3 gap-8">
//                 <div className="text-center">
//                   <div className="text-3xl lg:text-4xl font-bold text-green-400 mb-2">500+</div>
//                   <div className="text-sm lg:text-base text-gray-300">Active Farmers</div>
//                 </div>
                
//                 <div className="text-center">
//                   <div className="text-3xl lg:text-4xl font-bold text-green-400 mb-2">25%</div>
//                   <div className="text-sm lg:text-base text-gray-300">Average ROI</div>
//                 </div>
                
//                 <div className="text-center">
//                   <div className="text-3xl lg:text-4xl font-bold text-green-400 mb-2">₵2M+</div>
//                   <div className="text-sm lg:text-base text-gray-300">Funds Deployed</div>
//                 </div>
//               </div>
//             </div>
            
//             {/* Right Column - Feature Cards */}
//             <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              
//               {/* For Investors Card */}
//               <div className="bg-white bg-opacity-10 backdrop-blur-md rounded-2xl p-6 border border-white border-opacity-20 hover:bg-opacity-20 transition-all duration-300">
//                 <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mb-4">
//                   <Users className="w-6 h-6 text-white" />
//                 </div>
//                 <h3 className="text-xl font-bold mb-3">For Investors</h3>
//                 <p className="text-gray-900 text-sm leading-relaxed">
//                   Earn returns while supporting sustainable agriculture
//                 </p>
//               </div>
              
//               {/* For Buyers Card */}
//               <div className="bg-white bg-opacity-10 backdrop-blur-md rounded-2xl p-6 border border-white border-opacity-20 hover:bg-opacity-20 transition-all duration-300">
//                 <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mb-4">
//                   <TrendingUp className="w-6 h-6 text-white" />
//                 </div>
//                 <h3 className="text-xl font-bold mb-3">For Buyers</h3>
//                 <p className="text-gray-900 text-sm leading-relaxed">
//                   Source certified commodities grown to specification
//                 </p>
//               </div>
              
//               {/* For Farmers Card */}
//               <div className="bg-white bg-opacity-10 backdrop-blur-md rounded-2xl p-6 border border-white border-opacity-20 hover:bg-opacity-20 transition-all duration-300">
//                 <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mb-4">
//                   <Leaf className="w-6 h-6 text-white" />
//                 </div>
//                 <h3 className="text-xl font-bold mb-3">For Farmers</h3>
//                 <p className="text-gray-900 text-sm leading-relaxed">
//                   Access global markets and premium inputs
//                 </p>
//               </div>
              
//               {/* For Vendors Card */}
//               <div className="bg-white bg-opacity-10 backdrop-blur-md rounded-2xl p-6 border border-white border-opacity-20 hover:bg-opacity-20 transition-all duration-300">
//                 <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mb-4">
//                   <ShoppingCart className="w-6 h-6 text-white" />
//                 </div>
//                 <h3 className="text-xl font-bold mb-3">For Vendors</h3>
//                 <p className="text-gray-900 text-sm leading-relaxed">
//                   Supply tools and services to growing farms
//                 </p>
//               </div>
              
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Hero;



import { ArrowRight, Users, TrendingUp, Leaf, ShoppingCart } from 'lucide-react';
import videoSrc from "../assets/videos/hero-bg.mp4";

const Hero = () => {
  return (
    <section className="relative bg-gradient-to-br from-green-50 to-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="animate-fade-in">
            <h1 className="text-5xl lg:text-6xl font-bold leading-tight mb-6">
                Growing Ghana's{' '}
                <span className="text-green-600">Agricultural Future</span>
              </h1>
            <p className="text-xl text-gray-600 mt-6 leading-relaxed">
              Connect with farmers, invest in sustainable agriculture, and earn up to 25% ROI 
              while supporting food security and community development across Ghana.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 mt-8">
             <button className="bg-green-600 hover:bg-white hover:text-gray-900 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 flex items-center justify-center gap-2 group">
                  Start Investing
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              <button className="bg-green-600 border-2 border-white text-white hover:bg-white hover:text-gray-900 px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300">
                  Learn More
                </button>
            </div>

            <div className="grid grid-cols-3 gap-8 mt-12">
              <div className="text-center">
                <div className="text-3xl text-green-500 font-bold text-primary-600">500+</div>
                <div className="text-sm text-gray-600">Active Farmers</div>
              </div>
              <div className="text-center">
                <div className="text-3xl text-green-500 font-bold text-primary-600">25%</div>
                <div className="text-sm text-gray-600">Average ROI</div>
              </div>
              <div className="text-center">
                <div className="text-3xl text-green-500 font-bold text-primary-600">₵2M+</div>
                <div className="text-sm text-gray-600">Funds Deployed</div>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-6">
                <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
                  <Users className="h-12 w-12 text-green-600 mb-4" />
                  <h3 className="font-semibold text-gray-900">For Investors</h3>
                  <p className="text-gray-600 text-sm">Earn returns while supporting sustainable agriculture</p>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
                  <Leaf className="h-12 w-12 text-green-600 mb-4" />
                  <h3 className="font-semibold text-gray-900">For Farmers</h3>
                  <p className="text-gray-600 text-sm">Access global markets and premium inputs</p>
                </div>
              </div>
              <div className="space-y-6 mt-12">
                <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
                  <TrendingUp className="h-12 w-12 text-green-600 mb-4" />
                  <h3 className="font-semibold text-gray-900">For Buyers</h3>
                  <p className="text-gray-600 text-sm">Source certified commodities grown to specification</p>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
                  <Users className="h-12 w-12 text-green-600 mb-4" />
                  <h3 className="font-semibold text-gray-900">For Vendors</h3>
                  <p className="text-gray-600 text-sm">Supply tools and services to growing farms</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
