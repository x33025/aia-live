<script lang="ts">
  import Text from '$lib/components/display/+text.svelte';
  import { onMount, tick, afterUpdate } from 'svelte';
  import { createEventDispatcher } from 'svelte';
  import Button from './+button.svelte';

  const dispatch = createEventDispatcher();
  let buttonElement: HTMLDivElement;
  let pickerElement: HTMLDivElement;
  let hiddenContainer: HTMLDivElement;
  let maxLabelWidth = 0;

  export let options: Identifiable[] = [];
  export let selection: Identifiable | null = null;
  export let placeholder: string = 'Select an option';
  export let maxItemsDisplayed: number = 5;

  let showPicker = false;
  let pickerPosition = { top: 0, right: 0 };

  function togglePicker() {
    showPicker = !showPicker;
    positionPicker();
  }

  function handleClickOutside(event: MouseEvent) {
    if (
      buttonElement &&
      !buttonElement.contains(event.target as Node) &&
      pickerElement &&
      !pickerElement.contains(event.target as Node)
    ) {
      showPicker = false;
    }
  }

  async function positionPicker() {
    await tick(); // Wait for DOM updates
    if (buttonElement && pickerElement) {
      const buttonRect = buttonElement.getBoundingClientRect();
      pickerPosition = { top: buttonRect.bottom, right: window.innerWidth - buttonRect.right };
    }
  }

  function calculateMaxLabelWidth() {
    if (hiddenContainer) {
      maxLabelWidth = Array.from(hiddenContainer.children).reduce((maxWidth, child) => {
        const width = (child as HTMLElement).offsetWidth;
        return Math.max(maxWidth, width);
      }, 0);
    }
  }

  onMount(() => {
    document.addEventListener('click', handleClickOutside, true);
    calculateMaxLabelWidth();
    return () => {
      document.removeEventListener('click', handleClickOutside, true);
    };
  });

  afterUpdate(() => {
    calculateMaxLabelWidth();
  });

  function selectOption(option: Identifiable | null) {
    selection = option;
    showPicker = false;
    dispatch('select', option);
  }
</script>

<div bind:this={buttonElement} class="picker-button-container">
  <Button class="picker-label" on:click={togglePicker} style="min-width: {maxLabelWidth}px;">
    {selection ? selection.name : placeholder}
  </Button>

  {#if showPicker}
    <div class="picker-content" bind:this={pickerElement} style="top: {pickerPosition.top}px; right: {pickerPosition.right}px;">
      <div class="picker-item" on:click={() => selectOption(null)}>
        <slot name="option" option={null}>None</slot>
      </div>
      {#each options.slice(0, maxItemsDisplayed) as option}
        <div class="picker-item" on:click={() => selectOption(option)}>
          <slot name="option" {option}>{option.name}</slot>
        </div>
      {/each}
    </div>
  {/if}

  <!-- Hidden container to measure label widths -->
  <div bind:this={hiddenContainer} class="hidden-container">
    <div class="hidden-item">{placeholder}</div>
    {#each options as option}
      <div class="hidden-item">{option.name}</div>
    {/each}
  </div>
</div>

<style>
  .picker-button-container {
    width: 15%;
  }

  :global(.picker-label) {
    cursor: pointer;
    position: relative;
    z-index: 1;
    padding: 0.5em;
    border-radius: 0.5em;
    background-color: var(--gray-1);
    display: block;
    white-space: nowrap;
    width: 100%;
    text-align: left;
  }

  .picker-content {
    background-color: #ffffff;
    border: 1px solid #ccc;
    border-radius: 0.5em;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    overflow: hidden;
    position: fixed;
    z-index: 9999;
    display: flex;
    flex-direction: column;
    padding: 0.25em;
    max-width: 100%; /* Ensures the picker doesn't exceed the viewport width */
  }

  .picker-item {
    padding: 0.5em;
    cursor: pointer;
    border-radius: 0.3em;
  }

  .picker-item:hover {
    background-color: var(--gray-1);
  }

  .hidden-container {
    position: absolute;
    visibility: hidden;
    white-space: nowrap;
    pointer-events: none;
    height: 0;
  }

  .hidden-item {
    display: inline-block;
    padding: 0.5em;
  }
</style>
