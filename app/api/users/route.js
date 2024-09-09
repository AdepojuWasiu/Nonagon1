import User from "@/models/user";
import { connectToDB } from "@/utils/database";

export const POST = async (request) => {
    try {
        // Parse request body
        const { userId, username, refCode } = await request.json();

        // Connect to the database
        await connectToDB();

        // Check if the user already exists using userId
        const user = await User.findOne({ userId });

        if (user) {
            // If user exists, return the user
            return new Response(JSON.stringify(user), { status: 200 });
        }else {
            
            user = await User.create({
                userId,
                username,
                refCode
            });
    
            // Check if the referral code matches any user in the database
            const referrer = await User.findOne({ userId: refCode});
    
            if (referrer) {
                // If referrer exists, save the new user to the referrer's referrals
                referrer.referals.push({
                    userid: userId,
                    username: username,
                });
                await referrer.save();
            }
    
            // Return the newly created user
            return new Response(JSON.stringify(user), { status: 200 });
        }
        
  
    } catch (error) {
        console.error(error);
        return new Response("Failed to fetch user", { status: 500 });
    }
};
