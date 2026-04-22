import { clearAuthorizationHeader } from "@/utils/header";
import { deleteAccessToken, getAccessToken } from "@/utils/secureStore";
import axios from "axios";
import { router } from "expo-router";
import { Platform } from "react-native";

// 실제 기기: PC와 같은 Wi‑Fi, PC의 LAN IP + API 서버 포트(로컬과 동일하게 3030)
// 8081은 Metro(Expo)용이지 API 주소가 아님
const WIFI_URL = "http://172.30.1.90:3030";
export const BASE_URL =
  Platform.OS === "android" ? WIFI_URL : "http://localhost:3030";
// 에뮬레이터만 쓸 때: "http://10.0.2.2:3030"

export const axiosInstance = axios.create({
  baseURL: BASE_URL,
});

axiosInstance.interceptors.request.use(async (config) => {
  const currentAuth = axiosInstance.defaults.headers.common["Authorization"] as
    | string
    | undefined;

  if (!currentAuth) {
    const accessToken = await getAccessToken();
    if (accessToken) {
      axiosInstance.defaults.headers.common["Authorization"] =
        `Bearer ${accessToken}`;
    }
  }

  return config;
});

let isHandling401 = false;
axiosInstance.interceptors.response.use(
  (res) => res,
  async (err) => {
    if (err?.response?.status === 401) {
      const url = err?.config?.url;

      if (typeof url === "string" && url.includes("/auth/me")) {
        await deleteAccessToken();
        clearAuthorizationHeader();
        return Promise.reject(err);
      }

      await deleteAccessToken();
      clearAuthorizationHeader();

      router.push("/auth/login");
    }
    return Promise.reject(err);
  },
);
