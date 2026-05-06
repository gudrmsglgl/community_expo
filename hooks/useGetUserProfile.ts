import { getUserProfile } from "@/api/auth";
import { queryKey } from "@/constants/queryKey";
import { useQuery } from "@tanstack/react-query";

export default function useGetUserProfile(id: number) {
  return useQuery({
    queryFn: () => getUserProfile(id),
    queryKey: [queryKey.AUTH, queryKey.GET_USER_PROFILE, id],
  });
}
