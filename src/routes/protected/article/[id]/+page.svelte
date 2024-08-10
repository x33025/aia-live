<script lang="ts">
  import Stack from '$lib/components/layout/+stack.svelte';
  import { Alignment, Direction } from '$lib/types';

  export let article: Article;
  export let metadata: ArticleMetadata;
  export let activityData: ActivityData;
  export let timeData: TimeData;

  console.log('Received article:', article);
  console.log('Received metadata:', metadata);
  console.log('Received activity data:', activityData);
  console.log('Received time data:', timeData);
</script>

<Stack direction={Direction.Row} alignment={Alignment.Center} spacing={1}>
  <Stack direction={Direction.Column} alignment={Alignment.Start}>
    <h1 class="title">{metadata?.title || 'No title available'}</h1>
    <p class="body">{article?.content || 'No content available'}</p>
  </Stack>

  <div class="placeholder-shape"></div>
</Stack>

<style>
  .title {
    width: 100%;
    font-size: 1.5em;
    background-color: var(--gray-3);
    border-radius: 8px;
    margin-bottom: 1em;
    padding: 0.5em;
  }

  .body {
    width: 100%;
    background-color: var(--gray-4);
    border-radius: 8px;
    padding: 1em;
    white-space: pre-wrap; /* Preserve formatting */
  }

  .placeholder-shape {
    flex: 1;
    background-color: var(--gray-2);
    border-radius: 8px;
  }

  @media (max-width: 768px) {
    .placeholder-shape {
      width: 100%;
      height: 200px; /* Adjust height as needed for smaller screens */
    }
  }
</style>
