import User from "@/models/user";
import { connectToDB } from "@/utils/database";

export const POST = async (request) => {
    try {
        // Connect to the database
        await connectToDB();

        // Update availableTurbo to 5 for all users
        await User.updateMany({}, { availableTurbo: 3, availableEnergyRefill: 3});

        return new Response("Turbo updated for all users", { status: 200 });

    } catch (error) {
        return new Response("Failed to update users", { status: 500 });
    }
};
