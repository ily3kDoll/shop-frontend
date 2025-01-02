import { ordersApi } from "@/api/orders-api";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useChangeStatusOrder = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, status }: { id: string; status: string }) => {
      return (await ordersApi.changeStatus(id, status)).data;
    },
    onSuccess: (data) => {
      queryClient.refetchQueries({ queryKey: ["orders"] });
    },
  });
};
