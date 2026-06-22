import { getSearchPosts } from "@/api/post";
import { queryKey } from "@/constants/queryKey";
import { useInfiniteQuery } from "@tanstack/react-query";

export default function useGetSearchInfinitePosts(query: string) {
  return useInfiniteQuery({
    queryFn: ({ pageParam }) => getSearchPosts(pageParam, query),
    queryKey: [queryKey.POST, queryKey.GET_SEARCHED_POSTS, query],
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPage) => {
      const lastPost = lastPage[lastPage.length - 1];
      return lastPost ? allPage.length + 1 : undefined;
    },
  });
}
