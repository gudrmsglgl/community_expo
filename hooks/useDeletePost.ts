import { deletePost } from "@/api/post";
import queryClient from "@/api/queryClient";
import { queryKey } from "@/constants/queryKey";
import { useMutation } from "@tanstack/react-query";

export default function useDeletePost() {
  return useMutation({
    mutationFn: deletePost,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [queryKey.POST, queryKey.GET_POSTS],
      });
    },
  });
}
