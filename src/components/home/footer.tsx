function Footer() {
  return (
    <div className="flex flex-col mt-auto">
      <div className="bg-gray-800 text-white p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="pb-4">
            <span className="text-lg font-semibold">Sản phẩm</span>
            <div className="border-t border-gray-600 my-2"></div>
            <ul className="space-y-2">
              <li className="flex items-center">
                <a href="https://pgmangashop.com.vn/products/spy-x-family-7-ban-dac-biet/">
                  <img
                    width="100"
                    height="100"
                    src="https://pgmangashop.com.vn/wp-content/uploads/2024/06/314e5bd7-8ae5-4735-b41a-457fb392ed14_c9b327a566fe45d587cd5444a17dec79_grande-100x100.webp"
                    alt=""
                    className="w-16 h-16 mr-3 object-cover"
                    loading="lazy"
                  />
                  <span className="font-medium">
                    Combo SPY x FAMILY 7 bản Đặc Biệt + Thường
                  </span>
                </a>
                <span className="ml-2 text-sm text-gray-400">Liên hệ</span>
              </li>
              {/* Các mục sản phẩm khác... */}
            </ul>
          </div>
          <div className="pb-4">
            <span className="text-lg font-semibold">Danh mục sản phẩm</span>
            <div className="border-t border-gray-600 my-2"></div>
            <ul className="space-y-2">
              <li>
                <a
                  href="https://pgmangashop.com.vn/collections/figure-nhat-dat-truoc-1/"
                  className="text-gray-300 hover:text-white"
                >
                  FIGURE NHẬT ĐẶT TRƯỚC
                </a>
              </li>
              {/* Các danh mục sản phẩm khác... */}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
