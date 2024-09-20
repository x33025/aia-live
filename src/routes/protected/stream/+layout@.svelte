<script>

    import MainLayout from "$lib/core/layout/+main-page.svelte";
    import { TextType } from "$lib/types";
    import SearchBar from "$lib/components/search/+search-bar.svelte";
    import StreamControl from "$lib/components/stream/+stream-control.svelte";
    import PageTitle from "$lib/core/layout/+page-title.svelte";
    import GoBackButton from '$lib/components/navigation/+go-back.svelte';
    import Stack from '$lib/core/layout/+stack.svelte';
    import { Direction } from '$lib/types';
</script>


<MainLayout>
  
<svelte:fragment slot="navigation-leading">
  <Stack direction={Direction.Horizontal} spacing={1}>    
    <GoBackButton />
    <PageTitle />

  </Stack>

</svelte:fragment>


<svelte:fragment slot="navigation-center">

<SearchBar type={TextType.Headline} onSearch={(value) => console.log(value)} placeholder="Search news here..." />
  <StreamControl />
</svelte:fragment>

  <slot />
  
</MainLayout>

  