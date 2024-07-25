// src/lib/server/config/cookies.ts
import type { Cookies } from '@sveltejs/kit';
import jwt from 'jsonwebtoken';
import { env } from '$env/dynamic/private';

const JWT_SECRET = env.JWT_SECRET;

export const setAuthenticationCookies = (cookies: Cookies, userId: string) => {
  const token = jwt.sign({ userId }, JWT_SECRET, { expiresIn: '1h' });

  cookies.set('jwt', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 60 * 60, // 1 hour
    path: '/'
  });
};
