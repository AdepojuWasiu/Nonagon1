import User from "@/models/user";
import { connectToDB } from "@/utils/database";

export const GET = async () => {
    try {
        // Connect to the database
        await connectToDB();

        // Update availableTurbo to 5 for all users
        await User.updateMany({}, { availableTurbo: 5, availableEnergyRefill: 5});

        return new Response("Turbo updated for all users", { status: 200 });

    } catch (error) {
        return new Response("Failed to update users", { status: 500 });
    }
};
