// src/lib/pocketbase.ts
import PocketBase from 'pocketbase';

// Initialize the PocketBase client with the server URL
export const pb = new PocketBase('http://127.0.0.1:8090'); // Replace with your PocketBase server URL

// Optional: Persist authentication in cookies
if (typeof window !== 'undefined') {
    pb.authStore.loadFromCookie(document.cookie);
    pb.authStore.onChange(() => {
        document.cookie = pb.authStore.exportToCookie({ httpOnly: false });
    });
}
