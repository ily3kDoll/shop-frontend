import { useMutation, useQueryClient } from "@tanstack/react-query";
import useToastMessage from "../useToastMessage";
import { useNavigate } from "react-router-dom";
import { CreateUser } from "@/types/user.type";
import { usersApi } from "@/api/users-api";
import { ErrorResponse } from "@/types/error.type";

export const useCreateUser = () => {
  const queryClient = useQueryClient();
  const { toastSuccess, toastError } = useToastMessage();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async (body: CreateUser) => {
      return (await usersApi.createUser(body)).data;
    },
    onSuccess: (response) => {
      toastSuccess("Tạo người dùng thành công");
      queryClient.refetchQueries({ queryKey: ["users"] });
      navigate("/admin/users");
    },
    onError: (error: ErrorResponse) => {
      toastError("Tạo người dùng thất bại");
      return error;
    },
  });
};
