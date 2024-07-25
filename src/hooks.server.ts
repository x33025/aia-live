// src/hooks.server.ts
import type { Handle } from '@sveltejs/kit';
import { prisma } from '$lib/server/config/prisma';
import jwt from 'jsonwebtoken';
import { env } from '$env/dynamic/private';

const JWT_SECRET = env.JWT_SECRET;

export const handle: Handle = async ({ event, resolve }) => {
  const token = event.cookies.get('jwt');

  if (token) {
    try {
      const decoded = jwt.verify(token, JWT_SECRET) as { userId: string };
      const user = await prisma.user.findUnique({
        where: { id: decoded.userId }
      });

      if (user) {
        event.locals.user = user;
      } else {
        event.locals.user = null;
      }
    } catch (err) {
      console.error('JWT verification error:', err);
      event.locals.user = null;
    }
  } else {
    event.locals.user = null;
  }

  return await resolve(event);
};
