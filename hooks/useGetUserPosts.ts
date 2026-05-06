import { getUserPosts } from "@/api/post";
import { queryKey } from "@/constants/queryKey";
import { useInfiniteQuery } from "@tanstack/react-query";

export default function useGetUserPosts(id: number) {
  return useInfiniteQuery({
    queryFn: ({ pageParam }) => getUserPosts(id, pageParam),
    queryKey: [queryKey.POST, queryKey.GET_USER_POSTS, id],
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      const lastUserPost = lastPage[lastPage.length - 1];
      return lastUserPost ? allPages.length + 1 : undefined;
    },
  });
}
