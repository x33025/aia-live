<script lang="ts">
  import Stack from '$lib/components/layout/+stack.svelte';
  import { Alignment, Direction, TextType } from '$lib/types';
  import { page } from '$app/stores'; // Import page to access $page.data
  import Text from '$lib/components/display/+text.svelte';
  import RouteNavigation from '$lib/views/dashboard/+route-navigation.svelte';
  import DashboardArticles from '$lib/views/dashboard/+dashboard-articles.svelte'; // Import the new component
  import DashboardCalendar from '$lib/views/dashboard/+dashboard-calendar.svelte';

  let draftedThisMonth = $page.data.draftedThisMonth;

  // $: console.log(draftedThisMonth);
</script>

<Stack direction={Direction.Vertical} spacing={1}>
  <RouteNavigation />

  <Stack direction={Direction.Horizontal} spacing={1} style="border-top: 1px solid var(--gray-1); padding-top: 1em;">

    <DashboardCalendar />
   
    <DashboardArticles {draftedThisMonth} /> 

  
   
  </Stack>
</Stack>
