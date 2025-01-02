import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";
import React from "react";
import { Link } from "react-router-dom";
import Logo from "../../assets/logo2.png";

const Footer: React.FC = () => {
  return (
    <footer className="bg-blue-950 text-gray-200 py-10 px-40">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Logo và giới thiệu */}
          <div>
            <Link to="/" className="flex mb-4 items-center">
              <span className="text-3xl font-semibold">Manga</span>
              <img
                className="object-cover w-12 h-12 drop-shadow-lg -mx-0.5"
                src={Logo}
                alt="logo"
              />
              <span className="text-3xl font-semibold">Store</span>
            </Link>
            <p className="text-gray-400">
              Nơi cung cấp các bộ manga yêu thích, từ những bộ kinh điển đến các
              bộ mới nhất. Hãy khám phá thế giới manga cùng chúng tôi!
            </p>
            {/* Liên kết mạng xã hội bên dưới Manga Store */}
            <div className="flex space-x-4 mt-4">
              <a href="https://facebook.com" className="hover:text-white">
                <FaFacebook size={24} />
              </a>
              <a href="https://instagram.com" className="hover:text-white">
                <FaInstagram size={24} />
              </a>
              <a href="https://twitter.com" className="hover:text-white">
                <FaTwitter size={24} />
              </a>
            </div>
          </div>

          {/* Các liên kết nhanh */}
          <div>
            <h2 className="text-lg font-semibold text-white mb-3">
              Liên kết nhanh
            </h2>
            <ul className="space-y-2">
              <li>
                <a href="/about" className="hover:text-white">
                  Về chúng tôi
                </a>
              </li>
              <li>
                <a href="/terms" className="hover:text-white">
                  Điều khoản dịch vụ
                </a>
              </li>
              <li>
                <a href="/privacy" className="hover:text-white">
                  Chính sách bảo mật
                </a>
              </li>
              <li>
                <a href="/contact" className="hover:text-white">
                  Liên hệ
                </a>
              </li>
            </ul>
          </div>

          {/* Đăng ký nhận tin */}
          <div>
            <h2 className="text-lg font-semibold text-white mb-3">
              Đăng ký nhận tin
            </h2>
            <p className="text-gray-400 mb-3">
              Nhận các cập nhật mới nhất về sản phẩm và ưu đãi đặc biệt.
            </p>
            <form className="flex space-x-2">
              <input
                type="email"
                placeholder="Email của bạn"
                className="px-3 py-2 rounded-md bg-gray-700 text-gray-200 focus:outline-none"
              />
              <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-500">
                Đăng ký
              </button>
            </form>
          </div>
        </div>

        {/* Bản quyền */}
        <div className="mt-8 text-center text-gray-500">
          © {new Date().getFullYear()} Manga Store. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
