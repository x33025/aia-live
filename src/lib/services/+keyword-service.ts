// $lib/services/+keyword-service.ts
import { BaseService } from '$lib/services/+base-service';

class KeywordService extends BaseService {
    constructor() {
        super('keywords'); // Assuming 'keywords' is the name of your collection
    }

    // You can add any additional methods specific to the keywords collection if needed.
}

export const keywordService = new KeywordService();
