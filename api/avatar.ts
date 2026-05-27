import { axiosInstance } from "./axios";

export async function getHats(): Promise<string[]> {
  const { data } = await axiosInstance.get("/avatar/hats");
  return data;
}

export async function getFaces(): Promise<string[]> {
  const { data } = await axiosInstance.get("/avatar/faces");
  return data;
}

export async function getTops(): Promise<string[]> {
  const { data } = await axiosInstance.get("/avatar/tops");
  return data;
}

export async function getBottoms(): Promise<string[]> {
  const { data } = await axiosInstance.get("/avatar/bottoms");
  return data;
}

export async function getHands(): Promise<string[]> {
  const { data } = await axiosInstance.get("/avatar/hands");
  return data;
}

export async function getSkins(): Promise<string[]> {
  const { data } = await axiosInstance.get("/avatar/skins");
  return data;
}
