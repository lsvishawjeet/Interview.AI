import { Post } from "@/model/User";

export interface ApiResponse{
    success: boolean;
    message: string;
    isAcceptingVotes?:boolean;
    posts? : Array<Post>
}