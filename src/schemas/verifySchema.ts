import {z} from "zod";

export const verifySchema = z.object({
    identifier: z.string().length(6, 'Verification code must be 6 digits'),
    password: z.string(),
    username: z.string()
})