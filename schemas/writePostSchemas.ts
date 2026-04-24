import { ImageUri, VoteOption } from "@/types";
import { z } from "zod";

export const writePostSchema = z.object({
  title: z.string().min(1, "제목을 입력해주세요."),
  description: z.string().min(1, "내용을 입력해주세요."),
  imageUris: z.instanceof(Array<ImageUri>),
  isVoteAttached: z.boolean(),
  isVoteOpen: z.boolean(),
  voteOptions: z.instanceof(Array<VoteOption>),
});

export type WritePostSchema = z.infer<typeof writePostSchema>;
