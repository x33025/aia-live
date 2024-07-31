import { supabase } from '$lib/config/supabase';
import { setupPresenceChannel } from '$lib/stores/presence';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ locals }) => {
  const { data: { user }, error } = await supabase.auth.getUser();

  if (error) {
    console.error('Error fetching user:', error.message);
  }

  // Setup presence channel
  const channel = setupPresenceChannel('room1');

  return {
    user,
    presenceChannel: channel
  };
};
