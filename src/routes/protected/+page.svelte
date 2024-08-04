<script lang="ts">
  import { onMount } from 'svelte';
  import { presences, setupPresenceChannel } from '$lib/stores/presence';
  import type { LayoutData } from './$types';
  import { page } from '$app/stores';

  let allUsers: User[];
  let user_id: string;
  let activeUsers: (User & { online_at: string })[] = [];

  $: {
    const data = $page.data as LayoutData;
    allUsers = data.allUsers;
    user_id = data.user_id!;

    console.log('All Users:', allUsers);
    console.log('User ID:', user_id);

    activeUsers = $presences.map(presence => {
      const user = allUsers.find(user => user.id === presence.id);
      return user ? { ...user, online_at: presence.online_at } : null;
    }).filter(Boolean);

    console.log('Active Users:', activeUsers);
  }

  onMount(() => {
    if (user_id) {
      const currentUser = allUsers.find(user => user.id === user_id);
      if (currentUser) {
        const channel = setupPresenceChannel('room1', { id: user_id, name: currentUser.name });
        console.log('Current User:', currentUser);
        return () => {
          channel.unsubscribe();
        };
      }
    }
  });

  function getDisplayName(user: User): string {
    const lastNameInitial = user.last_name ? user.last_name.charAt(0) + '.' : '';
    return `${user.name} ${lastNameInitial}`;
  }
</script>

<a href="/protected/keywords">Keywords</a>
<a href="/protected/articles">Articles</a>

<div class="vstack">
  {#if activeUsers.length > 0}
    {#each activeUsers as user}
      <div class="user">
        {getDisplayName(user)}
      </div>
    {/each}
  {:else}
    <div class="user">No active users</div>
  {/if}
</div>

<style>
  .vstack {
    display: flex;
    flex-direction: column;
  }
  .user {
    margin: 5px 0;
  }
</style>
