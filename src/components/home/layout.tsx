import Header from "@/components/home/header";
import { Outlet } from "react-router-dom";

function LayoutHomePages() {
  return (
    <div>
      <Header />
      <Outlet />
    </div>
  );
}

export default LayoutHomePages;
