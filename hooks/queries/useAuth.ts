import { getMe, postLogin, postSignup } from "@/api/auth";
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
      queryClient.fetchQuery({
        queryKey: [queryKey.AUTH, queryKey.GET_ME],
      });

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
  const { data, isSuccess, isError } = useQuery({
    queryFn: getMe,
    queryKey: [queryKey.AUTH, queryKey.GET_ME],
  });

  useEffect(() => {
    (async () => {
      if (isSuccess) {
        const accessToken = await getAccessToken();
        setAuthorizationHeader(accessToken);
      }
    })();
  }, [isSuccess]);

  useEffect(() => {
    if (isError) {
      clearAuthorizationHeader();
      deleteAccessToken();
    }
  }, [isError]);

  return { data };
}

export default function useAuth() {
  const { data } = useGetMe();
  const signupMutation = useSignup();
  const loginMutation = useLogin();

  const logout = () => {
    clearAuthorizationHeader();
    deleteAccessToken();
    queryClient.resetQueries({ queryKey: [queryKey.AUTH] });
  };

  return {
    auth: {
      id: data?.id || "",
    },
    signupMutation,
    loginMutation,
    logout,
  };
}
