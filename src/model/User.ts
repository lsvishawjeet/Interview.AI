import mongoose, {Schema, Document} from "mongoose";
import { Interface } from "readline";

export interface Post extends Document{
    templateType: string,
    acceptVotes: boolean,
    content: string;
    createdAt : Date;
    votesA : Number;
    votesB : Number; 
    comment: string;
}

const PostSchema:Schema<Post> = new Schema({
    templateType:{
        type: String
    },
    acceptVotes:{
        type: Boolean,
        required: [true, "Are you accepting votes or not"]
    },
    content: {
        type: String,
        required: true
    },
    createdAt:{
        type: Date,
        required: true,
        default: Date.now()
    },
    votesA:{
        type: Number,
        required: true,
        default: 0
    },
    votesB:{
        type: Number,
        required: true,
        default: 0
    },
    comment:{
        type: String
    }
})

export interface User extends Document{
    username: string;
    email:string;
    password: string;
    verifyCode: string;
    isVerified: boolean;
    verifyCodeExpiry: Date;
    isAcceptMessage: boolean;
    post: Post[];
}

const UserSchema:Schema<User> = new Schema({
    username: {
        type: String,
        required: [true, "Username is required"],
        unique: true,
        trim: true
    },
    email:{
        type: String,
        required: [true, "Email is required"],
        unique: true,
        match: [/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,'please use valid email']
    },
    password:{
        type: String,
        required: [true, "Password is required"]
    },
    verifyCode: {
        type: String,
        required: [true, "Verify Code is required"],
    },
    verifyCodeExpiry:{
        type: Date,
        required: [true, "Verify Code expiry is required"],
    },
    isVerified:{
        type: Boolean,
        default: false
    },
    isAcceptMessage: {
        type: Boolean,
        required: [true, "Verify Code is required"],
    },
    post: [PostSchema]
})

const UserModel = (mongoose.models.User as mongoose.Model<User>) || mongoose.model<User>("User", UserSchema)

export default UserModel