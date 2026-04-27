import { CreatePostDto, CreateVoteDto, Post, VoteOption } from "@/types";
import { RequestUpdatePost } from "@/types/api";
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

export async function getPost(id: number): Promise<Post> {
  const { data } = await axiosInstance.get(`/posts/${id}`);
  return data;
}

export async function updatePost({
  id,
  body,
}: RequestUpdatePost): Promise<number> {
  const { data } = await axiosInstance.patch(`/posts/${id}`, body);
  return data;
}

export async function createVote({
  postId,
  voteOptionId,
}: CreateVoteDto): Promise<{ postId: number; voteOption: VoteOption }> {
  const { data } = await axiosInstance.post(
    `/posts/${postId}/vote/${voteOptionId}`,
  );

  return data;
}
