import { dev } from '$app/environment';
import { inject as injectAnalytics } from '@vercel/analytics';
import { injectSpeedInsights } from '@vercel/speed-insights/sveltekit';
import { createBrowserClient, createServerClient, isBrowser } from '@supabase/ssr';
import { PUBLIC_SUPABASE_ANON_KEY, PUBLIC_SUPABASE_URL } from '$env/static/public';
import type { LayoutLoad } from './$types';

injectAnalytics({ mode: dev ? 'development' : 'production' });
injectSpeedInsights();

const supabaseUrl = PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = PUBLIC_SUPABASE_ANON_KEY!;

export const load: LayoutLoad = async ({ data, depends, fetch }) => {
  depends('supabase:auth');

  const supabase = isBrowser()
    ? createBrowserClient(supabaseUrl, supabaseAnonKey, { global: { fetch } })
    : createServerClient(supabaseUrl, supabaseAnonKey, {
        global: { fetch },
        cookies: { getAll: () => data?.cookies ?? [] },
      });

  const { data: { session } = { session: null } } = await supabase.auth.getSession();
  const { data: { user } = { user: null } } = await supabase.auth.getUser();

  // You can fetch the title from an API or set it statically
  const title = undefined;

  return { session, supabase, user, title };
};