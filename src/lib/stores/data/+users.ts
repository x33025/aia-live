import { writable, derived } from 'svelte/store';
import type { User } from '$lib/types'; // Adjust the type path as necessary

export const current_user = writable<User>();
// Writable store for users
export const users = writable<User[]>([]);

export const sortedUsers = derived(users, $users => 
  $users.slice().sort((a, b) => {
    const dateA = a.last_active ? new Date(a.last_active).getTime() : 0;
    const dateB = b.last_active ? new Date(b.last_active).getTime() : 0;
    return dateB - dateA;
  })
);

const ACTIVE_TIME = 10 * 60 * 1000; // 10 minutes in milliseconds


export const activeUsers = derived(users, $users => 
  $users.filter(user => {
    if (!user.last_active) {
      return false; // Skip users with null last_active
    }
    const isActive = Date.now() - new Date(user.last_active).getTime() < ACTIVE_TIME;
    return isActive;
  })
);

// Derived store for users with role "Writer"
export const writers = derived(users, $users => 
  $users.filter(user => user.expand?.role?.some(role => role.name === "Writer"))
);