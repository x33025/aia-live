import PocketBase from 'pocketbase';


// Initialize the PocketBase client
export const pb = new PocketBase(import.meta.env.POCKETBASE_URL);

// Optional: Persist authentication in cookies for client-side
if (typeof window !== 'undefined') {
    pb.authStore.loadFromCookie(document.cookie);

    pb.authStore.onChange(() => {
        // Export the auth store to a cookie whenever it changes
        document.cookie = pb.authStore.exportToCookie({ httpOnly: false });
    });
}
