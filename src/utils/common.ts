export const formatDate = (date: string) => {
  return new Date(date).toISOString().split("T")[0];
};

export const formatPrice = (price: number) => {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(price);
};

export const calSale = (price: number, sale: number) => {
  return price - (price * sale) / 100;
};

export const totalItems = (carts: Cart[]) => {
  let total = 0;

  for (const item of carts) {
    const sale = item.product_id.price * (item.product_id.sale / 100);
    total += (item.product_id.price - sale) * item.quantity;
  }
  return total;
};
