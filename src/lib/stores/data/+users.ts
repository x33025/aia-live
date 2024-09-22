import { writable, derived } from 'svelte/store';
import type { User } from '$lib/types'; // Adjust the type path as necessary

export const current_user = writable<User>();
// Writable store for users
export const users = writable<User[]>([]);

// Derived store for users with role "Writer"
export const writers = derived(users, $users => 
  $users.filter(user => user.expand?.role?.some(role => role.name === "Writer"))
);