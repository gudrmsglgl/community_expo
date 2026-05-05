import { getMyPosts } from "@/api/post";
import { queryKey } from "@/constants/queryKey";
import { useInfiniteQuery } from "@tanstack/react-query";

export default function useGetMyPosts() {
  return useInfiniteQuery({
    queryFn: ({ pageParam }) => getMyPosts(pageParam),
    queryKey: [queryKey.POST, queryKey.GET_MY_POSTS],
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      const lastMyPost = lastPage[lastPage.length - 1];
      return lastMyPost ? allPages.length + 1 : undefined;
    },
  });
}
