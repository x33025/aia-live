// src/hooks.server.ts
import { supabase } from '$lib/config/supabase';
import { type Handle, redirect } from '@sveltejs/kit';
import { sequence } from '@sveltejs/kit/hooks';


const supabaseHandle: Handle = async ({ event, resolve }) => {
  event.locals.supabase = supabase;

  event.locals.safeGetSession = async () => {
    const { data: { session } } = await event.locals.supabase.auth.getSession();
    if (!session) return { session: null, user: null };

    const { data: { user }, error } = await event.locals.supabase.auth.getUser();
    if (error) return { session: null, user: null };

    return { session, user };
  };

  return resolve(event, {
    filterSerializedResponseHeaders(name) {
      return name === 'content-range' || name === 'x-supabase-api-version';
    },
  });
};

const authGuard: Handle = async ({ event, resolve }) => {
  const { session, user } = await event.locals.safeGetSession();
  event.locals.session = session;
  event.locals.user = user;

  if (!event.locals.session && event.url.pathname.startsWith('/private')) {
    throw redirect(303, '/auth');
  }

  if (event.locals.session && event.url.pathname === '/auth') {
    throw redirect(303, '/private');
  }

  return resolve(event);
};

export const handle: Handle = sequence(supabaseHandle, authGuard);
