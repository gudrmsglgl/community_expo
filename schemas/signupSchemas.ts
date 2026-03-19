import { z } from "zod";
import { EmailSchema, PasswordSchema } from "./authFields";

export const signupSchema = z
  .object({
    email: EmailSchema,
    password: PasswordSchema,
    passwordConfirm: z.string().min(1, "비밀번호 확인을 입력해주세요."),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    message: "비밀번호가 일치하지 않습니다.",
    path: ["passwordConfirm"],
  });

export type SignupSchema = z.infer<typeof signupSchema>;
