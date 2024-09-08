// src/lib/api/activity.ts
import { pb } from "$lib/config/pocketbase";// PocketBase client instance
import type { ActivityData } from "$lib/types";
import type { User } from "$lib/types";

// Function to create activity data for the current user and return the ID
export async function createActivityData(currentUser: User): Promise<string> {
    const now = new Date();

    // Prepare the activity data object
    const activityData: Omit<ActivityData, 'id'> = {
        created: now,
        updated: now,
        deleted: null,
        deleted_by: null,
        created_by: currentUser.id,
        updated_by: currentUser.id,
    };

    try {
        // Store the activity data in PocketBase
        const response = await pb.collection('activity_data').create(activityData);

        // Return only the ID of the created activity data
        return response.id;
    } catch (error) {
        console.error("Error creating activity data:", error);
        throw new Error("Failed to create activity data");
    }
}