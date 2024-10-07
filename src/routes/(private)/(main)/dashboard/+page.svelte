<script lang="ts">
  import { page } from '$app/stores'; // Import page to access $page.data
  import RouteNavigation from '$lib/components/dashboard/+route-navigation.svelte';
  import DashboardArticles from '$lib/components/dashboard/articles/+dashboard-articles.svelte';
  import DashboardCalendar from '$lib/components/dashboard/+dashboard-calendar.svelte';
  import { onMount, onDestroy } from 'svelte';
  import { articles } from '$lib/stores/data/+articles'; // Store for articles
  import { users } from '$lib/stores/data/+users'; // Store for users
  import { pb } from '$lib/config/pocketbase'; // Import PocketBase client
  import type { Article, User } from '$lib/types'; // Assuming you have an Article type defined

  onMount(() => {
    // Set initial data from SSR
    articles.set($page.data.draftedThisMonth.items);
    console.log($page.data.draftedThisMonth.items);

    



 
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
