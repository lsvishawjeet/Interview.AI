import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";

export async function POST(request:Request) {
    await dbConnect()

    try {
        // const {username} = await request.json()
        // const userData = await UserModel.findOne{
        //     username,

        // }
    } catch (error) {
        
    }
}