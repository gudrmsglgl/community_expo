import { CreatePostDto } from ".";

export type ApiErrorResponse = {
  message?: string | string[];
  statusCode?: number;
  error?: string;
};

export type RequestUpdatePost = {
  id: number;
  body: CreatePostDto;
};
