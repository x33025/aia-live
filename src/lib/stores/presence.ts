// // $lib/stores/presence.ts
// import { writable } from 'svelte/store';
// import { supabase } from '$lib/config/supabase';
// import type { RealtimePresenceState } from '@supabase/supabase-js';

// export const presences = writable<any[]>([]);

// export const setupPresenceChannel = (room: string, user: { id: string; name: string }) => {
//   const channel = supabase.channel(room, {
//     config: {
//       presence: {
//         key: user.id,
//       },
//     },
//   });

//   channel.on('presence', { event: 'sync' }, () => {
//     const state = channel.presenceState() as RealtimePresenceState;
//     const presenceArray = Object.values(state).flat();
//     presences.set(presenceArray);
//     console.log('Synced presence state:', presenceArray);
//   });

//   channel.on('presence', { event: 'join' }, ({ newPresences }) => {
//     presences.update(current => [...current, ...newPresences]);
//     console.log('Newly joined presences:', newPresences);
//   });

//   channel.on('presence', { event: 'leave' }, ({ leftPresences }) => {
//     presences.update(current => current.filter(p => !leftPresences.find(lp => lp.id === p.id)));
//     console.log('Newly left presences:', leftPresences);
//   });

//   channel.subscribe(async (status) => {
//     console.log('Subscription status:', status);
//     if (status === 'SUBSCRIBED') {
//       const presenceTrackStatus = await channel.track({ id: user.id, name: user.name, online_at: new Date().toISOString() });
//       console.log('Presence track status:', presenceTrackStatus);
//     }
//   });

//   return channel;
// };
