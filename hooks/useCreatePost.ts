import createPost from "@/api/post";
import { useMutation } from "@tanstack/react-query";
import { router } from "expo-router";

export default function useCreatePost() {
  return useMutation({
    mutationFn: createPost,
    onSuccess: () => {
      router.replace("/");
    },
  });
}
