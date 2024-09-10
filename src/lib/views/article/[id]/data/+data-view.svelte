<script lang="ts">
  import { onDestroy } from 'svelte';
  import { writable } from 'svelte/store';
  import { article } from '$lib/stores/+article';

  import TabView from '$lib/components/display/+tab-view.svelte'; // Import the TabView component
    import Keywords from '../../../keyword/+keywords.svelte';

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

<TabView defaultTab={$activeTab}>
  <div slot="header">
    <button class="tab-button" class:selected={$activeTab === 'keywords'} on:click={() => activeTab.set('keywords')}>Keywords</button>
    <button class="tab-button" class:selected={$activeTab === 'extracted'} on:click={() => activeTab.set('extracted')}>
      Extracted Data
      {#if rawDataCount > 0}
        <span class="data-count-circle">{rawDataCount}</span>
      {/if}
    </button>
    <button class="tab-button" class:selected={$activeTab === 'magic'} on:click={() => activeTab.set('magic')}>Magic Data</button>
  </div>
  <div slot="content">
    {#if $activeTab === 'keywords'}
     <Keywords keywords={$article.expand?.keywords} main_keyword={$article.expand?.main_keyword} />
    {:else if $activeTab === 'extracted'}
    {"Extracted Data"}
    {:else if $activeTab === 'magic'}
    {"Magic Data"}
    {/if}
  </div>
</TabView>

<style>
  .tab-button {
    position: relative;
    padding: 0.5em;
    border: none;
    background: none;
    border-radius: 0.5em;
    cursor: pointer;
    transition: background-color 0.2s ease;
    font-size: 1em;
    display: flex;
    align-items: center;
  }

  .tab-button.selected {
    background-color: var(--gray-2);
  }

  .tab-button:hover {
    background-color: var(--gray-1);
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