<!-- <script lang="ts">
  import Stack from '$lib/components/layout/+stack.svelte';
  import Input from '$lib/components/actions/+input.svelte';
  import { Alignment, Direction } from '$lib/types';
  import { createEventDispatcher } from 'svelte';
    import Text from '$lib/components/display/+text.svelte';

  export let article: Article;
  export let metadata: ArticleMetadata;
  export let activityData: ActivityData;
  export let timeData: TimeData;

  const dispatch = createEventDispatcher();

  function handleTitleInput(event: CustomEvent) {
    if (metadata) {
      metadata.title = event.detail.value; // Update the metadata title directly
      dispatch('updateTitle', { title: event.detail.value });
    }
  }

  console.log('Received article:', article);
  console.log('Received metadata:', metadata);
  console.log('Received activity data:', activityData);
  console.log('Received time data:', timeData);
</script>

<Stack direction={Direction.Column} spacing={1}>
  <Input
    className="title"
    value={metadata?.title || ''}
    placeholder="Enter article title"
    on:input={handleTitleInput}
  />
  <p class="body">{article?.content || 'No content available'}</p>
</Stack>

<style>
  :global(.title) {
    width: 100%;
    background-color: var(--gray-1);
    border-radius: 8px;
    padding: 0.5em;
    font-size: 1.5em; /* Adjust font size to match h1 styling */
  }

  .body {
    width: 100%;
    height: 100%;
    background-color: var(--gray-1);
    border-radius: 8px;
    padding: 1em;
    white-space: pre-wrap; /* Preserve formatting */
  }
</style> -->
