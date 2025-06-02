import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import RootLayout from "./layout/RootLayout";
import Home from "./pages/Home";
import About from "./pages/About";
import Products from "./pages/Products";
import Investors from "./pages/Investors";
import Blog from "./pages/Blog";
import Signup from "./pages/Signup";


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
    ],
  },
]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;