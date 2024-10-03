<script lang="ts">
  import { page } from '$app/stores'; // Import page to access $page.data
  import RouteNavigation from '$lib/components/dashboard/+route-navigation.svelte';
  import DashboardArticles from '$lib/components/dashboard/articles/+dashboard-articles.svelte';
  import DashboardCalendar from '$lib/components/dashboard/+dashboard-calendar.svelte';
  import { onMount, onDestroy } from 'svelte';
  import { articles } from '$lib/stores/data/+articles'; // Store for articles
  import { pb } from '$lib/config/pocketbase'; // Import PocketBase client
  import type { Article } from '$lib/types'; // Assuming you have an Article type defined

  onMount(() => {
    // Set initial data from SSR
    articles.set($page.data.draftedThisMonth.items);
    console.log($page.data.draftedThisMonth.items);

    // Subscribe to real-time changes in the articles collection
    pb.collection('articles').subscribe('*', (e) => {
      if (e.action === 'create') {
        console.log('create', e.record);
        articles.update(currentArticles => [...currentArticles, e.record as unknown as Article]); // Add new article
      } else if (e.action === 'update') {
        console.log('update', e.record);
        articles.update(currentArticles => currentArticles.map(article => article.id === e.record.id ? e.record as unknown as Article : article)); // Update existing article
      } else if (e.action === 'delete') {
        console.log('delete', e.record);
        articles.update(currentArticles => currentArticles.filter(article => article.id !== e.record.id)); // Remove deleted article
      }
    });

 
  });


     // Cleanup subscription when component is destroyed
     onDestroy(() => {
      pb.collection('articles').unsubscribe('*');
    });
</script>

<div class="stack expand" style="--align: flex-start; --gap: 1em; padding: 1em;">
  <RouteNavigation />
  
  <div class="stack expand" style="border-top: 1px solid var(--gray-2); padding-top: 1em; --direction: row; --justify: space-between; --gap: 1em">
    <DashboardCalendar />
    <div class="spacer" style="max-width: 400px;" />
    <DashboardArticles /> 
  </div>
</div>
