<script lang="ts">
    import { onMount } from 'svelte';
    import { page } from '$app/stores';
    import { initializeSocket } from '$lib/client/socket'; // Ensure this import is from client folder
    import type { User } from '@prisma/client';
  
    let user: User;
    let activeUsers: User[] = [];
  
    $: {
      const pageData = $page.data as { user: User };
      user = pageData.user;
    }
  
    onMount(() => {
      const socket = initializeSocket(user.id);
  
      socket.on('active-users', (users: User[]) => {
        activeUsers = users;
      });
  
      // Clean up the socket connection when the component is destroyed
      return () => {
        socket.off('active-users');
      };
    });
  </script>
  
  <h1>Welcome, {user.name}!</h1>
  
  <a href="/protected/keywords">Keywords</a>
  <a href="/protected/articles">Articles</a>
  
  <h2>Active Users</h2>
  <ul>
    {#each activeUsers as activeUser}
      <li>{activeUser.name} ({activeUser.email})</li>
    {/each}
  </ul>
  