import { createPost } from "@/api/post";
import queryClient from "@/api/queryClient";
import { queryKey } from "@/constants/queryKey";
import { useMutation } from "@tanstack/react-query";
import { router } from "expo-router";

export default function useCreatePost() {
  return useMutation({
    mutationFn: createPost,
    onSuccess: () => {
      router.replace("/");
      queryClient.invalidateQueries({
        queryKey: [queryKey.POST, queryKey.GET_POSTS],
      });
    },
  });
}
