import { axiosInstance } from "./axios";

export async function uploadImage(body: FormData): Promise<string[]> {
  const { data } = await axiosInstance.post("/images", body, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return data;
}
