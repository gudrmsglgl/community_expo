import z from "zod";

const nickNameSchema = z.string();
const introduceSchema = z.string();

export const updateProfileSchema = z.object({
  nickName: nickNameSchema,
  introduce: introduceSchema,
});

export type UpdateProfileSchema = z.infer<typeof updateProfileSchema>;
