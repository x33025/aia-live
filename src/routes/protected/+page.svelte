<script lang="ts">
    import { onMount } from 'svelte';
    import { presences, setupPresenceChannel } from '$lib/stores/presence';
  
    onMount(() => {
      const channel = setupPresenceChannel('room1');
      return () => {
        channel.unsubscribe();
      };
    });
  </script>
  
  <a href="/protected/keywords">Keywords</a>
  <a href="/protected/articles">Articles</a>
  
  <h1>Active Users</h1>
  
    {#each $presences as presence}
      {presence.id} - {presence.online_at}
    {/each}
  
  