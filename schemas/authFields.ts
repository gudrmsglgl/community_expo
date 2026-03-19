import { z } from "zod";

export const EmailSchema = z
  .email("올바른 이메일 형식을 입력해주세요.")
  .min(1, "이메일을 입력해주세요.");

export const PasswordSchema = z
  .string()
  .min(8, "비밀번호는 8자 이상 입력해주세요.");
