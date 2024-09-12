<script lang="ts">
  import Stack from '$lib/components/layout/+stack.svelte';
  import { Alignment, Direction, TextType } from '$lib/types';
  import { page } from '$app/stores'; // Import page to access $page.data
    import Text from '$lib/components/display/+text.svelte';
    import RouteNavigation from '$lib/views/dashboard/+route-navigation.svelte';

  // Access articlesByWeek from $page.data
  let articlesByWeek: Record<number, any[]>;

  // Subscribe to $page to get the data
  $: {
    const pageData = $page;
    articlesByWeek = pageData.data.articlesByWeek || {};
  }
</script>

<Stack direction={Direction.Vertical} spacing={1}>
  <Stack direction={Direction.Horizontal}  spacing={1} wrap={true} >
 
    <RouteNavigation route="/protected/articles" emojis={["📰", "📄", "🖋️", "📚"]} text="Articles" />
    <RouteNavigation route="/protected/keywords" emojis={["🔑", "📊", "🔍", "📝"]} text="Keywords" />
    <RouteNavigation route="/protected/stream" emojis={["📡", "📺", "🎥"]} text="Stream" />
    <RouteNavigation route="/protected/ai-detector" emojis={["🤖", "🧠", "🔍"]} text={"AI Detector {WIP}"} />
   
  </Stack>


    <Stack direction={Direction.Horizontal} spacing={0.5}>
      <Stack style="background-color: white; border-radius: 0.5em;  border: 1px solid var(--gray-2);" >
        <Text type={TextType.Subheadline} style=" padding: 0.5em; border-bottom: 1px solid var(--gray-2)">Articles This Week</Text>
        
        <Stack spacing={0.3} style="padding: 0.3em;">
          {#each Object.entries(articlesByWeek) as [weekNumber, articles]}
       
          {#each articles as article}
            <Text type={TextType.Body} style="padding: 0.5em; background-color: var(--gray-1); border-radius: 0.5em; font-weight: 600; ">{article.title}</Text>
          {/each}
        {/each}
        </Stack>
     
      </Stack>

      <Stack style="background-color: white; border-radius: 0.75em;">
        <!-- You can use this Stack for other content -->
      </Stack>
    </Stack>



</Stack>
