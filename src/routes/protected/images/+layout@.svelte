<script lang="ts">
  import Stack from '$lib/components/layout/+stack.svelte';
  import { Direction, TextType } from '$lib/types';
  import PageTitle from '$lib/components/layout/+page-title.svelte';
  import SearchBar from '$lib/views/search/+search-bar.svelte';
</script>




<Stack direction={Direction.Vertical} spacing={2} style="padding: 2em;">
  <Stack direction={Direction.Horizontal} wrap={true} spacing={1.5}>

    <PageTitle />
    <div style="border-left: 1px solid var(--gray-3); height: 80%; width: 1px;" />
    <SearchBar type={TextType.Headline} onSearch={(value) => console.log(value)} placeholder="I'm looking for..." fullWidth={true} />
  </Stack>

  <slot />
</Stack>
  