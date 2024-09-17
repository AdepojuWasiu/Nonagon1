import User from "@/models/user";
import { connectToDB } from "@/utils/database";


export const PATCH = async (request) => {
    const {userId, energyLimitLevel, energyLimit} = await request.json();

    try {
        await connectToDB();
        const existingUser = await User.findOne({ userId });
        if(!existingUser) {
            return new Response("User not found", {status:404});
            
        }else{

            existingUser.energyLimit = energyLimit;
            existingUser.energyLimitLevel = energyLimitLevel
            await existingUser.save();
            return new Response(true, {status:200})
        }

    } catch (error) {
        return new Response("Failed to update the user", {status:500});
           
    }
};