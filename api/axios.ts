import axios from "axios";
import { Platform } from "react-native";

// 실제 기기: PC와 같은 Wi‑Fi, PC의 LAN IP + API 서버 포트(로컬과 동일하게 3030)
// 8081은 Metro(Expo)용이지 API 주소가 아님
const WIFI_URL = "http://172.30.1.90:3030";
const BASE_URL = Platform.OS === "android" ? WIFI_URL : "http://localhost:3030";
// 에뮬레이터만 쓸 때: "http://10.0.2.2:3030"

export const axiosInstance = axios.create({
  baseURL: BASE_URL,
});
