import { createVote } from "@/api/post";
import queryClient from "@/api/queryClient";
import { queryKey } from "@/constants/queryKey";
import { useMutation } from "@tanstack/react-query";

export default function useCreateVote() {
  return useMutation({
    mutationFn: createVote,
    onSuccess: (response) => {
      queryClient.invalidateQueries({
        queryKey: [queryKey.POST, queryKey.GET_POST, response.postId],
      });
    },
  });
}
