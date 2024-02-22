import { z } from "zod";

export const loginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(5, "Password must be at least 5 characters."),
  });
  
export type TLoginSchema = z.infer<typeof loginSchema>;