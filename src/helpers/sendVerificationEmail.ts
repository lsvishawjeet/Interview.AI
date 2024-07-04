import { resend } from "@/lib/resend";

import  EmailTemplate  from "../../emails/VerificationEmail";

import { ApiResponse } from "@/types/ApiResponse";

export async function sendVerificationEmail(
    email: string,
    username: string,
    verifyCode: string,
): Promise<ApiResponse>{
    try {
        const { data, error } = await resend.emails.send({
            from: 'intervueai@vsidhu.com',
            to: email,
            subject: 'Welcome to IntervueAi',
            react: EmailTemplate({ userName: username, otp: verifyCode }),
          });
        
        return {success: true, message: "Verification email send successfully"}
    } catch (error) {
        console.log("Error sending verification email", error)
        return {success: false, message: "failed to send mail"}
    }
}

