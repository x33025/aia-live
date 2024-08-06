<script lang="ts">
  import { onMount, tick } from 'svelte';
  import { writable } from 'svelte/store';
  import { createEventDispatcher } from 'svelte';
  import { showPicker, pickerPosition, selectedOption } from './+store';

  const dispatch = createEventDispatcher();
  let buttonElement: HTMLDivElement;
  let pickerElement: HTMLDivElement;

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
    const pickerElement = document.querySelector('.picker-content') as HTMLDivElement;
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
</script>

<div bind:this={buttonElement} class="picker-container">
  <div class="picker-trigger" on:click={togglePicker} aria-haspopup="true" aria-expanded={$showPicker}>
    <slot name="trigger"></slot>
  </div>
  {#if $showPicker}
    <div class="picker-content" bind:this={pickerElement} style="top: {$pickerPosition.top}px; right: {$pickerPosition.right}px;">
      <slot name="content"></slot>
    </div>
  {/if}
</div>

<style>
  .picker-container {
    display: inline-block;
    position: relative;
    font-family: Arial, sans-serif;
  }

  .picker-trigger {
    cursor: pointer;
    position: relative;
    z-index: 1;
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
</style>
