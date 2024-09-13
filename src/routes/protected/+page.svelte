<script lang="ts">
  import Stack from '$lib/components/layout/+stack.svelte';
  import { Alignment, Direction, TextType } from '$lib/types';
  import { page } from '$app/stores'; // Import page to access $page.data
  import Text from '$lib/components/display/+text.svelte';
  import RouteNavigation from '$lib/views/dashboard/+route-navigation.svelte';
  import DashboardArticles from '$lib/views/dashboard/+dashboard-articles.svelte'; // Import the new component

  // Access articlesByWeek from $page.data
  let articlesByWeek: Record<number, any[]>;

  // Subscribe to $page to get the data
  $: {
    const pageData = $page;
    articlesByWeek = pageData.data.articlesByWeek || {};
  }
</script>

<Stack direction={Direction.Vertical} spacing={1}>
  <RouteNavigation />

  <Stack direction={Direction.Horizontal} spacing={0.5}>
    <DashboardArticles {articlesByWeek} /> <!-- Use the new component -->

    <Stack style="background-color: white; border-radius: 0.75em;">
      <!-- You can use this Stack for other content -->
    </Stack>
  </Stack>
</Stack>
