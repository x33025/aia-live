<script>

    import MainLayout from "$lib/components/layout/+main-page.svelte";
    import Spacer from "$lib/components/layout/+spacer.svelte";
    import Stack from "$lib/components/layout/+stack.svelte";
    import { Direction, TextType } from "$lib/types";
    import SearchBar from "$lib/views/search/+search-bar.svelte";
    import StreamControl from "$lib/views/stream/+stream-control.svelte";
    import PageTitle from "$lib/components/layout/+page-title.svelte";
</script>


<MainLayout>
  
<svelte:fragment slot="navigation-leading">
  <PageTitle />
</svelte:fragment>


<svelte:fragment slot="navigation-center">

<SearchBar type={TextType.Headline} onSearch={(value) => console.log(value)} placeholder="Search news here..." />
  <StreamControl />
</svelte:fragment>
  <slot />
</MainLayout>

  