import User from "@/models/user";
import { connectToDB } from "@/utils/database";


export const POST = async (request) => {
    const data = await request.json();
    const userId = data.userId
    const tikTimeLeft = data.tikTimeLeft
    const tikLastTimeUpdate = data.tikLastTimeUpdate
    const tikStatus =  data.tikStatus
    const socialTaskLeft = data.socialTaskLeft

    try {
        await connectToDB();
        const existingUser = await User.findOne({ userId });
        if(!existingUser) {
            return new Response("User not found", {status:404});
        }else{

            existingUser.tikTimeLeft = tikTimeLeft
            existingUser.tikLastTimeUpdate = tikLastTimeUpdate
            existingUser.tikStatus = tikStatus
            existingUser.socialTaskLeft = socialTaskLeft

            await existingUser.save();

            return new Response(true, {status:200})

        }

    } catch (error) {
        return new Response("Failed to update the user", {status:500});
           
    }
};