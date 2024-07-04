import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import bcrypt from "bcryptjs"

import { sendVerificationEmail } from "@/helpers/sendVerificationEmail";

export async function POST(request: Request){
    await dbConnect()

    try {
        const {username, email, password} = await request.json()
        const existingVerifiedByUserName = await 
        UserModel.findOne({
            username,
            isVerified: true
        })

        if(existingVerifiedByUserName){
            return Response.json({
                success: false,
                message:"Username already taken"
            }, {status: 400})
        }

        const existingUserByEmail = await UserModel.findOne({email})
        const verifyCode = Math.floor(100000 + Math.random()*900000).toString()
        if (existingUserByEmail){
            if(existingUserByEmail.isVerified){
                return Response.json({
                    success: false,
                    message: "User already exist with this email"
                },{status: 500})
            } else{
                const hashedPassword = await bcrypt.hash(password, 10)
                existingUserByEmail.password = hashedPassword;
                existingUserByEmail.verifyCodeExpiry = new Date(Date.now()+3600000)
                await existingUserByEmail.save()
            }
        }
        else{
            const hashedPassword = await bcrypt.hash(password, 10);
            const expiryDate = new Date();
            expiryDate.setHours(expiryDate.getHours() + 1)

            const newUser = new UserModel({
                username: username,
                email : email,
                password: hashedPassword,
                verifyCode: verifyCode,
                // isVerified: false,
                isVerified: true,
                verifyCodeExpiry: expiryDate,
                isAcceptMessage: true,
                post: [],
            })

            await newUser.save()
        }

        //send verification email
        const emailResponse =  await sendVerificationEmail(
            email, username, verifyCode
        )
        if(!emailResponse.success){
            return Response.json({
                success: false,
                message: emailResponse.message
            },{status: 500})
        }
        return Response.json({
            success: true,
            // message: "User regitered successfully. Please verify your email"
            message: "User regitered successfully. Please login"
        },{status: 201})
    } catch (error) {
        console.log("Error registering user", error)
        return Response.json(
            {
                success: false,
                message: "Error registering user"
            },
            {
                status: 500
            }
        )
        
    }
}