import { ImageUri } from "@/types";
import { z } from "zod";

export const writePostSchema = z.object({
  title: z.string().min(1, "제목을 입력해주세요."),
  description: z.string().min(1, "내용을 입력해주세요."),
  imageUris: z.instanceof(Array<ImageUri>),
});

export type WritePostSchema = z.infer<typeof writePostSchema>;
