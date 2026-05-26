import z from "zod";

const nickNameSchema = z.string().min(2, "닉네임은 2자이상 입력해주세요.");
const introduceSchema = z.string();

export const updateProfileSchema = z.object({
  nickname: nickNameSchema,
  introduce: introduceSchema,
});

export type UpdateProfileSchema = z.infer<typeof updateProfileSchema>;
