<script lang="ts">
  import { writable } from 'svelte/store';
  import { onMount } from 'svelte';
  import { slide } from 'svelte/transition';
  import Text from '../display/+text.svelte';
  import VStack from '../layout/+v-stack.svelte';

  export let options: MenuItem[] = [];
  const showPicker = writable(false);
  const selectedOption = writable<MenuItem | null>(null);
  let pickerElement: HTMLDivElement;

  function togglePicker() {
    showPicker.update(value => !value);
  }

  function handleClickOutside(event: MouseEvent) {
    if (pickerElement && !pickerElement.contains(event.target as Node)) {
      showPicker.set(false);
    }
  }

  function selectOption(option: MenuItem | null) {
    selectedOption.set(option);
    showPicker.set(false);
  }

  onMount(() => {
    document.addEventListener('click', handleClickOutside, true);
    return () => {
      document.removeEventListener('click', handleClickOutside, true);
    };
  });
</script>


<div bind:this={pickerElement} class="picker-container">
  <button 
    class="picker-button"
    class:open={$showPicker}
    on:click={togglePicker}
    aria-haspopup="true"
    aria-expanded={$showPicker}
  >
    <Text>{$selectedOption ? $selectedOption.label : "Select an option"}</Text>
  </button>
  
  {#if $showPicker}
    <div 
      class="picker-content"
      transition:slide={{ duration: 300 }}
    >
      <VStack spacing={0.5}>
        <div class="picker-item" on:click={() => selectOption(null)}><Text>None</Text></div>
        {#each options as option}
          <div class="picker-item" on:click={() => selectOption(option)}><Text>{option.label}</Text></div>
        {/each}
      </VStack>
    </div>
  {/if}
</div>


<style>
  .picker-container {
    display: inline-block;
    position: relative;
    font-family: Arial, sans-serif;
  }

  .picker-button {
    background-color: #f0f0f0;
    color: #333;
    border: none;
    border-radius: 4px;
    padding: 10px 15px;
    cursor: pointer;
    font-size: 14px;
    min-width: 120px;
    text-align: left;
    transition: background-color 0.3s ease, box-shadow 0.3s ease;
  }

  .picker-button:hover {
    background-color: #e0e0e0;
  }

  .picker-button.open {
    background-color: #ffffff;
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }

  .picker-content {
    position: absolute;
    top: calc(100% - 5px);
    left: 0;
    background-color: #ffffff;
    min-width: 100%;
    border-top: none;
    border-radius: 0 0 4px 4px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    z-index: 10;
    overflow: hidden;
  }

  .picker-item {
    padding: 10px 15px;
    cursor: pointer;
    transition: background-color 0.2s ease;
  }

  .picker-item:hover {
    background-color: #f5f5f5;
  }
</style>
