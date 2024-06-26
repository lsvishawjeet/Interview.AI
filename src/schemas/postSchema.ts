import {z} from "zod";

export const postSchema = z.object({
    content : z.string(),
    userid: z.string()
})

export const postCommentSchema = z.object({
    content: z
    .string()
    .min(2, {message: "comment must be of minimum 2 chacters"})
    .max(500, {message: "comment must be no longer than 500 characters"})
})