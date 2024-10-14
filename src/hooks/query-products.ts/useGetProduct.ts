import { productsApi } from "@/api/product-api";
import { Product } from "@/types/product.type";
import { useQuery } from "@tanstack/react-query";

export const useGetProduct = (_id: string) => {
  return useQuery<Product>({
    queryKey: ["product", _id],
    queryFn: async () => {
      return (await productsApi.get(_id)).data;
    },
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    retry: 0,
    refetchOnReconnect: true,
  });
};
