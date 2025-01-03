import User from "@/models/user";
import { connectToDB } from "@/utils/database";

export const POST = async (request) => {
    try {
        // Parse request body
        const { userId, username, refCode } = await request.json();

        // Connect to the database
        await connectToDB();

        // Check if the user already exists using userId
        let user = await User.findOne({ userId });

        if (user) {
            // If user exists, return the user
            return new Response(JSON.stringify(user), { status: 200 });
        }else {
            
            user = await User.create({
                userId,
                username,
                refCode,
                point: 30000,
                lastPointsUpdatedTime: Date.now(),
                energy: 1000,
                lastEnergyUpdatedTime: Date.now(),
                farming: 0,
                status: "start",
                farmingTimeLeft: 28800,
                lastFarmingTime: Date.now() ,
                timestamp: Date.now(),
                availableTurbo: 3,
                availableEnergyRefill: 3,
                multitapLevel: 1,
                energyLimitLevel: 1,
                rechargingSpeedLevel:1,
                tapValue: 1,
                energyLimit: 1000,
                energyIncrease: 1,
                gameLevel: 'Circle',
                exchange: '',
                xStatus: '',
                xTimeLeft: 300,
                xLastTimeUpdate: Date.now(),
                teStatus: '',
                teTimeLeft: 300,
                teLastTimeUpdate: Date.now(),
                yoStatus: '',
                yoTimeLeft: 300,
                yoLastTimeUpdate: Date.now(),
                tikStatus: '',
                tikTimeLeft: 300,
                tikLastTimeUpdate: Date.now(),
                inStatus: '',
                inTimeLeft: 300,
                inLastTimeUpdate: Date.now(),
                faStatus: '',
                faTimeLeft: 300,
                faLastTimeUpdate: Date.now(),
                dailyStatus: '',
                socialTaskLeft: 6,
                dailyTaskLeft: 1,
                 
            });
    
            // Check if the referral code matches any user in the database
            const referrer = await User.findOne({ userId: refCode});
    
            if (referrer) {
                // If referrer exists, save the new user to the referrer's referrals
                referrer.referals.push({
                    userid: userId,
                    username: username,
                    point: 30000,   
                });
                referrer.point += 50000
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
