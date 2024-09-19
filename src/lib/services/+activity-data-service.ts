// $lib/services/+activity-data-service.ts
import { BaseService } from '$lib/services/+base-service';

class ActivityDataService extends BaseService {
    constructor() {
        super('activity-data'); // Assuming 'keywords' is the name of your collection
    }

    // You can add any additional methods specific to the keywords collection if needed.
}

export const activityDataService = new ActivityDataService();
