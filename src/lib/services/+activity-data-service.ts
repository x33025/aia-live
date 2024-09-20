// $lib/services/+activity-data-service.ts
import { BaseService } from '$lib/services/+base-service';
import type { ActivityData } from '$lib/types';

class ActivityDataService extends BaseService<ActivityData> {
    constructor() {
        super('activity_data');
    }

    // You can add any additional methods specific to the keywords collection if needed.
}

export const activityDataService = new ActivityDataService();
