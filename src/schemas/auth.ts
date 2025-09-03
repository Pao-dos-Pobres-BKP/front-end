import { z } from "zod";

export const loginSchema = z.object({
  email: z
    .string()
    .nonempty({ message: "O email é obrigatório" })
    .email({ message: "Formato de email inválido" }),
  password: z
    .string()
    .nonempty({ message: "A senha é obrigatória" })
    .min(6, { message: "A senha deve ter ao menos 6 caracteres" }),
});

export type LoginInput = z.infer<typeof loginSchema>;
