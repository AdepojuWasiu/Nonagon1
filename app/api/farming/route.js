import User from "@/models/user";
import { connectToDB } from "@/utils/database";


export const POST = async (request) => {
    const data = await request.json();
    const userId = data.userId
    const farmingTimeLeft = data.farmingTimeLeft
    const lastFarmingUpdatedTime = data.lastfarmingUpdatedTime

    try {
        await connectToDB();
        const existingUser = await User.findOne({ userId });
        if(!existingUser) {
            return new Response("User not found", {status:404});
        }else{

            existingUser.farmingTimeLeft = farmingTimeLeft;
            existingUser.lastFarmingUpdatedTime = lastFarmingUpdatedTime;

            await existingUser.save();

            return new Response(true, {status:200})

        }

    } catch (error) {
        return new Response("Failed to update the user", {status:500});
           
    }
};