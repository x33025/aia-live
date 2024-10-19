<script lang="ts">
  import { onDestroy } from 'svelte';
  import { writable } from 'svelte/store';
  import { article } from '$lib/stores/data/+articles';

  // import TabView from '$lib/core/display/+tab-view.svelte'; // Import the TabView component
  import Keywords from '$lib/components/keyword/+keywords.svelte';

  let activeTab = writable('keywords');
  let rawDataCount = 0;

  // Subscribe to the article store to get the count of raw_data entries
  const unsubscribe = article.subscribe(value => {
    if (value && value.raw_data) {
      rawDataCount = value.raw_data.length;
    } else {
      rawDataCount = 0;
    }
  });

  // Clean up the subscription when the component is destroyed
  onDestroy(() => {
    unsubscribe();
  });
</script>

<!-- <TabView defaultTab={$activeTab}>
  <svelte:fragment slot="header">
    <button class="tab-button" class:selected={$activeTab === 'keywords'} on:click={() => activeTab.set('keywords')}>Keywords</button>
    <button class="tab-button" class:selected={$activeTab === 'extracted'} on:click={() => activeTab.set('extracted')}>
      Extracted Data
      {#if rawDataCount > 0}
        <span class="data-count-circle">{rawDataCount}</span>
      {/if}
    </button>
    <button class="tab-button" class:selected={$activeTab === 'magic'} on:click={() => activeTab.set('magic')}>Magic Data</button>
  </svelte:fragment>
  <svelte:fragment slot="content">
    {#if $activeTab === 'keywords'}
      {#if $article && $article.expand}
        <Keywords keywords={$article.expand.keywords} main_keyword={$article.expand.main_keyword} article_id={$article.id} />
      {/if}
    {:else if $activeTab === 'extracted'}
      {"Extracted Data"}
    {:else if $activeTab === 'magic'}
      {"Magic Data"}
    {/if}
  </svelte:fragment>
</TabView> -->

<style>
  .tab-button {
    position: relative;
    padding: 0.5em;
    border: none;
    background: none;
    border-radius: 0.5em;
    cursor: pointer;
    background-color: var(--gray-1);
    font-size: 1em;
    display: flex;
    align-items: center;
  }

  .tab-button.selected {
    background-color: var(--gray-2);
  }



  .data-count-circle {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    margin-left: 0.5em;
    width: 1.25em;
    height: 1.25em;
    border-radius: 50%;
    background-color: var(--blue);
    color: white;
    font-size: 0.75em;
    font-weight: 500;
  }
</style>