// $lib/services/+category-service.ts
import { BaseService } from '$lib/services/+base-service';
import type { Website } from '$lib/types';

class WebsiteService extends BaseService<Website> {
    constructor() {
        super('websites'); // Assuming 'keywords' is the name of your collection
    }

    // You can add any additional methods specific to the keywords collection if needed.
}

export const websiteService = new WebsiteService();
