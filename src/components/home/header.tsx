import { useEffect, useState } from "react";
import { useGetMeCustomer } from "@/hooks/query-customers/useGetMeCustomers";
import useToastMessage from "@/hooks/useToastMessage";
import { LocalUtils } from "@/utils/local-utils";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Button } from "../ui/button";
import { IoLogOutOutline, IoSearchOutline } from "react-icons/io5";
import { FaCartShopping } from "react-icons/fa6";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { IoIosInformationCircleOutline } from "react-icons/io";
import Logo from "../../assets/logo2.png";
import { useIndexStore } from "@/store/useIndexStore";

const Header = () => {
  const { data } = useGetMeCustomer();
  const navigate = useNavigate();
  const { toastSuccess } = useToastMessage();
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const [text, setText] = useState("");
  const { setKeyword } = useIndexStore();

  const handleSearch = () => {
    if (text) {
      navigate("/products");
      setKeyword(text);
    } else {
      setKeyword("");
    }
  };
  const handleLogout = () => {
    toastSuccess("Đăng xuất thành công!");
    LocalUtils.removeLocalToken();
    window.location.href = "/";
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 650);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const isHomePage = location.pathname === "/";

  return (
    <header
      className={`${
        isHomePage
          ? `fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
              scrolled
                ? "bg-blue-500 shadow-md text-white"
                : "bg-transparent backdrop-blur-md text-white"
            }`
          : "sticky top-0 left-0 w-full z-50 bg-blue-500 shadow-md text-white"
      }`}
    >
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <span className="text-3xl font-semibold">Manga</span>
          <img
            className="object-cover w-12 h-12 drop-shadow-lg -mx-0.5"
            src={Logo}
            alt="logo"
          />
          <span className="text-3xl font-semibold">Store</span>
        </Link>

        {/* Navigation */}
        <nav className="hidden md:flex space-x-1">
          <Link to={"/"}>
            <Button variant={"ghost"} className="text-sm">
              Trang chủ
            </Button>
          </Link>
          <Link to={"/products"}>
            <Button variant={"ghost"} className="text-sm">
              Sản phẩm
            </Button>
          </Link>
          <Link to={"/blogs"}>
            <Button variant={"ghost"} className="text-sm">
              Tin tức
            </Button>
          </Link>
          <Link to={"/contact"}>
            <Button variant={"ghost"} className="text-sm">
              Liên hệ
            </Button>
          </Link>
        </nav>

        {/* Search Bar */}
        <div className="relative flex items-center w-full max-w-[250px] mx-4">
          <input
            type="text"
            placeholder="Tìm kiếm sản phẩm..."
            onChange={(e) => {
              setText(e.target.value);
              if (e.target.value === "") {
                setText(e.target.value);
                setKeyword(e.target.value);
              }
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSearch();
              }
            }}
            className="w-full px-4 py-2 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-blue-600 shadow-md"
          />
          <button
            onClick={handleSearch}
            className="absolute right-2 text-blue-600 hover:text-blue-800 focus:outline-none transition-colors duration-300 ease-in-out"
          >
            <IoSearchOutline size={20} />
          </button>
        </div>

        {/* User Actions */}
        <div className="flex items-center space-x-2">
          <Link to={"/cart"}>
            <Button size={"icon"} className="bg-slate-700">
              <FaCartShopping />
            </Button>
          </Link>
          {data ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="relative h-8 w-8 rounded-full"
                >
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={data.image_url} />
                    <AvatarFallback>DTN</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" forceMount>
                <DropdownMenuItem onClick={() => navigate("/profile")}>
                  <IoIosInformationCircleOutline className="mr-2 h-4 w-4" />
                  <span className="text-sm">Thông tin</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleLogout}>
                  <IoLogOutOutline className="mr-2 h-4 w-4" />
                  <span className="text-sm">Đăng xuất</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <>
              <Link to={"/register"}>
                <Button className="text-sm hidden md:inline-block">
                  Đăng Ký
                </Button>
              </Link>
              <Link to={"/login"}>
                <Button className="text-sm">Đăng Nhập</Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
