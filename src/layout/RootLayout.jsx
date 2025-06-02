import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Contact from "../components/Contact";
import ScrollToTop from "../components/ScrollToTop";


const RootLayout = () => {
  return (
    <>
    <ScrollToTop />
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
      {/* <main className="pt-20 md:pt-24 flex-grow"> */}
        <Outlet />
      </main>
      <Contact />
      <Footer />
    </div>
    </>
  );
};

export default RootLayout;