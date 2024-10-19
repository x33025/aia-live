// $lib/services/+keyword-service.ts
import { pb } from '$lib/config/pocketbase';
import type { ActivityData } from '$lib/types';
import type { Keyword } from '$lib/types';

class KeywordService  {

    async createWithActivity(user_id: string, data: Partial<Keyword>): Promise<Keyword> {
        try {
            console.log(`Starting createWithActivity with user_id: ${user_id}`);
            
            // Create the activity
            const activity = await pb.collection<ActivityData>('activities').create({ created_by: user_id });
            console.log(`Activity created with ID: ${activity.id}`);

            // Add the activity ID to the data
            const newKeyword = await pb.collection<Keyword>('keywords').create({ activity: activity.id, ...data });
            console.log(`New keyword created with ID: ${newKeyword.id}`);
     
            return newKeyword;
        } catch (error) {
            console.error(`Error creating keyword with activity in keywords collection:`, error);
            throw error;
        }
    }

}

export const keywordService = new KeywordService();
