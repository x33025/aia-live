// $lib/services/+category-service.ts
import { BaseService } from '$lib/services/+base-service';
import type { Status } from '$lib/types';

class StatusService extends BaseService<Status> {
    constructor() {
        super('statuses'); // Assuming 'keywords' is the name of your collection
    }

    // You can add any additional methods specific to the keywords collection if needed.
}

export const statusService = new StatusService();
