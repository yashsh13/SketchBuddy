import { z } from "zod";

export const signUpSchema = z.object({
    email: z.email(),
    password: z.string().min(3).max(20),
    username: z.string().min(3).max(20)
})

export const logInSchema = z.object({
    email: z.email(),
    password: z.string().min(3).max(20)
})
