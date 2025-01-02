import SideBar from "@/components/admin/sidebar";
import TopBar from "@/components/admin/topbar";
import { Outlet } from "react-router-dom";

function LayOutAdminPage() {
  return (
    <div className="flex bg-[#daf1ff]">
      <SideBar />
      <div className="container">
        <TopBar />
        <div className="p-8">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default LayOutAdminPage;
