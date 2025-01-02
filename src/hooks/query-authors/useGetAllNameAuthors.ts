import { authorsApi } from "@/api/authors-api";
import { Author } from "@/types/author.type";
import { useQuery } from "@tanstack/react-query";

export const useGetAllNameAuthors = () => {
  return useQuery<Author[]>({
    queryKey: ["authors-name"],

    queryFn: async () => {
      return (await authorsApi.getAllName()).data;
    },
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    retry: 0,
    refetchOnReconnect: true,
  });
};
