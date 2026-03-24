import { axiosInstance } from "@/api/axios";

export function setAuthorizationHeader(accessToken: string) {
  axiosInstance.defaults.headers.common["Authorization"] =
    `Bearer ${accessToken}`;
}

export function clearAuthorizationHeader() {
  if (!axiosInstance.defaults.headers.common["Authorization"]) {
    return;
  }
  delete axiosInstance.defaults.headers.common["Authorization"];
}
