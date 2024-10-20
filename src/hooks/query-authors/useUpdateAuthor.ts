import { authorsApi } from "@/api/authors-api";
import { CreateAuthor } from "@/types/author.type";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import useToastMessage from "../useToastMessage";
import { useNavigate } from "react-router-dom";

export const useUpdateAuthor = () => {
  const queryClient = useQueryClient();
  const { toastSuccess, toastError } = useToastMessage();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async ({ id, body }: { id: string; body: CreateAuthor }) => {
      return (await authorsApi.update(id, body)).data;
    },
    onSuccess: (data) => {
      toastSuccess("Cập nhật tác giả thành công!");
      queryClient.refetchQueries({ queryKey: ["authors"] });
      queryClient.refetchQueries({ queryKey: ["authors-name"] });
      navigate("/admin/authors");
    },
    onError: (error) => {
      toastError("Cập nhật tác giả thất bại!");
      return error;
    },
  });
};
