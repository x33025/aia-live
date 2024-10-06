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
  import { keywords } from '$lib/stores/data/+keywords';
  import type { Keyword } from '$lib/types';
  import { countries } from '$lib/stores/data/+countries';
  let intervalId: number;

  // Function to update the last_active status
  async function updateLastActive() {
    try {
      const response = await fetch('/api/data/update', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          collection: 'users',
          id: $current_user.id,
          data: { last_active: new Date().toISOString() }
        }),
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
    countries.set($page.data.countries);

    // Subscribe to real-time changes in the articles collection
    pb.collection('articles').subscribe('*', (e) => {
      if (e.action === 'create') {
        console.log('REALTIME CREATE', e.record);
        articles.update(currentArticles => [...currentArticles, e.record as unknown as Article]); // Add new article
      } else if (e.action === 'update') {
        console.log('REALTIME UPDATE', e.record);
        articles.update(currentArticles => currentArticles.map(article => article.id === e.record.id ? e.record as unknown as Article : article)); // Update existing article
      }
    }, { expand: 'keywords,activity,main_image,main_keyword,notes.activity' });

    // Subscribe to real-time changes in the keywords collection
    pb.collection('keywords').subscribe('*', (e) => {
      if (e.action === 'create') {
        console.log('REALTIME CREATE', e.record);
        keywords.update(currentKeywords => [...currentKeywords, e.record as unknown as Keyword]); // Add new keyword
      } else if (e.action === 'update') {
        console.log('REALTIME UPDATE', e.record);
        keywords.update(currentKeywords => currentKeywords.map(keyword => keyword.id === e.record.id ? e.record as unknown as Keyword : keyword)); // Update existing keyword
      }
    }, { expand: 'activity,notes.activity' });

    updateLastActive();

    intervalId = window.setInterval(() => {
      updateLastActive();
    }, 5 * 60 * 1000);  // 5 minutes
  });

  onDestroy(() => {
    clearInterval(intervalId);
    pb.collection('articles').unsubscribe('*');
    pb.collection('keywords').unsubscribe('*');
  });
</script>

<MainPage>
  <div class="stack" slot="navigation-leading" style="--gap: 1em;">
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
