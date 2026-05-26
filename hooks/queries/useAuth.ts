import { editProfile, getMe, postLogin, postSignup } from "@/api/auth";
import queryClient from "@/api/queryClient";
import { queryKey } from "@/constants/queryKey";
import {
  clearAuthorizationHeader,
  setAuthorizationHeader,
} from "@/utils/header";
import {
  deleteAccessToken,
  getAccessToken,
  saveAccessToken,
} from "@/utils/secureStore";
import { useMutation, useQuery } from "@tanstack/react-query";
import { router, useNavigation } from "expo-router";
import { useEffect } from "react";

function useSignup() {
  return useMutation({
    mutationFn: postSignup,
    onSuccess: () => {
      router.replace("/auth/login");
    },
  });
}

function useLogin() {
  const nav = useNavigation();

  return useMutation({
    mutationFn: postLogin,
    onSuccess: async ({ accessToken }) => {
      setAuthorizationHeader(accessToken);
      await saveAccessToken(accessToken);

      const me = await getMe();
      queryClient.setQueryData([queryKey.AUTH, queryKey.GET_ME], me);

      const state = nav.getState();
      const prevRoute = state?.routes?.[state?.index - 1];
      const prevName = prevRoute?.name as string | undefined;
      const isPrevAuthIndex = prevName === "index";

      if (isPrevAuthIndex) {
        router.replace("/");
        return;
      }

      if (router.canGoBack()) {
        router.back();
        return;
      }

      router.replace("/");
    },
    onError: (error) => {
      console.log("error", error);
    },
  });
}

function useGetMe() {
  const { data, isSuccess, isError, isLoading, refetch } = useQuery({
    queryFn: getMe,
    queryKey: [queryKey.AUTH, queryKey.GET_ME],
  });

  useEffect(() => {
    (async () => {
      if (!isSuccess) return;

      const accessToken = await getAccessToken();

      if (accessToken) {
        setAuthorizationHeader(accessToken);
        return;
      }

      clearAuthorizationHeader();
    })();
  }, [isSuccess]);

  useEffect(() => {
    if (isError) {
      clearAuthorizationHeader();
      deleteAccessToken();
    }
  }, [isError]);

  return { data, isLoading, isError, refetch };
}

function useEditProfile() {
  return useMutation({
    mutationFn: editProfile,
    onSuccess: (updatedProfile) => {
      queryClient.setQueryData(
        [queryKey.AUTH, queryKey.GET_ME],
        updatedProfile,
      );
      queryClient.invalidateQueries({
        queryKey: [queryKey.POST, queryKey.GET_MY_POSTS],
      });
      queryClient.invalidateQueries({
        queryKey: [queryKey.POST, queryKey.GET_POSTS],
      });
      queryClient.invalidateQueries({
        queryKey: [queryKey.POST, queryKey.GET_LIKED_POSTS],
      });
    },
  });
}

export default function useAuth() {
  const { data, isLoading, refetch } = useGetMe();
  const signupMutation = useSignup();
  const loginMutation = useLogin();
  const profileUpdateMutation = useEditProfile();

  const shouldGoLogin = !data?.id && !isLoading;

  const goLogin = () => {
    router.push("/auth/login");
  };

  const logout = () => {
    clearAuthorizationHeader();
    deleteAccessToken();
    queryClient.resetQueries({ queryKey: [queryKey.AUTH] });
  };

  return {
    auth: {
      id: data?.id || "",
      thumbnailUri: data?.imageUri,
      nickname: data?.nickname,
      introduce: data?.introduce,
      shouldGoLogin,
      goLogin,
    },
    authLoading: isLoading,
    refetchAuth: refetch,
    signupMutation,
    loginMutation,
    profileUpdateMutation,
    logout,
  };
}
