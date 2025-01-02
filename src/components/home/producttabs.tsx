import { Tabs, TabsContent, TabsList, TabsTrigger } from "@radix-ui/react-tabs";
import React, { useState, useEffect } from "react";
import { useGetAllCategories } from "@/hooks/query-categories/useGetAllCategories";
import { useGetProductsByCategory } from "@/hooks/query-products/useGetProductsByCategory";
import { formatPrice, calSale } from "@/utils/common";
import { Link } from "react-router-dom";

const ProductTabs: React.FC = () => {
  const [categoryId, setCategoryId] = useState<string>(
    "675b27bd131c30c48230e821"
  );
  const [activeTab, setActiveTab] = useState<string>(
    "675b27bd131c30c48230e821"
  );
  const [subcategories, setSubcategories] = useState<any[]>([]);

  const { data: categories } = useGetAllCategories({
    page: 1,
    limit: 100,
    sort: "asc",
    keyword: "",
  });

  const { data: products } = useGetProductsByCategory(categoryId, "");

  useEffect(() => {
    if (categories?.entities?.length) {
      const parentCategory = categories.entities.find(
        (category) => category._id === "675b27bd131c30c48230e821"
      );

      if (parentCategory && parentCategory.children?.length > 0) {
        setSubcategories(parentCategory.children);
        setCategoryId(parentCategory.children[0]._id);
        setActiveTab(parentCategory.children[0]._id);
      }
    }
  }, [categories]);

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
    setCategoryId(tabId);
  };

  if (!categories) {
    return <div>Đang tải danh mục...</div>;
  }

  if (subcategories.length === 0) {
    return <div>Không có danh mục con nào.</div>;
  }

  return (
    <div className="container mx-auto">
      <div className="border rounded-lg bg-white shadow-lg min-h-[447px]">
        <Tabs
          value={activeTab}
          onValueChange={handleTabChange}
          className="w-full pl-6 pr-6"
        >
          <TabsList className="flex space-x-4">
            {subcategories?.map((subcategory) => (
              <TabsTrigger
                key={subcategory._id}
                value={subcategory._id}
                className={`p-2 cursor-pointer ${
                  activeTab === subcategory._id
                    ? "border-b-2 border-red-600 text-red-600 font-semibold"
                    : "text-gray-600 hover:text-red-600 transition"
                }`}
              >
                {subcategory.name}
              </TabsTrigger>
            ))}
          </TabsList>

          <div className="border-t border-gray-300"></div>

          <TabsContent value={activeTab}>
            {products?.length === 0 ? (
              <div className="flex justify-center items-center w-full h-64">
                <div className="text-center">
                  <h2 className="text-xl text-gray-700">
                    Không tìm thấy sản phẩm
                  </h2>
                  <p className="text-sm text-gray-500 mt-2">
                    Hãy thử chọn danh mục khác.
                  </p>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-4 gap-4 p-4">
                {products?.map((product) => (
                  <Link
                    to={`/products/${product._id}`}
                    key={product._id}
                    className="rounded-lg p-4 shadow-sm hover:shadow-xl block relative"
                  >
                    {product.stock === 0 && (
                      <div className="absolute top-2 right-2 bg-gray-400 text-white text-xs font-bold px-2 py-1 rounded-full">
                        Hết hàng
                      </div>
                    )}
                    <img
                      src={product.image_url}
                      alt={product.name}
                      style={{
                        width: "100%",
                        height: "192px",
                        objectFit: "cover",
                      }}
                      className="mb-3 rounded"
                    />
                    <h1 className="text-sm mb-2 min-h-[40px] font-medium text-gray-700 hover:text-red-500 line-clamp-2">
                      {product.name}
                    </h1>
                    <div className="price-label">
                      {product.sale > 0 ? (
                        <>
                          <p className="special-price flex items-center">
                            <span className="text-md text-red-500 font-bold">
                              {formatPrice(
                                calSale(product.price, product.sale)
                              )}
                            </span>
                            <span className="ml-2 text-xs text-white bg-red-500 px-2 py-1 rounded-full font-bold">
                              -{product.sale}%
                            </span>
                          </p>
                          <p className="old-price">
                            <span className="text-sm text-gray-400 line-through">
                              {formatPrice(product.price)}
                            </span>
                          </p>
                        </>
                      ) : (
                        <p className="special-price min-h-[48px] text-md text-gray-700 font-bold">
                          {formatPrice(product.price)}
                        </p>
                      )}
                    </div>
                    <button className="w-full mt-2 py-1 text-sm font-bold border-2 border-red-500 text-red-500 rounded hover:bg-red-500 hover:text-white transition">
                      Xem chi tiết
                    </button>
                  </Link>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ProductTabs;
