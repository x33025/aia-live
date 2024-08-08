<script lang="ts">
  import { selectedDataPoints, toggleDataPointSelection } from '$lib/stores/+data-point';
  import type { DataPoint } from '$lib/utils/interfaces/+article';

  export let key: string;
  export let value: any;
  export let parentKey: string = ''; // Optional parent key

  function getFullKey() {
    return parentKey ? `${parentKey}^${key}` : key;
  }

  function toggleSelection(event: MouseEvent | KeyboardEvent) {
    event.stopPropagation(); // Stop propagation to prevent closing the popover
    const dataPoint: DataPoint = {
      key: getFullKey(),
      value
    };
    toggleDataPointSelection(dataPoint);
  }

  function handleKeyDown(event: KeyboardEvent) {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      toggleSelection(event);
    }
  }

  function isAncestorSelected(fullKey: string, selectedKeys: string[]): boolean {
    return selectedKeys.some(selectedKey => fullKey.startsWith(selectedKey + '^'));
  }

  function formatKey(key: string): string {
    return key.replace(/_/g, ' ');
  }

  function isNonYearNumber(key: string): boolean {
    const num = Number(key);
    return !isNaN(num) && (num < 1000 || num > 9999);
  }

  $: fullKey = getFullKey();
  $: isSelected = $selectedDataPoints.some(selected => selected.key === fullKey) || isAncestorSelected(fullKey, $selectedDataPoints.map(selected => selected.key));
</script>

<div
  class={`json-item ${isSelected ? 'selected' : ''}`}
  role="button"
  tabindex="0"
  aria-pressed={isSelected}
  on:click={toggleSelection}
  on:keydown={handleKeyDown}
>
  {#if isNonYearNumber(key)}
    {#if typeof value === 'object' && value !== null}
      <ul>
        {#if Array.isArray(value)}
          {#each value as item, index (index)}
            <li><svelte:self key={index.toString()} value={item} parentKey={fullKey} /></li>
          {/each}
        {:else}
          {#each Object.entries(value) as [nestedKey, nestedVal], index (nestedKey)}
            <li><svelte:self key={nestedKey} value={nestedVal} parentKey={fullKey} /></li>
          {/each}
        {/if}
      </ul>
    {:else}
      {value}
    {/if}
  {:else}
    <strong>{formatKey(key)}:</strong>
    {#if typeof value === 'object' && value !== null}
      <ul>
        {#if Array.isArray(value)}
          {#each value as item, index (index)}
            <li><svelte:self key={index.toString()} value={item} parentKey={fullKey} /></li>
          {/each}
        {:else}
          {#each Object.entries(value) as [nestedKey, nestedVal], index (nestedKey)}
            <li><svelte:self key={nestedKey} value={nestedVal} parentKey={fullKey} /></li>
          {/each}
        {/if}
      </ul>
    {:else}
      {value}
    {/if}
  {/if}
</div>

<style>
  :global(.json-item) {
    margin: .3em;
    cursor: pointer;
    background: none;
    border: none;
    text-align: left;
    width: 100%;
    display: inline-block;
    font-family: monospace;
    padding: .4em .4em .4em 0.8em;
    transition: background-color .1s;
    position: relative;
    overflow: visible;
  }

  .json-item::before {
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    width: .3em;
    background-color: #ccc;
    border-radius: .15em;
    pointer-events: none;
    z-index: 1;
  }

  .json-item.selected::before {
    background-color: var(--blue);
  }

  ul {
    list-style-type: none;
    padding-left: 0.5em;
  }
</style>