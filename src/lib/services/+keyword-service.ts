// $lib/services/+keyword-service.ts
import { BaseService } from '$lib/services/+base-service';
import { activityDataService } from '$lib/services/+activity-data-service';
import type { Keyword } from '$lib/types';

class KeywordService extends BaseService<Keyword> {
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


        return keyword;
    }
}

export const keywordService = new KeywordService();
