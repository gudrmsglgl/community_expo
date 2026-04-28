import { likePost } from "@/api/post";
import queryClient from "@/api/queryClient";
import { queryKey } from "@/constants/queryKey";
import { Post, Profile } from "@/types";
import { useMutation } from "@tanstack/react-query";

const POST_QUERY_KEY: string[] | number[] = [queryKey.POST, queryKey.GET_POST];

export default function useLikePost() {
  return useMutation({
    mutationFn: likePost,
    onMutate: (postId) => {
      const postKey = POST_QUERY_KEY.concat(postId);
      queryClient.cancelQueries({ queryKey: postKey });

      const currentUser = queryClient.getQueryData<Profile>([
        queryKey.AUTH,
        queryKey.GET_ME,
      ]);

      const previousPost = queryClient.getQueryData<Post>(postKey);
      const likeUpdatedPost = { ...previousPost };

      const likeIndex = likeUpdatedPost.likes.findIndex(
        (like) => like.userId === currentUser?.id,
      );

      likeIndex !== -1
        ? likeUpdatedPost.likes.slice(likeIndex, 1)
        : likeUpdatedPost.likes.push({ userId: currentUser?.id });

      return { previousPost, likeUpdatedPost };
    },
    onError: (error, postId, context) => {
      const postKey = POST_QUERY_KEY.concat(postId);
      queryClient.setQueryData(postKey, context?.previousPost);
    },
    onSettled: (data, error, postId, context) => {
      const postKey = POST_QUERY_KEY.concat(postId);
      queryClient.invalidateQueries({ queryKey: postKey });
      queryClient.invalidateQueries({
        queryKey: [queryKey.POST, queryKey.GET_POSTS],
      });
    },
  });
}
