import { CreatePostDto, Post } from "@/types";
import { axiosInstance } from "./axios";

export async function createPost(body: CreatePostDto) {
  const { data } = await axiosInstance.post("/posts", body);
  return data;
}

export async function getPosts(page = 1): Promise<Post[]> {
  const { data } = await axiosInstance.get(`/posts?page=${page}`);
  return data;
}

export async function deletePost(id: string) {
  const { data } = await axiosInstance.delete(`/posts/${id}`);
  return data;
}
