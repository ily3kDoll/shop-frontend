import { authorsApi } from "@/api/authors-api";
import { CreateAuthor } from "@/types/author.type";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import useToastMessage from "../useToastMessage";
import { useNavigate } from "react-router-dom";

export const useCreateAuthor = () => {
  const queryClient = useQueryClient();
  const { toastSuccess, toastError } = useToastMessage();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async (body: CreateAuthor) => {
      return (await authorsApi.create(body)).data;
    },
    onSuccess: (data) => {
      toastSuccess("Tạo tác giả thành công!");
      queryClient.refetchQueries({ queryKey: ["authors"] });
      queryClient.refetchQueries({ queryKey: ["authors-name"] });
      navigate("/admin/authors");
    },
    onError: (error) => {
      toastError("Tạo tác giả thất bại!");
      return error;
    },
  });
};
