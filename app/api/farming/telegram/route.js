import User from "@/models/user";
import { connectToDB } from "@/utils/database";


export const POST = async (request) => {
    const data = await request.json();
    const userId = data.userId
    const teTimeLeft = data.teTimeLeft
    const teLastTimeUpdate = data.teLastTimeUpdate
    const teStatus =  data.teStatus

    try {
        await connectToDB();
        const existingUser = await User.findOne({ userId });
        if(!existingUser) {
            return new Response("User not found", {status:404});
        }else{

            existingUser.teTimeLeft = teTimeLeft
            existingUser.teLastTimeUpdate = teLastTimeUpdate
            existingUser.teStatus = teStatus

            await existingUser.save();

            return new Response(true, {status:200})

        }

    } catch (error) {
        return new Response("Failed to update the user", {status:500});
           
    }
};