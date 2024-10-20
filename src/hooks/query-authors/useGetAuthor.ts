import { authorsApi } from "@/api/authors-api";
import { Author, AuthorResponse } from "@/types/author.type";
import { useQuery } from "@tanstack/react-query";

export const useGetAuthor = (id: string) => {
  return useQuery<AuthorResponse>({
    queryKey: ["category", id],

    queryFn: async () => {
      return (await authorsApi.get(id)).data;
    },
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    retry: 0,
    refetchOnReconnect: true,
  });
};
