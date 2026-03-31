import { getMe, postLogin, postSignup } from "@/api/auth";
import queryClient from "@/api/queryClient";
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
import { router } from "expo-router";
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
  return useMutation({
    mutationFn: postLogin,
    onSuccess: async ({ accessToken }) => {
      setAuthorizationHeader(accessToken);
      await saveAccessToken(accessToken);
      queryClient.fetchQuery({
        queryKey: ["auth", "getMe"],
      });
      router.replace("/");
    },
  });
}

function useGetMe() {
  const { data, isSuccess, isError } = useQuery({
    queryFn: getMe,
    queryKey: ["auth", "getMe"],
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
    queryClient.resetQueries({ queryKey: ["auth"] });
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
