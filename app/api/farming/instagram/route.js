import User from "@/models/user";
import { connectToDB } from "@/utils/database";


export const POST = async (request) => {
    const data = await request.json();
    const userId = data.userId
    const inTimeLeft = data.inTimeLeft
    const inLastTimeUpdate = data.inLastTimeUpdate
    const inStatus =  data.inStatus
    const socialTaskLeft = data.socialTaskLeft

    try {
        await connectToDB();
        const existingUser = await User.findOne({ userId });
        if(!existingUser) {
            return new Response("User not found", {status:404});
        }else{

            existingUser.inTimeLeft = inTimeLeft
            existingUser.inLastTimeUpdate = inLastTimeUpdate
            existingUser.inStatus = inStatus
            existingUser.socialTaskLeft = socialTaskLeft

            await existingUser.save();

            return new Response(true, {status:200})

        }

    } catch (error) {
        return new Response("Failed to update the user", {status:500});
           
    }
};