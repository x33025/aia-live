<script lang="ts">
  import { article } from '$lib/stores/+article';
  import { onDestroy } from 'svelte';
  import TextInput from '$lib/components/actions/+text-input.svelte';
  import Stack from '$lib/components/layout/+stack.svelte';
  import { Alignment, Direction, TextType } from '$lib/types';
  import Body from '$lib/views/article/[id]/body/+content.svelte';
  import { page } from '$app/stores';

  let unsubscribe: () => void; // To track the unsubscribe function

  // Function to handle updates
  function publishUpdate(updatedContent: string) {
    console.log("Publishing update:", updatedContent);
  }

  // Subscribe to $page data and set the article store when it changes
  unsubscribe = page.subscribe(($page) => {
    if ($page.data.article) {
      article.set($page.data.article); // Set article from $page.data
    }
  });

  // Cleanup subscription when the component is destroyed
  onDestroy(() => {
    if (unsubscribe) unsubscribe();
  });
</script>

<Stack  spacing={1}>
  <!-- Bind the article's title directly to the Input component -->
<Stack direction={Direction.Horizontal} alignment={Alignment.Center} spacing={1}>

  <Stack spacing={1} style="max-width: 700px;">
  <TextInput
      className="article-title border-highlight"
      bind:value={$article.title}
      placeholder="Title"
      fullWidth={true}
      type={TextType.Headline}
    />
    <!-- Pass down the article content to the Body component -->
    <Body content={$article.content} onPublishUpdate={publishUpdate} />


    </Stack>
  </Stack>

</Stack>

<style>
  :global(.article-title) {
    padding: 0.5em;
    background-color: white;
    border-radius: 0.5em;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }
</style>
