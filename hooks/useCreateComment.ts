import { createComment } from "@/api/comment";
import queryClient from "@/api/queryClient";
import { queryKey } from "@/constants/queryKey";
import { useMutation } from "@tanstack/react-query";

export default function useCreateComment() {
  return useMutation({
    mutationFn: createComment,
    onSuccess: (postId: number) => {
      queryClient.invalidateQueries({
        queryKey: [queryKey.GRAPHQL_POST, queryKey.GRAPHQL_QUERY_POST, postId],
      });
    },
  });
}
