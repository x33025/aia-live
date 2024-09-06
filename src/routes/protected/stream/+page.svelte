<script lang="ts">
    import TextInput from "$lib/components/actions/+text-input.svelte";
    import Spacer from "$lib/components/layout/+spacer.svelte";
    import Stack from "$lib/components/layout/+stack.svelte";
    import { article } from "$lib/stores/+article";
    import { Alignment, Direction, TextType } from "$lib/types";
    import SearchBar from "$lib/views/search/+search-bar.svelte";
    import ArticleStream from "$lib/views/stream/+article-stream.svelte";
</script>

<Stack direction={Direction.Horizontal} alignment={Alignment.Start} spacing={1}>
    <Spacer />
  
    <Stack spacing={1} style="width: 1200px;">
        <SearchBar type={TextType.Headline} />
        <!-- Pass down the article content to the Body component -->
         <ArticleStream />
       
      
    </Stack>
    <Spacer />
</Stack>

<style>

</style>
