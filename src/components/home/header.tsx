import React, { useState } from "react";

const Header: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isCategoryMenuOpen, setIsCategoryMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto p-4">
        {/* Dòng đầu tiên: Logo và Menu chính */}
        <div className="flex flex-col md:flex-row items-center justify-between">
          {/* Logo */}
          <img src="logo.png" alt="Logo" className="h-10 w-10" />

          {/* Menu chính */}
          <nav className="flex flex-wrap items-center space-x-4 my-2 md:my-0">
            <a href="/home" className="text-lg font-semibold">
              Trang chủ
            </a>
            <a href="/about" className="text-lg font-semibold">
              Giới thiệu
            </a>
            <a href="/products" className="text-lg font-semibold">
              Sản phẩm
            </a>

            {/* Danh mục Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsCategoryMenuOpen(!isCategoryMenuOpen)}
                className="text-lg font-semibold"
              >
                Danh mục
              </button>
              {isCategoryMenuOpen && (
                <div className="absolute mt-2 bg-white shadow-md rounded-md z-10">
                  <a href="#" className="block px-4 py-2 hover:bg-gray-100">
                    Tác vụ
                  </a>
                  <a href="#" className="block px-4 py-2 hover:bg-gray-100">
                    Nhà xuất bản
                  </a>
                  <a href="#" className="block px-4 py-2 hover:bg-gray-100">
                    Thể loại
                  </a>
                </div>
              )}
            </div>
            <a href="/contact" className="text-lg font-semibold">
              Liên hệ
            </a>
          </nav>
        </div>

        {/* Dòng thứ hai: Thanh tìm kiếm, Giỏ hàng, Đăng nhập/Đăng ký */}
        <div className="flex flex-col md:flex-row items-center justify-between mt-4">
          {/* Thanh tìm kiếm */}
          <div className="flex w-full md:w-auto mb-2 md:mb-0">
            <input
              type="text"
              placeholder="Tìm kiếm..."
              className="px-4 py-2 border rounded-md w-full md:w-64"
            />
            <button className="bg-blue-500 text-white px-4 py-2 rounded-md ml-2">
              Tìm
            </button>
          </div>

          {/* Giỏ hàng và Đăng nhập/Đăng ký */}
          <div className="flex items-center space-x-4">
            <a href="/cart" className="text-lg font-semibold">
              Giỏ hàng
            </a>

            {/* Kiểm tra trạng thái đăng nhập */}
            <div className="relative">
              {isLoggedIn ? (
                <div>
                  <img
                    src="user-avatar.png"
                    alt="User Avatar"
                    className="h-10 w-10 rounded-full cursor-pointer"
                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  />
                  {isUserMenuOpen && (
                    <div className="absolute mt-2 bg-white shadow-md rounded-md right-0 z-10">
                      <a
                        href="/profile"
                        className="block px-4 py-2 hover:bg-gray-100"
                      >
                        Thông tin cá nhân
                      </a>
                      <a
                        href="/logout"
                        className="block px-4 py-2 hover:bg-gray-100"
                      >
                        Đăng xuất
                      </a>
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex space-x-4">
                  <a href="/login" className="text-lg font-semibold">
                    Đăng nhập
                  </a>
                  <a href="/register" className="text-lg font-semibold">
                    Đăng ký
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
