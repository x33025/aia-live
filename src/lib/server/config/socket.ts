import { Server } from 'socket.io';
import { createServer } from 'http';
import type { User } from '@prisma/client';
import { prisma } from '$lib/server/config/prisma';

let io: Server;
let activeUsers: Map<string, User> = new Map();

export function initializeSocketServer() {
  const httpServer = createServer();

  io = new Server(httpServer, {
    cors: {
      origin: "http://localhost:5173", // Your SvelteKit app's URL
      methods: ["GET", "POST"]
    }
  });

  io.on('connection', async (socket) => {
    const userId = socket.handshake.query.user_id as string;

    // Fetch user information from the database
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (user) {
      activeUsers.set(userId, user);
      console.log(`User ${userId} connected`);

      io.emit('active-users', Array.from(activeUsers.values()));

      socket.on('disconnect', () => {
        activeUsers.delete(userId);
        console.log(`User ${userId} disconnected`);

        io.emit('active-users', Array.from(activeUsers.values()));
      });
    }
  });

  // Listen on the same port as the SvelteKit server
  httpServer.listen(3000, () => {
    console.log('Socket.IO server running on http://localhost:3000');
  });
}

export { io, activeUsers };
