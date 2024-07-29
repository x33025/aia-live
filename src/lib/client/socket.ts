import { io, type Socket } from 'socket.io-client';

let socket: Socket | undefined;

export function initializeSocket(userId: string): Socket {
  if (!socket) {
    socket = io('http://localhost:3000', {
      query: {
        user_id: userId // Ensure userId is available
      }
    });
  }
  return socket;
}
