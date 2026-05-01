import { getLikedPosts } from "@/api/post";
import { queryKey } from "@/constants/queryKey";
import { useInfiniteQuery } from "@tanstack/react-query";

export default function useGetLikedPosts() {
  return useInfiniteQuery({
    queryFn: ({ pageParam }) => getLikedPosts(pageParam),
    queryKey: [queryKey.POST, queryKey.GET_LIKED_POSTS],
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      const lastPost = lastPage[lastPage.length - 1];
      return lastPost ? allPages.length + 1 : undefined;
    },
  });
}
