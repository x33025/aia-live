<script lang="ts">
  import { page } from '$app/stores';
  import MainLayout from '$lib/components/layout/+main-layout.svelte';
  import { onMount, onDestroy } from 'svelte';
  import { users } from '$lib/stores/+users';
  import Users from '$lib/views/user/+users.svelte';
  import ProfileMenu from '$lib/views/user/+profile-menu.svelte';
  import Stack from '$lib/components/layout/+stack.svelte';
  import { Direction } from '$lib/types';

  let intervalId: number;

  // Set users on mount
  onMount(() => {
    users.set($page.data.users);

    // Set up the interval for updating last_active
    intervalId = window.setInterval(() => {
      updateLastActive($page.data.user?.id);
    }, 5 * 60 * 1000); // 5 minutes

    // Clean up the interval on component destroy
    return () => {
      clearInterval(intervalId);
    };
  });

  // Clean up the interval when the component is destroyed
  onDestroy(() => {
    clearInterval(intervalId);
  });

  // Function to update the last_active status
  async function updateLastActive(userId: string) {
    if (!userId) return;

    try {
      // Call the API to update last_active via your +server.ts file
      const response = await fetch('/protected', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId }),
      });

      if (!response.ok) {
        console.error('Failed to update last active status');
      }
    } catch (error) {
      console.error('Error updating last active status:', error);
    }
  }

</script>

<MainLayout>
  <svelte:fragment slot="navigation-trailing">
    <Stack direction={Direction.Horizontal} wrap={true} spacing={1}>
      <Users />
      <ProfileMenu />
    </Stack>
  </svelte:fragment>

  <!-- Render the main content -->
  <slot />
</MainLayout>
