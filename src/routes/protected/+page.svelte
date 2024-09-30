<script lang="ts">

  import { Alignment, Direction, TextType } from '$lib/types';
  import { page } from '$app/stores'; // Import page to access $page.data
  import Text from '$lib/core/display/+text.svelte';
  import RouteNavigation from '$lib/components/dashboard/+route-navigation.svelte';
  import DashboardArticles from '$lib/components/dashboard/+dashboard-articles.svelte'; // Import the new component
  import DashboardCalendar from '$lib/components/dashboard/+dashboard-calendar.svelte';

  let draftedThisMonth = $page.data.draftedThisMonth;

</script>


<div class="stack expand" style="--align: flex-start; --gap: 1em" >
  <RouteNavigation />

  <div class="stack expand" style="border-top: 1px solid var(--gray-2); padding-top: 1em; --direction: row; --justify: space-between; --gap: 1em">

    <DashboardCalendar />
    <div class="spacer" style="max-width: 400px;" />
    <DashboardArticles {draftedThisMonth} /> 

  
   
  </div>
</div>