// $lib/services/+keyword-service.ts
import { BaseService } from '$lib/services/+base-service';
import { activityDataService } from '$lib/services/+activity-data-service';
import type { Keyword } from '$lib/types';

class KeywordService extends BaseService<Keyword> {
    constructor() {
        super('keywords'); // Assuming 'keywords' is the name of your collection
    }
    async createWithActivity(user_id: string, data: Partial<Keyword>): Promise<Keyword> {
        try {
            console.log(`Starting createWithActivity with user_id: ${user_id}`);
            
            // Create the activity
            const activity = await activityDataService.create({ created_by: user_id });
            console.log(`Activity created with ID: ${activity.id}`);

            // Add the activity ID to the data
            const newKeyword = await this.create({ activity: activity.id, ...data });
            console.log(`New keyword created with ID: ${newKeyword.id}`);
     
            return newKeyword;
        } catch (error) {
            console.error(`Error creating keyword with activity in keywords collection:`, error);
            throw error;
        }
    }

}

export const keywordService = new KeywordService();
