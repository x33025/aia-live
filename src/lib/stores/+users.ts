import { writable, derived } from 'svelte/store';
import type { User } from '$lib/types'; // Adjust the type path as necessary

// Writable store for users
export const users = writable<User[]>([]);

// Derived store for users with role "Writer"
export const writers = derived(users, $users => 
  $users.filter(user => user.expand?.role?.name === "Writer")
);