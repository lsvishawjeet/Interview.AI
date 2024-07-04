import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";

export async function POST(request:Request) {
    await dbConnect()

    try {
        const {username, newMessage} = await request.json()
        const user = await 
        UserModel.findOne({
            username,
            isVerified: true
        })
        if(user){
            user.post
        }
    } catch (error) {
        
    }
}