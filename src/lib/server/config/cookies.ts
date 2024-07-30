import type { Cookies } from '@sveltejs/kit';

export const setAuthenticationCookies = (cookies: Cookies, accessToken: string) => {
  console.log('Setting cookie with access token:', accessToken); // Log the access token

  cookies.set('supabase-auth-token', accessToken, {
    httpOnly: true,
    // Assuming your application will always run over HTTPS
    secure: true,
    maxAge: 60 * 60, // 1 hour
    path: '/'
  });

  // Log the cookie set operation
  console.log('Cookie set with access token:', cookies.get('supabase-auth-token'));
};
