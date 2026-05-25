import { editProfile } from "@/api/auth";
import queryClient from "@/api/queryClient";
import { queryKey } from "@/constants/queryKey";
import { useMutation } from "@tanstack/react-query";

export default function useEditProfile() {
  return useMutation({
    mutationFn: editProfile,
    onSuccess: (profile) => {
      queryClient.invalidateQueries({
        queryKey: [queryKey.AUTH, queryKey.GET_ME],
      });
    },
  });
}
