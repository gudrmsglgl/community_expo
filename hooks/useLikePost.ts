import { likePost } from "@/api/post";
import queryClient from "@/api/queryClient";
import { queryKey } from "@/constants/queryKey";
import { Post, Profile } from "@/types";
import { InfiniteData, useMutation } from "@tanstack/react-query";

const POST_QUERY_KEY: string[] | number[] = [queryKey.POST, queryKey.GET_POST];

export default function useLikePost() {
  return useMutation({
    mutationFn: likePost,
    onMutate: (postId) => {
      console.log("useLikePost onMutate", postId);
      const postKey = POST_QUERY_KEY.concat(postId);
      const postsKey = [queryKey.POST, queryKey.GET_POSTS];
      queryClient.cancelQueries({ queryKey: postKey });

      const currentUser = queryClient.getQueryData<Profile>([
        queryKey.AUTH,
        queryKey.GET_ME,
      ]);
      const userId = currentUser?.id;

      const previousPost = queryClient.getQueryData<Post>(postKey);
      const previousPosts = queryClient.getQueryData<InfiniteData<Post[]>>(
        postsKey,
      );

      if (!userId) {
        return { previousPost, previousPosts };
      }

      queryClient.setQueryData(
        postsKey,
        (oldData: InfiniteData<Post[]>) => {
          if (!oldData) return oldData;

          return {
            ...oldData,
            pages: oldData.pages.map((page) =>
              page.map((post) =>
                post.id === postId ? toggleLike(post, userId) : post,
              ),
            ),
          };
        },
      );

      queryClient.setQueryData<Post>(postKey, (oldPost) => {
        if (!oldPost) return oldPost;
        return toggleLike(oldPost, userId);
      });

      return { previousPost, previousPosts };
    },
    onError: (error, postId, context) => {
      console.log("useLikePost onError:", error, postId);
      const postKey = POST_QUERY_KEY.concat(postId);
      const postsKey = [queryKey.POST, queryKey.GET_POSTS];
      queryClient.setQueryData(postKey, context?.previousPost);
      queryClient.setQueryData(postsKey, context?.previousPosts);
    },
    onSettled: (data, error, postId, context) => {
      const postKey = POST_QUERY_KEY.concat(postId);
      queryClient.invalidateQueries({ queryKey: postKey });
      queryClient.invalidateQueries({
        queryKey: [queryKey.POST, queryKey.GET_POSTS],
      });
      queryClient.invalidateQueries({
        queryKey: [queryKey.POST, queryKey.GET_LIKED_POSTS],
      });
    },
  });
}

function toggleLike(post: Post, userId: number): Post {
  const liked = post.likes.some((like) => like.userId === userId);
  return {
    ...post,
    likes: liked
      ? post.likes.filter((like) => like.userId !== userId)
      : [...post.likes, { userId }],
  };
}
