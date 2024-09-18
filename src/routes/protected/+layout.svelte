<script lang="ts">
  import { page } from '$app/stores';
  import MainPage from '$lib/components/layout/+main-page.svelte';
  import { onMount, onDestroy } from 'svelte';
  import { users } from '$lib/stores/+users';
  import Users from '$lib/views/user/+users.svelte';
  import ProfileMenu from '$lib/views/user/+profile-menu.svelte';
  import Stack from '$lib/components/layout/+stack.svelte';
  import { Direction, TextType } from '$lib/types';
  import SearchBar from '$lib/views/search/+search-bar.svelte';
  import PageTitle from '$lib/components/layout/+page-title.svelte';
  import { user as userStore } from '$lib/stores/data/+user';

  let intervalId: number;

  // Set users on mount
  onMount(() => {
    users.set($page.data.users);
    userStore.set($page.data.user);
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
  
  // Function to handle the go back action
  const goBack = () => {
    history.back();
  }
</script>

<MainPage>
  <svelte:fragment slot="navigation-leading">
    {#if $page.url.pathname !== '/protected'}
      <button on:click={goBack}>Go Back</button>
    {/if}

    <PageTitle /> 
    <div style="border-left: 1px solid var(--gray-3); height: 80%; margin: 0 1em;" />
    <SearchBar type={TextType.Headline} onSearch={(value) => console.log(value)} placeholder="I'm looking for..." />
  </svelte:fragment>

  <svelte:fragment slot="navigation-trailing">
    <Stack direction={Direction.Horizontal} wrap={true} spacing={0.75}>
      <Users />
      <ProfileMenu />
    </Stack>
  </svelte:fragment>

  <!-- Render the main content -->
  <slot />
</MainPage>
