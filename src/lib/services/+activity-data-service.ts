// $lib/services/+activity-data-service.ts
import { BaseService } from '$lib/services/+base-service';
import type { ActivityData } from '$lib/types';

class ActivityDataService extends BaseService<ActivityData> {
    constructor() {
        super('activity_data');
    }

  
}

export const activityDataService = new ActivityDataService();
