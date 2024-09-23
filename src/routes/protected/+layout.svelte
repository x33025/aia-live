<script lang="ts">
  import { page } from '$app/stores';
  import MainPage from '$lib/core/layout/+main-page.svelte';
  import { onMount, onDestroy } from 'svelte';
  import { users, current_user } from '$lib/stores/data/+users';
  import Users from '$lib/components/user/+users.svelte';
  import ProfileMenu from '$lib/components/user/+profile-menu.svelte';
  import Stack from '$lib/core/layout/+stack.svelte';
  import { Direction, TextType } from '$lib/types';
  import SearchBar from '$lib/components/search/+search-bar.svelte';
  import PageTitle from '$lib/core/layout/+page-title.svelte';
  import GoBackButton from '$lib/components/navigation/+go-back.svelte';
  import { pb } from '$lib/config/pocketbase';  // Import PocketBase client from config
  import type { BaseModel } from 'pocketbase';

  let intervalId: number;

  // Function to update the last_active status
  async function updateLastActive(userId: string) {
    if (!userId) return;

    try {
      const response = await fetch('/protected', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId }),
      });

      if (!response.ok) {
        console.error('Failed to update last active status');
      }
    } catch (error) {
      console.error('Error updating last active status:', error);
    }
  }

  // Set users and update presence
  onMount(() => {
    users.set($page.data.users);
    current_user.set($page.data.user);

    updateLastActive($current_user.id);

    intervalId = window.setInterval(() => {
      updateLastActive($current_user.id);
    }, 5 * 60 * 1000);  // 5 minutes

    return () => clearInterval(intervalId);  // Cleanup interval on component destroy
  });

  onDestroy(() => {
    clearInterval(intervalId);
  });
</script>



<MainPage>
  <Stack direction={Direction.Horizontal} spacing={1} slot="navigation-leading" style="min-width: 50%;">
    {#if $page.url.pathname !== '/protected'}
      <GoBackButton />
    {/if}
    
    <PageTitle /> 
    <div class="divider" />
    <SearchBar type={TextType.Headline} onSearch={(value) => console.log(value)} placeholder="I'm looking for..." />
  </Stack>

  <svelte:fragment slot="navigation-trailing">
    <Stack direction={Direction.Horizontal} wrap={true} spacing={0.75}>
      <Users />
      <ProfileMenu />
    </Stack>
  </svelte:fragment>

  <!-- Render the main content -->
  <slot />
</MainPage>

<style>
  .divider {
    border-left: 1px solid var(--gray-3);
    height: 80%;
    margin: 0 1em;
  }
</style>
