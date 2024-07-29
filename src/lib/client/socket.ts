import { io, type Socket } from 'socket.io-client';
import { env } from '$env/dynamic/public'; // Importing public env variables from SvelteKit

let socket: Socket | undefined;

export function initializeSocket(userId: string): Socket {
  if (!socket) {
    socket = io(env.PUBLIC_VERCEL_URL || 'http://localhost:3000', {
      query: {
        user_id: userId // Ensure userId is available
      }
    });
  }
  return socket;
}
