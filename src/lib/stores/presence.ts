// $lib/stores/presence.ts
import { writable } from 'svelte/store';
import { supabase } from '$lib/config/supabase';
import type { RealtimePresenceState } from '@supabase/supabase-js';

interface Presence {
  id: string;
  online_at: string;
}

export const presences = writable<Presence[]>([]);

export const setupPresenceChannel = (room: string) => {
  const channel = supabase.channel(room);

  channel.on('presence', { event: 'join' }, ({ newPresences }: { newPresences: Presence[] }) => {
    presences.update(current => [...current, ...newPresences]);
    console.log('Newly joined presences: ', newPresences);
  });

  channel.on('presence', { event: 'leave' }, ({ leftPresences }: { leftPresences: Presence[] }) => {
    presences.update(current => current.filter(p => !leftPresences.find(lp => lp.id === p.id)));
    console.log('Newly left presences: ', leftPresences);
  });

  channel.on('presence', { event: 'sync' }, () => {
    const state: RealtimePresenceState<Presence> = channel.presenceState();
    const presenceArray: Presence[] = Object.values(state).flat();
    presences.set(presenceArray);
    console.log('Synced presence state: ', presenceArray);
  });

  channel.subscribe(async (status) => {
    if (status === 'SUBSCRIBED') {
      await channel.track({ id: `user-${Math.random()}`, online_at: new Date().toISOString() });
    }
  });

  return channel;
};
