import { authorsApi } from "@/api/authors-api";
import { categoriesApi } from "@/api/categories-api";
import { Author } from "@/types/author.type";
import { Category } from "@/types/category.type";
import { ParamPagination, ResponsePagination } from "@/types/pagination.type";
import { useQuery } from "@tanstack/react-query";

export const useGetAllAuthors = (params: ParamPagination) => {
  return useQuery<ResponsePagination<Author>>({
    queryKey: ["authors", params.keyword],
    queryFn: async () => {
      return (await authorsApi.getAll(params)).data;
    },
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    retry: 0,
    refetchOnReconnect: true,
  });
};
