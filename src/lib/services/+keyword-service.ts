// $lib/services/+keyword-service.ts
import { BaseService } from '$lib/services/+base-service';
import { activityDataService } from '$lib/services/+activity-data-service';
import type { Keyword } from '$lib/types';

class KeywordService extends BaseService<Keyword> {
    constructor() {
        super('keywords'); // Assuming 'keywords' is the name of your collection
    }


}

export const keywordService = new KeywordService();
