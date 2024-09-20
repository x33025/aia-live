// $lib/services/+category-service.ts
import { BaseService } from '$lib/services/+base-service';
import type { Country } from '$lib/types';

class CountryService extends BaseService<Country> {
    constructor() {
        super('countries'); // Assuming 'keywords' is the name of your collection
    }

    // You can add any additional methods specific to the keywords collection if needed.
}

export const countryService = new CountryService();
