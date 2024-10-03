<script lang="ts">
  import { page } from '$app/stores';
  import MainPage from '$lib/core/layout/+main-page.svelte';
  import { onMount, onDestroy } from 'svelte';
  import { users, current_user } from '$lib/stores/data/+users';
  import Users from '$lib/components/user/+users.svelte';
  import ProfileMenu from '$lib/components/user/+profile-menu.svelte';
  import PageTitle from '$lib/core/layout/+page-title.svelte';
  import GoBackButton from '$lib/core/navigation/+go-back.svelte';
  import { pb } from '$lib/config/pocketbase';
  import type { Article } from '$lib/types';
  import { articles } from '$lib/stores/data/+articles';

  let intervalId: number;

  // Function to update the last_active status
  async function updateLastActive() {
 
    try {
      const response = await fetch('/api/data/update', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ collection: 'users', id: $current_user.id, data: { last_active: new Date().toISOString() } }),
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



        // Subscribe to real-time changes in the articles collection
        pb.collection('articles').subscribe('*', (e) => {
      if (e.action === 'create') {
        console.log('create', e.record);
        articles.update(currentArticles => [...currentArticles, e.record as unknown as Article]); // Add new article
      } else if (e.action === 'update') {
        console.log('update', e.record);
        articles.update(currentArticles => currentArticles.map(article => article.id === e.record.id ? e.record as unknown as Article : article)); // Update existing article
      } 
    });




    updateLastActive();

    intervalId = window.setInterval(() => {
      updateLastActive();
    }, 5 * 60 * 1000);  // 5 minutes

    return () => clearInterval(intervalId);  // Cleanup interval on component destroy
  });

  onDestroy(() => {
    clearInterval(intervalId);
    pb.collection('articles').unsubscribe('*');
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

    </div>


    <div class="stack" slot="navigation-trailing">
      <Users />
      <ProfileMenu />
    </div>
 

  <!-- Render the main content -->
  <slot />
</MainPage>
