<script lang="ts">
  import {  TextType } from '$lib/types';
  import Text from '$lib/core/display/+text.svelte';
  import type { Article } from '$lib/types'; 
    import AddArticleButton from '$lib/components/article/+add-article-button.svelte';
    import TimeFrameSelector from '$lib/components/dashboard/+time-frame-selector.svelte';
    import ArticleSmall from '$lib/components/dashboard/articles/+article-small.svelte';
    import { articles, sortedArticles } from '$lib/stores/data/+articles';



</script>


<div class="stack expand" style="--direction: column; --justify: start; --gap: 0.5em; border-left: 1px solid var(--gray-2);">

  <div class="stack " style="--direction: row; --align: center; --justify: space-between; padding: 0.5em; width: 100%; border-bottom: 1px solid var(--gray-1); ">
    <TimeFrameSelector />
    <AddArticleButton />
  </div>

  <div class="stack expand" style="--gap: 0.75em; padding: 0.75em; ">
    {#if $articles.length > 0} 
      {#each $sortedArticles as article (article.id)}
        <ArticleSmall article={article} />
      {/each}
    {:else}
    <div class="stack expand" style="--direction: row; --justify: center; --align: center; width: 100%;">
      <Text type={TextType.Subheadline} style="padding: 0.5em; color: var(--gray-4); border-radius: 0.5em; font-weight: 600;">
        No articles drafted this month
      </Text>
      </div>
    {/if}
  </div>
</div>