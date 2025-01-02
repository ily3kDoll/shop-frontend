import { MdManageAccounts } from "react-icons/md";
import { useNavigate, useLocation } from "react-router-dom";
import { TbCategoryFilled } from "react-icons/tb";
import { FaBook } from "react-icons/fa";
import { HiUsers } from "react-icons/hi2";
import { FaUserEdit } from "react-icons/fa";
import { BiLogoBlogger } from "react-icons/bi";
import { FaHome } from "react-icons/fa";
import { TbReportMoney } from "react-icons/tb";
import Logo from "@/assets/logo2.png";

const menuItems = [
  {
    title: "Home",
    icon: <FaHome className="h-5 w-5" />,
    link: "/admin",
  },
  {
    title: "Users",
    icon: <MdManageAccounts className="h-5 w-5" />,
    link: "/admin/users",
  },
  {
    title: "Products",
    icon: <FaBook className="h-5 w-5" />,
    link: "/admin/products",
  },
  {
    title: "Categories",
    icon: <TbCategoryFilled className="h-5 w-5" />,
    link: "/admin/categories",
  },
  {
    title: "Orders",
    icon: <TbReportMoney className="h-5 w-5" />,
    link: "/admin/orders",
  },
  {
    title: "Customers",
    icon: <HiUsers className="h-5 w-5" />,
    link: "/admin/customers",
  },
  {
    title: "Blogs",
    icon: <BiLogoBlogger className="h-5 w-5" />,
    link: "/admin/blogs",
  },
  {
    title: "Authors",
    icon: <FaUserEdit className="h-5 w-5" />,
    link: "/admin/authors",
  },
];

function SideBar() {
  const navigate = useNavigate();
  const location = useLocation(); // Get the current location

  return (
    <div className="min-h-screen bg-blue-600 w-[250px] p-4">
      <div className="flex mt-2 mb-4 items-center text-2xl font-bold text-white">
        <span>Manga</span>
        <img
          className="object-cover w-12 h-12 drop-shadow-lg -mx-1"
          src={Logo}
          alt="logo"
        />
        <span>Store</span>
      </div>
      <div className="flex flex-col gap-3">
        {menuItems.map((item) => {
          const isActive = location.pathname === item.link; // Check if the item is active

          return (
            <div
              key={item.title}
              className={`flex items-center gap-3 p-3 cursor-pointer text-white rounded-md ${
                isActive ? "bg-blue-800" : "hover:bg-blue-700"
              }`}
              onClick={() => navigate(item.link)}
            >
              {item.icon}
              <h1 className="text-xl">{item.title}</h1>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default SideBar;
