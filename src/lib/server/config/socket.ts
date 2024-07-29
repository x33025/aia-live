import { Server } from 'socket.io';
import { createServer } from 'http';
import type { User } from '@prisma/client';
import { prisma } from '$lib/server/config/prisma';
import { env } from '$env/dynamic/private'; // Importing env from SvelteKit

let io: Server;
let activeUsers: Map<string, User> = new Map();

export function initializeSocketServer() {
  const httpServer = createServer();

  io = new Server(httpServer, {
    cors: {
      origin: env.VERCEL_URL || "http://localhost:5173", // Use the Vercel URL in production
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
  const PORT = env.PORT || 3000;
  httpServer.listen(PORT, () => {
    console.log(`Socket.IO server running on http://localhost:${PORT}`);
  });
}

export { io, activeUsers };
