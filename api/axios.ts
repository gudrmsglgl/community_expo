import queryClient from "@/api/queryClient";
import { queryKey } from "@/constants/queryKey";
import { deleteAccessToken, getAccessToken } from "@/utils/secureStore";
import axios from "axios";
import { Platform } from "react-native";

// 실제 기기: PC와 같은 Wi‑Fi, PC의 LAN IP + API 서버 포트(로컬과 동일하게 3030)
// 8081은 Metro(Expo)용이지 API 주소가 아님
const WIFI_URL = "http://172.30.1.16:3030";
const ANDROID_AMULATOR_URL = "http://10.0.2.2:3030";
export const BASE_URL =
  Platform.OS === "android" ? WIFI_URL : "http://localhost:3030";

export const axiosInstance = axios.create({
  baseURL: BASE_URL,
});

axiosInstance.interceptors.request.use(async (config) => {
  const currentAuth = axiosInstance.defaults.headers.common["Authorization"] as
    | string
    | undefined;

  let bearer = currentAuth;

  if (!bearer) {
    const accessToken = await getAccessToken();
    if (accessToken) {
      bearer = `Bearer ${accessToken}`;
      axiosInstance.defaults.headers.common["Authorization"] = bearer;
    }
  }

  if (bearer) {
    config.headers.set("Authorization", bearer);
  }

  return config;
});

axiosInstance.interceptors.response.use(
  (res) => res,
  async (err) => {
    if (err?.response?.status === 401) {
      await deleteAccessToken();
      delete axiosInstance.defaults.headers.common["Authorization"];
      queryClient.setQueryData([queryKey.AUTH, queryKey.GET_ME], null);
    }
    return Promise.reject(err);
  },
);
