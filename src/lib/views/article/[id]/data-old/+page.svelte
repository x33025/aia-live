<!-- <script lang="ts">
  import { onDestroy } from 'svelte';
  import { writable } from 'svelte/store';
  import { article } from '$lib/stores/+article';
  import ExtractedDataView from './extracted-data/+page.svelte';
  import MagicDataView from './magic-data/+page.svelte';
  import KeywordsView from './keywords/+page.svelte';
  import SourceView from '../source/+page.svelte';
  import ExtractButton from '../source/extract/+page.svelte';
  import { openModal } from '$lib/stores/+source-modal';

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

  function showKeywords() {
    activeTab.set('keywords');
  }

  function showExtractedData() {
    activeTab.set('extracted');
  }

  function showMagicData() {
    activeTab.set('magic');
  }

  function openSourceModal(): void {
    openModal(SourceView, ExtractButton);
  }

  // Clean up the subscription when the component is destroyed
  onDestroy(() => {
    unsubscribe();
  });
</script>

<div class="tab-view">
  <div class="tab-header">
    <button class="tab-button source-button" on:click={openSourceModal}>Source</button>
    <div class="spacer"></div>
    <button class="tab-button" class:selected={$activeTab === 'keywords'} on:click={showKeywords}>Keywords</button>
    <button class="tab-button" class:selected={$activeTab === 'extracted'} on:click={showExtractedData}>
      Extracted Data
      {#if rawDataCount > 0}
        <span class="data-count-circle">{rawDataCount}</span>
      {/if}
    </button>
    <button class="tab-button" class:selected={$activeTab === 'magic'} on:click={showMagicData}>Magic Data</button>
  </div>
  <div class="tab-content">
    <div class="scrollable-container">
      {#if $activeTab === 'keywords'}
        <KeywordsView />
      {:else if $activeTab === 'extracted'}
        <ExtractedDataView />
      {:else if $activeTab === 'magic'}
        <MagicDataView />
      {/if}
    </div>
  </div>
</div>

<style>
  .tab-view {
    display: flex;
    flex-direction: column;
    height: 100%;
  }

  .tab-header {
    display: flex;
    justify-content: flex-start;
    gap: 0.5em;
    padding: 0.5em;
    margin-bottom: 1em;
    background-color: white;
    border-radius: 1em;
  }

  .spacer {
    flex-grow: 1;
  }

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

  .source-button, .source-button:hover {
    background-color: var(--blue);
    color: white;
  }

  .tab-content {
    flex: 1;
    overflow: hidden;
    border-radius: 1em;
    background-color: white;
    margin-bottom: 1em;
  }

  .scrollable-container {
    flex: 1;
    overflow-y: auto;
    height: 100%;
    background-color: white;
    padding: 1em;
  }
</style> -->
