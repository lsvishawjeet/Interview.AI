import {z} from "zod";

export const UsernameValidation = z
    .string()
    .min(2, "Username must be of 2 characters")
    .max(20, "No more than 20 characters")
    .regex(/^[a-z0-9_\.]+$/,"Username must not contain special characters")

export const signUpSchema = z.object({
    username : UsernameValidation,
    email: z.string().email({message: "invalid email address"}),
    password: z.string().min(6, "Password must be at least 6 characters")
})