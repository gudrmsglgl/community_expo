import axios from "axios";
import { Platform } from "react-native";

const BASE_URL =
  Platform.OS === "android" ? "http://10.0.2.2:3030" : "http://localhost:3030";

export const axiosInstance = axios.create({
  baseURL: BASE_URL,
});
