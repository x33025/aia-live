<script lang="ts">
  import { onMount, tick } from 'svelte';
  import { showPicker, pickerPosition, selectedOption } from './+store';
  import { createEventDispatcher } from 'svelte';

  const dispatch = createEventDispatcher();
  let buttonElement: HTMLDivElement;
  let pickerElement: HTMLDivElement;

  export let options: any[] = [];
  export let selection: any = null;
  export let placeholder: string = '';
  export let maxItemsDisplayed: number = 5;

  function togglePicker() {
    showPicker.update(value => !value);
    positionPicker();
  }

  function handleClickOutside(event: MouseEvent) {
    if (
      buttonElement &&
      !buttonElement.contains(event.target as Node) &&
      pickerElement &&
      !pickerElement.contains(event.target as Node)
    ) {
      showPicker.set(false);
    }
  }

  async function positionPicker() {
    await tick(); // Wait for DOM updates
    if (buttonElement && pickerElement) {
      const buttonRect = buttonElement.getBoundingClientRect();
      pickerPosition.set({ top: buttonRect.bottom, right: window.innerWidth - buttonRect.right });
    }
  }

  onMount(() => {
    document.addEventListener('click', handleClickOutside, true);
    return () => {
      document.removeEventListener('click', handleClickOutside, true);
    };
  });

  function selectOption(option: any) {
    selectedOption.set(option);
    showPicker.set(false);
    dispatch('select', option);
  }

  $: if (selection !== $selectedOption) {
    selectedOption.set(selection);
  }
</script>

<div bind:this={buttonElement} class="picker-container">
  <div class="picker-label" on:click={togglePicker} aria-haspopup="true" aria-expanded={$showPicker}>
    {selection ? selection.label : placeholder}
  </div>
  {#if $showPicker}
    <div class="picker-content" bind:this={pickerElement} style="top: {$pickerPosition.top}px; right: {$pickerPosition.right}px;">
      {#each options.slice(0, maxItemsDisplayed) as option}
        <div class="picker-item" on:click={() => selectOption(option)}>
          <slot name="option" {option}>{option.label}</slot>
        </div>
      {/each}
    </div>
  {/if}
</div>

<style>
  .picker-container {
    display: inline-block;
    position: relative;
    font-family: Arial, sans-serif;
  }

  .picker-label {
    cursor: pointer;
    position: relative;
    z-index: 1;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
    background-color: #f9f9f9;
  }

  .picker-content {
    background-color: #ffffff;
    border-top: none;
    border-radius: 4px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    overflow: hidden;
    position: fixed;
    z-index: 9999;
    display: flex;
    flex-direction: column;
    padding-top: 10px;
  }

  .picker-item {
    padding: 8px;
    cursor: pointer;
  }

  .picker-item:hover {
    background-color: #f1f1f1;
  }
</style>
