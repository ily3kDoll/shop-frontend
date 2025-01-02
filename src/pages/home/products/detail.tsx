import EmblaCarousel from "@/components/embla-carousel";
import ProductTabs from "@/components/home/producttabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAddCart } from "@/hooks/query-cart/useAddCart";
import { useGetProduct } from "@/hooks/query-products/useGetProduct";
import { calSale, formatPrice } from "@/utils/common";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function ProductDetailPage() {
  const productId = useParams().id;
  const { data: product } = useGetProduct(productId ?? "");
  const [quantity, setQuantity] = useState(1);
  const mutation = useAddCart();

  function handleQuantity(quantity: number) {
    if (quantity > 0) {
      setQuantity(quantity);
    }
  }

  useEffect(() => {
    console.log(mutation.error);
  }, [mutation.error]);

  function handleAddCart() {
    mutation.mutate({ product_id: product?._id ?? "", quantity: quantity });
    setQuantity(1);
  }

  return (
    <div className="container p-8 flex flex-col gap-4">
      <div className="flex gap-4">
        <div className="w-1/3 bg-white p-4 rounded-lg shadow-lg flex justify-center">
          {product && <EmblaCarousel product={product} />}
        </div>
        <div className="w-2/3 flex flex-col gap-2">
          <div className="bg-white p-4 rounded-lg shadow-sm flex flex-col gap-2 h-full">
            <h1 className="text-2xl font-bold mb-2">{product?.name}</h1>
            <h1 className="font-medium text-lg">Số lượng: {product?.stock}</h1>
            {product?.sale && product?.sale > 0 ? (
              <>
                <div className="flex items-center">
                  <h1 className="font-medium text-lg mr-2">Giá:</h1>
                  <h1 className="text-md text-red-500 font-bold">
                    {formatPrice(
                      calSale(product?.price ?? 0, product?.sale ?? 0)
                    )}
                  </h1>
                  <span className="ml-2 text-xs text-white bg-red-500 px-2 py-1 rounded-full font-bold">
                    -{product.sale}%
                  </span>
                </div>
                <div className="flex gap-2 items-center">
                  <h1 className="ml-10 text-sm text-gray-400 line-through">
                    {formatPrice(product?.price ?? 0)}
                  </h1>
                </div>
              </>
            ) : (
              <div className="flex items-center gap-2">
                <h1 className="font-medium text-lg">Giá:</h1>
                <span className="text-md text-red-500 font-bold">
                  {formatPrice(product?.price ?? 0)}
                </span>
              </div>
            )}
          </div>

          <div className="bg-white p-4 rounded-lg shadow-md flex flex-col gap-2">
            <div className="flex items-center mt-2 gap-2">
              <h1 className="font-bold text-xl">Số lượng:</h1>
              <div className="flex items-center">
                <Button
                  onClick={() => handleQuantity(quantity - 1)}
                  size={"icon"}
                  className="border border-gray-300 rounded-l-md bg-gray-100 text-black hover:bg-gray-200"
                  disabled={product?.stock === 0}
                >
                  -
                </Button>
                <Input
                  className="w-10 border-0 mx-1 text-center"
                  onChange={(e) => setQuantity(+e.target.value)}
                  value={quantity}
                  disabled={product?.stock === 0}
                />
                <Button
                  onClick={() => handleQuantity(quantity + 1)}
                  size={"icon"}
                  className="border border-gray-300 rounded-r-md bg-gray-100 text-black hover:bg-gray-200"
                  disabled={product?.stock === 0}
                >
                  +
                </Button>
              </div>
            </div>

            <Button
              className={`w-full mt-2 py-1 text-sm font-bold rounded transition ${
                product?.stock === 0
                  ? "bg-gray-400 text-white cursor-not-allowed"
                  : "bg-white border-2 border-red-500 text-red-500 hover:bg-red-500 hover:text-white"
              }`}
              onClick={handleAddCart}
              size={"default"}
              disabled={product?.stock === 0}
            >
              {product?.stock === 0 ? "Hết hàng" : "Thêm vào giỏ hàng"}
            </Button>
          </div>
        </div>
      </div>

      <div className="bg-white p-4 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold mb-2">Mô tả sản phẩm</h1>
        <h1 className="text-1xl font-bold mb-2">{product?.name}</h1>
        <h1>{product?.description}</h1>
      </div>

      <ProductTabs />
    </div>
  );
}

export default ProductDetailPage;
