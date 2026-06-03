import type { Profile } from "@/types";
import { getAccessToken } from "@/utils/secureStore";
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

async function postLogin(
  body: RequestBody & { expoPushToken: string },
): Promise<{ accessToken: string }> {
  const { data } = await axiosInstance.post("/auth/signin", body);
  return data;
}

async function getMe(): Promise<Profile | null> {
  const accessToken = await getAccessToken();

  if (!accessToken) {
    return null;
  }

  const { data } = await axiosInstance.get("/auth/me", {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return data;
}

async function getUserProfile(id: number): Promise<Profile> {
  const { data } = await axiosInstance.get(`/auth/${id}`);
  return data;
}

async function editProfile(profile: Partial<Profile>): Promise<Profile> {
  const { data } = await axiosInstance.patch("/auth/me", profile);
  return data;
}

export { editProfile, getMe, getUserProfile, postLogin, postSignup };
