// import { createBrowserRouter, RouterProvider } from "react-router-dom";
// import "./App.css";
// import RootLayout from "./layout/RootLayout";
// import Home from "./pages/Home";
// import About from "./pages/About";
// import Products from "./pages/Products";
// import Investors from "./pages/Investors";
// import Blog from "./pages/Blog";
// import Signup from "./pages/Signup";
// import Dashboard from "./pages/Dashboard";
// import Login from "./pages/Login";

// function App() {
//  const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <RootLayout />,
//     children: [
//       { index: true, element: <Home /> },
//       { path: "about", element: <About /> },
//       { path: "products", element: <Products /> },
//       { path: "investors", element: <Investors /> },
//       { path: "blog", element: <Blog /> },
//       { path: "signup", element: <Signup /> },
//       { path: "login", element: <Login /> },
//       { path: "dashboard", element: <Dashboard /> }, // Add this line
// { path: "dashboard/:role", element: <Dashboard /> }

//     ],
//   },
// ]);

//   return (
//     <>
//       <RouterProvider router={router} />
//     </>
//   );
// }

// export default App;

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import RootLayout from "./layout/RootLayout";
import Home from "./pages/Home";
import About from "./pages/About";
import Products from "./pages/Products";
import Investors from "./pages/Investors";
import Blog from "./pages/Blog";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import FarmerDashboard from "./pages/farmer/dashboard";
import VendorDashboard from "./pages/vendor/dashboard";
import BuyerDashboard from "./pages/buyer/dashboard";
import InvestorDashboard from "./pages/investor/dashboard";
import AdminLogin from "./pages/admin/AdminLogin";
import AdminDashboard from "./components/AdminPanel/AdminDashboard";
import AdminLayout from "./components/AdminPanel/AdminLayout";
import UserManagementTable from "./components/AdminPanel/UserManagementTable";
import AdminRegister from "./pages/admin/AdminRegister";
import AdminProjects from "./components/AdminPanel/AdminProjects";
import AdminProjectPage from "./components/AdminPanel/AdminProjectPage";
import ContactPage from "./pages/ContactPage";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout />,
      children: [
        { index: true, element: <Home /> },
        { path: "about", element: <About /> },
        { path: "products", element: <Products /> },
        { path: "investors", element: <Investors /> },
        { path: "blog", element: <Blog /> },
        { path: "signup", element: <Signup /> },
        { path: "login", element: <Login /> },
        // { path: "contact", element: <ContactPage /> },
      ],
    },

    { path: "dashboard/farmer", element: <FarmerDashboard /> },
    { path: "dashboard/vendor", element: <VendorDashboard /> },
    { path: "dashboard/investor", element: <InvestorDashboard /> },
    { path: "dashboard/buyer", element: <BuyerDashboard /> },
    {
      path: "dashboard/admin",
      element: <AdminLayout />,
      children: [
        { index: true, element: <AdminDashboard /> },
        { path: "users", element: <UserManagementTable /> },
        // { path: "listings", element: < /> },
        { path: "projects", element: <AdminProjects /> },
        { path: "projects/:id", element: <AdminProjectPage /> },
      ],
    },

    { path: "admin-login", element: <AdminLogin /> },
    { path: "admin-register", element: <AdminRegister /> },
    { path: "dashboard", element: <Dashboard /> },
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
