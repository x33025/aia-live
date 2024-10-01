<script lang="ts">
  import { page } from '$app/stores';
  import MainPage from '$lib/core/layout/+main-page.svelte';
  import { onMount, onDestroy } from 'svelte';
  import { users, current_user } from '$lib/stores/data/+users';
  import Users from '$lib/components/user/+users.svelte';
  import ProfileMenu from '$lib/components/user/+profile-menu.svelte';

  import { Direction, TextType } from '$lib/types';
  import SearchBar from '$lib/components/search/+search-bar.svelte';
  import PageTitle from '$lib/core/layout/+page-title.svelte';
  import GoBackButton from '$lib/core/navigation/+go-back.svelte';

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
  <div class="stack" slot="navigation-leading" style="--gap: 1em;" >
    {#if $page.url.pathname !== '/protected'}
    <div class="stack" style="margin-left: 0.75em;">
      <GoBackButton />
    </div>
    {/if}
    
    <PageTitle /> 

    <!-- <SearchBar type={TextType.Headline} onSearch={(value) => console.log(value)} placeholder="I'm looking for..." /> -->
  </div>


    <div class="stack" slot="navigation-trailing">
      <Users />
      <ProfileMenu />
    </div>
 

  <!-- Render the main content -->
  <slot />
</MainPage>
