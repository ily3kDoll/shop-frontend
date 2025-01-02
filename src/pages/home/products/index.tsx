import CategoryItem from "@/components/home/category-item";
import { Button } from "@/components/ui/button";
import { useGetAllCategories } from "@/hooks/query-categories/useGetAllCategories";
import { useGetProductsByCategory } from "@/hooks/query-products/useGetProductsByCategory";
import { useIndexStore } from "@/store/useIndexStore";
import { formatPrice, calSale } from "@/utils/common";
import { useState } from "react";
import { Link } from "react-router-dom";

function ProductsHomePage() {
  const { keyword } = useIndexStore();
  const [categoryId, setCategoryId] = useState("all");

  const { data: categories } = useGetAllCategories({
    page: 1,
    limit: 100,
    sort: "asc",
    keyword: "",
  });

  const filteredCategories = categories?.entities?.filter((category) => {
    return category.status === true;
  });

  const { data: products } = useGetProductsByCategory(categoryId, keyword);

  const filteredProducts =
    categoryId === "all"
      ? products?.filter((product) => product.status === true)
      : products;

  return (
    <div className="container mx-auto flex gap-4 p-8">
      <div className="flex flex-col gap-2 p-2 w-1/4 bg-white rounded-lg shadow-md">
        <Button
          className={`w-full justify-start ${
            categoryId === "all" && "bg-gray-400"
          }`}
          variant={"ghost"}
          onClick={() => setCategoryId("all")}
        >
          Tất cả
        </Button>
        {filteredCategories?.map((category) => (
          <CategoryItem
            setCategoryId={setCategoryId}
            key={category._id}
            category={category}
            categoryId={categoryId}
          />
        ))}
      </div>

      <div className="flex flex-col w-3/4 bg-white rounded-lg shadow-md p-4 min-h-[405px]">
        {filteredProducts?.length === 0 ? (
          <div className="text-center p-8">
            <h2 className="text-xl text-gray-700">Không tìm thấy sản phẩm</h2>
            <p className="text-sm text-gray-500 mt-2">
              Hãy thử tìm kiếm lại hoặc chọn danh mục khác.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-4 gap-4">
            {filteredProducts?.map((product) => (
              <Link
                to={`/products/${product._id}`}
                key={product._id}
                className="relative rounded-lg p-4 shadow-sm hover:shadow-xl block"
              >
                {product.stock === 0 && (
                  <div className="absolute top-2 right-2 bg-gray-400 text-white text-xs font-bold py-1 px-2 rounded-full">
                    Hết hàng
                  </div>
                )}
                <img
                  src={product.image_url}
                  alt={product.name}
                  style={{ width: "100%", height: "192px", objectFit: "cover" }}
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
                          {formatPrice(calSale(product.price, product.sale))}
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
                    <p className="text-md font-bold text-gray-700 min-h-[48px]">
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
      </div>
    </div>
  );
}

export default ProductsHomePage;
