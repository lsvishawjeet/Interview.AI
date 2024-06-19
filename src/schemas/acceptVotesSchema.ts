import {z} from "zod";

export const acceptVotesSchema = z.object({
    acceptMessages: z.boolean()
})