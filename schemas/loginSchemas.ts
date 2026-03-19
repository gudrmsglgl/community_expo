import { z } from "zod";
import { EmailSchema, PasswordSchema } from "./authFields";

export const loginSchema = z.object({
  email: EmailSchema,
  password: PasswordSchema,
});

export type LoginSchema = z.infer<typeof loginSchema>;
