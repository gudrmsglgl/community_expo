import {
  getBottoms,
  getFaces,
  getHands,
  getHats,
  getSkins,
  getTops,
} from "@/api/avatar";
import { queryKey } from "@/constants/queryKey";
import { useQueries } from "@tanstack/react-query";

export default function useGetAvatarItems() {
  const [hatQuery, faceQuery, skinQuery, topQuery, handQuery, bottomQuery] =
    useQueries({
      queries: [
        {
          queryFn: getHats,
          queryKey: [queryKey.AVATAR, "hats"],
        },
        {
          queryFn: getFaces,
          queryKey: [queryKey.AVATAR, "faces"],
        },
        {
          queryFn: getSkins,
          queryKey: [queryKey.AVATAR, "skins"],
        },
        {
          queryFn: getTops,
          queryKey: [queryKey.AVATAR, "tops"],
        },
        {
          queryFn: getHands,
          queryKey: [queryKey.AVATAR, "hands"],
        },
        {
          queryFn: getBottoms,
          queryKey: [queryKey.AVATAR, "bottoms"],
        },
      ],
    });

  return {
    hats: hatQuery.data || [],
    faces: faceQuery.data || [],
    skins: skinQuery.data || [],
    tops: topQuery.data || [],
    hands: handQuery.data || [],
    bottoms: bottomQuery.data || [],
  };
}
