import { getPost } from "@/api/post";
import { queryKey } from "@/constants/queryKey";
import { useQuery } from "@tanstack/react-query";

export default function useGetPost(id: number) {
  return useQuery({
    queryFn: () => getPost(Number(id)),
    queryKey: [queryKey.POST, queryKey.GET_POST, id],
    enabled: Boolean(id),
  });
}
