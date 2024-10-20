import { useMutation, useQueryClient } from "@tanstack/react-query";
import useToastMessage from "../useToastMessage";
import { useCategoryStore } from "@/store/useCategoryStore";
import { categoriesApi } from "@/api/categories-api";
import { ErrorResponse } from "@/types/error.type";
import { authorsApi } from "@/api/authors-api";
import { useAuthorStore } from "@/store/useAuthorStore";

export const useDeleteAuthor = () => {
  const queryClient = useQueryClient();
  const { toastSuccess, toastError } = useToastMessage();
  const { setModalDelete } = useAuthorStore();

  return useMutation({
    mutationFn: async (_id: string) => {
      return (await authorsApi.delete(_id)).data;
    },
    onSuccess: (response) => {
      toastSuccess("Xoá tác giả thành công");
      queryClient.refetchQueries({ queryKey: ["authors"] });
      queryClient.refetchQueries({ queryKey: ["authors-name"] });
      setModalDelete(false);
    },
    onError: (error: ErrorResponse) => {
      toastError("Xoá tác giả thất bại");
      return error;
    },
  });
};
