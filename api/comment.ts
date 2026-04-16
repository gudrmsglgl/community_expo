import { CreateCommentDto } from "@/types";
import { axiosInstance } from "./axios";

export async function createComment(body: CreateCommentDto) {
  const { data } = await axiosInstance.post("/comments", body);
  return data;
}

export async function deleteComment(id: number) {
  const { data } = await axiosInstance.delete(`/comments/${id}`);
  return data;
}
