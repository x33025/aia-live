<script lang="ts">
  import Stack from '$lib/core/layout/+stack.svelte';
  import { Direction, TextType } from '$lib/types';
  import PageTitle from '$lib/core/layout/+page-title.svelte';
  import SearchBar from '$lib/components/search/+search-bar.svelte';
  import Spacer from '$lib/core/layout/+spacer.svelte';

    import Avatar from '$lib/components/user/+avatar.svelte';
    import { page } from '$app/stores';



</script>




<Stack direction={Direction.Vertical} spacing={2} style="padding: 2em;">
  <Stack direction={Direction.Horizontal} wrap={true} spacing={1.5}>

    <PageTitle />
    <div style="border-left: 1px solid var(--gray-3); height: 80%; width: 1px;" />
    <SearchBar type={TextType.Headline} onSearch={(value) => console.log(value)} placeholder="Show me images of..." />
  
  </Stack>

  <slot />
</Stack>
  