import Footer from "@/components/home/footer";
import Header from "@/components/home/header";
import { Outlet, useLocation } from "react-router-dom";

function LayoutHomePages() {
  const location = useLocation();

  const isHomePage = location.pathname === "/";
  return (
    <div className="flex flex-col min-h-screen bg-[#daf1ff]">
      <Header />
      <div className={isHomePage ? "" : "px-40"}>
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}

export default LayoutHomePages;
