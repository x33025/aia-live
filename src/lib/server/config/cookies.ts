//src/lib/server/config/cookies.ts
import type { Cookies } from '@sveltejs/kit';
import jsonwebtoken from 'jsonwebtoken';
import { randomUUID } from 'crypto';
import { dev } from '$app/environment';
import { JWT_SECRET } from '$env/static/private';

export const setAuthenticationCookies = (cookies: Cookies, uuid: string) => {
    const token = jsonwebtoken.sign({ uuid }, JWT_SECRET, { expiresIn: '15m' });
    const refreshToken = randomUUID();

    console.log('Setting cookies:', { token, refreshToken });

    cookies.set('sveltekit_auth_app', token, {
        path: '/',
        httpOnly: true,
        sameSite: 'strict',
        secure: !dev,
        maxAge: 60 * 60 * 24 * 30 // 30 days
    });

    cookies.set('sveltekit_auth_app_refresh_token', refreshToken, {
        path: '/',
        httpOnly: true,
        sameSite: 'strict',
        secure: !dev,
        maxAge: 60 * 60 * 24 * 30 // 30 days
    });

    console.log('Cookies set successfully');
};
