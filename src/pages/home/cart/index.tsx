import { Button } from "@/components/ui/button";
import { useAddCart } from "@/hooks/query-cart/useAddCart";
import { useDeleteProductCart } from "@/hooks/query-cart/useDeleteProductCart";
import { useGetCart } from "@/hooks/query-cart/useGetCart";
import { calSale, totalItems } from "@/utils/common";
import { useNavigate } from "react-router-dom";

function CartPage() {
  const { data: cart } = useGetCart();
  const navigate = useNavigate();
  const mutationAddCart = useAddCart();
  const mutationDeleteCart = useDeleteProductCart();

  function handleQuantity(product_id: string, quantity: number) {
    mutationAddCart.mutate({ product_id, quantity });
  }

  function handleDeleteCart(id: string) {
    mutationDeleteCart.mutate(id);
  }

  const formatCurrency = (value: number) => {
    return value.toLocaleString("vi-VN").replace(/,/g, ".");
  };

  return (
    <div className="container mx-auto gap-4 p-8">
      <div className="flex gap-4">
        <div className="flex-1 bg-gray-100 p-6 rounded-lg shadow-md min-h-[300px]">
          {cart && cart.length === 0 ? (
            <div className="text-center p-8">
              <h2 className="text-xl font-bold text-gray-700">
                Giỏ hàng của bạn đang trống
              </h2>
              <p className="text-sm text-gray-500 mt-2">
                Hãy chọn sản phẩm và thêm vào giỏ hàng.
              </p>
              <Button
                onClick={() => navigate("/products")}
                className="mt-4 bg-green-500 text-white hover:bg-green-600"
              >
                Tìm Hàng
              </Button>
            </div>
          ) : (
            <>
              <div className="flex justify-between font-semibold text-gray-700 border-b pb-4 mb-4">
                <span className="flex-1">Sản phẩm</span>
                <span className="w-32 text-center">Số lượng</span>
                <span className="w-32 text-center">Thành tiền</span>
                <span className="w-20 text-center"></span>
              </div>
              <ul className="space-y-4">
                {cart?.map((item) => (
                  <li
                    key={item._id}
                    className="flex items-center justify-between border-b pb-4"
                  >
                    <div className="flex items-center w-full gap-4">
                      <img
                        src={item.product_id.image_url}
                        alt={item.product_id.image_url}
                        className="w-24 h-24 rounded-lg"
                      />
                      <div className="flex-1">
                        <h2 className="text-lg font-semibold mb-5">
                          {item.product_id.name}
                        </h2>
                        <div className="flex items-center gap-4">
                          {item.product_id.sale > 0 && (
                            <p className="text-gray-600 line-through">
                              {formatCurrency(item.product_id.price)} đ
                            </p>
                          )}
                          <p
                            className={`font-semibold ${
                              item.product_id.sale > 0
                                ? "text-red-500"
                                : "text-gray-900"
                            }`}
                          >
                            {formatCurrency(
                              item.product_id.sale > 0
                                ? calSale(
                                    item.product_id.price,
                                    item.product_id.sale
                                  )
                                : item.product_id.price
                            )}{" "}
                            đ
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-4">
                        <div className="flex items-center">
                          <Button
                            onClick={() =>
                              handleQuantity(item.product_id._id, -1)
                            }
                            size={"icon"}
                            className="border border-gray-300 rounded-l-md bg-gray-100 text-black hover:bg-gray-200"
                          >
                            -
                          </Button>
                          <span className="mx-2 text-lg">{item.quantity}</span>
                          <Button
                            onClick={() =>
                              handleQuantity(item.product_id._id, 1)
                            }
                            size={"icon"}
                            className="border border-gray-300 rounded-r-md bg-gray-100 text-black hover:bg-gray-200"
                          >
                            +
                          </Button>
                        </div>
                        <p className="w-32 text-xl font-bold text-center">
                          {formatCurrency(
                            calSale(
                              item.product_id.price,
                              item.product_id.sale
                            ) * item.quantity
                          )}{" "}
                          đ
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-col items-end p-6">
                      <Button
                        onClick={() => handleDeleteCart(item.product_id._id)}
                        size={"icon"}
                        variant={"destructive"}
                      >
                        Xoá
                      </Button>
                    </div>
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>

        <div className="w-1/3 bg-white p-6 rounded-lg shadow-md">
          <div className="flex justify-between mb-6">
            <h2 className="text-xl font-bold">Thành tiền:</h2>
            <p className="text-xl font-bold">
              {formatCurrency(totalItems(cart ?? []))} đ
            </p>
          </div>

          {cart && cart.length > 0 ? (
            <button
              onClick={() => navigate("/place-order")}
              className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600"
            >
              Thanh Toán
            </button>
          ) : (
            <button
              onClick={() => navigate("/products")}
              className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600"
            >
              Tìm Hàng
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default CartPage;
