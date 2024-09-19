// $lib/services/+keyword-service.ts
import { BaseService } from '$lib/services/+base-service';
import { activityDataService } from '$lib/services/+activity-data-service';

class KeywordService extends BaseService {
    constructor() {
        super('keywords'); // Assuming 'keywords' is the name of your collection
    }

    // Override the create method to create an activity record before the keyword
    async createKeywordWithActivity({
        userId,
        keywordData,
        additionalActivityData = {}
    }: {
        userId: string;
        keywordData: any;
        additionalActivityData?: any;
    }) {
        // Create the activity record before creating the keyword
        const activity = await activityDataService.create({
            user_id: userId,
            ...additionalActivityData
        });

        // Now create the keyword
        const keyword = await this.create(keywordData);

        // Optionally, you can update the activity with the newly created keyword ID
        await activityDataService.update(activity.id, {
            entity_id: keyword.id
        });

        return keyword;
    }
}

export const keywordService = new KeywordService();
