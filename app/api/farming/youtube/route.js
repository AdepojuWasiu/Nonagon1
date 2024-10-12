import User from "@/models/user";
import { connectToDB } from "@/utils/database";


export const POST = async (request) => {
    const data = await request.json();
    const userId = data.userId
    const yoTimeLeft = data.yoTimeLeft
    const yoLastTimeUpdate = data.yoLastTimeUpdate
    const yoStatus =  data.yoStatus

    try {
        await connectToDB();
        const existingUser = await User.findOne({ userId });
        if(!existingUser) {
            return new Response("User not found", {status:404});
        }else{

            existingUser.yoTimeLeft = yoTimeLeft
            existingUser.yoLastTimeUpdate = yoLastTimeUpdate
            existingUser.yoStatus = yoStatus

            await existingUser.save();

            return new Response(true, {status:200})

        }

    } catch (error) {
        return new Response("Failed to update the user", {status:500});
           
    }
};