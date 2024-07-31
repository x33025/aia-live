<script lang="ts">
  import { onMount } from 'svelte';
  import { presences, setupPresenceChannel } from '$lib/stores/presence';
  import { supabase } from '$lib/config/supabase';
  import type { User } from '@supabase/supabase-js';

  let user: User | null = null;

  onMount(() => {
    // Setup presence channel
    const channel = setupPresenceChannel('room1');

    const fetchUser = async () => {
      // Fetch the current user
      const { data: { user: currentUser }, error } = await supabase.auth.getUser();
      
      if (error) {
        console.error('Error fetching user:', error.message);
      } else {
        user = currentUser;
      }
    };

    // Call the async function to fetch the user
    fetchUser();

    // Cleanup on unmount
    return () => {
      channel.unsubscribe();
    };
  });
</script>

<a href="/protected/keywords">Keywords</a>
<a href="/protected/articles">Articles</a>

{#if user}
  <h1>Hello, {user.email}</h1>
{/if}

<h1>Active Users</h1>
<ul>
  {#each $presences as presence}
    <li>{presence.email} - {presence.online_at}</li>
  {/each}
</ul>
