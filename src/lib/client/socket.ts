// src/lib/socket.ts
import { io, type Socket } from 'socket.io-client';

let socket: Socket | undefined;

export function initializeSocket(userId: string): Socket {
  if (!socket) {
    const websocketUrl = window.location.origin.includes('localhost') 
      ? 'http://localhost:3000' 
      : window.location.origin.replace(/^http/, 'ws');
    
    socket = io(websocketUrl, {
      query: {
        user_id: userId // Ensure userId is available
      }
    });
  }
  return socket;
}
