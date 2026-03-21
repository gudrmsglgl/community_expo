import { getSecureAccessToken } from "@/utils/secureStore";
import { axiosInstance } from "./axios";

type RequestBody = {
  email: string;
  password: string;
};

async function postSignup(body: RequestBody): Promise<void> {
  const { data, status } = await axiosInstance.post("/auth/signup", body);
  console.log("signup data: ", data);
  console.log("signup status:", status);

  return data;
}

async function postLogin(body: RequestBody): Promise<{ accessToken: string }> {
  const { data } = await axiosInstance.post("/auth/signin", body);
  return data;
}

async function getMe() {
  const accessToken = await getSecureAccessToken();
  const { data } = await axiosInstance.get("/auth/me", {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return data;
}

export { getMe, postLogin, postSignup };
