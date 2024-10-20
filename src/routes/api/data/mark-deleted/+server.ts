// /route/api/data/mark-deleted/+server.ts
import { json } from '@sveltejs/kit';
import { pb } from '$lib/config/pocketbase';
import type { RequestHandler } from './$types';
import type { ActivityData } from '$lib/types';

export const PUT: RequestHandler = async ({ request }) => {
    try {
        const { activity_id, user_id } = await request.json();

        if (!activity_id || !user_id) {
            return json({ error: 'Activity ID and user ID are required.' }, { status: 400 });
        }


        // Prepare the data to update the activity
        const updatedData = {
            deleted_by: user_id, 
            deleted: new Date() 
        };

        // Perform the update using ActivityDataService
        const updatedItem = await pb.collection<ActivityData>('activities').update(activity_id, updatedData);

        return json(updatedItem, { status: 200 });
    } catch (error) {
        console.error('Error marking record as deleted:', error);
        return json({ error: 'Error marking record as deleted.' }, { status: 500 });
    }
};
