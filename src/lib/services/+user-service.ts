// $lib/services/+user-service.ts
import { BaseService } from '$lib/services/+base-service';
import type { User } from '$lib/types';

class UserService extends BaseService<User> {
    constructor() {
        super('users');
    }


}

export const userService = new UserService();
