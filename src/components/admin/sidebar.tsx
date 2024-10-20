import { HomeIcon } from "@radix-ui/react-icons";
import { MdManageAccounts } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { TbCategoryFilled } from "react-icons/tb";
import { FaBook } from "react-icons/fa";
import { HiUsers } from "react-icons/hi2";
import { CiBag1 } from "react-icons/ci";

const menuItems = [
  {
    title: "Home",
    icon: <HomeIcon className="h-5 w-5" />,
    link: "/admin",
  },
  {
    title: "Authors",
    icon: <CiBag1 className="h-5 w-5" />,
    link: "/admin/authors",
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
    title: "Users",
    icon: <MdManageAccounts className="h-5 w-5" />,
    link: "/admin/users",
  },
  {
    title: "Customers",
    icon: <HiUsers className="h-5 w-5" />,
    link: "/admin/customers",
  },
  {
    title: "Orders",
    icon: <CiBag1 className="h-5 w-5" />,
    link: "/admin/orders",
  },
];

function SideBar() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-500 w-[200px]">
      <h1 className="text-xl p-4">Store</h1>
      <div className="flex flex-col gap-4 w-full">
        {menuItems.map((item) => (
          <div
            key={item.title}
            className="hover:bg-stone-400 flex items-center gap-2 p-2 cursor-pointer"
            onClick={() => navigate(item.link)}
          >
            {item.icon}
            <h1 className="text-xl">{item.title}</h1>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SideBar;
