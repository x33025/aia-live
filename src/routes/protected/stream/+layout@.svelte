<script>

    import MainLayout from "$lib/core/layout/+main-page.svelte";
    import Spacer from "$lib/core/layout/+spacer.svelte";
    import Stack from "$lib/core/layout/+stack.svelte";
    import { Direction, TextType } from "$lib/types";
    import SearchBar from "$lib/components/search/+search-bar.svelte";
    import StreamControl from "$lib/components/stream/+stream-control.svelte";
    import PageTitle from "$lib/core/layout/+page-title.svelte";
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

  