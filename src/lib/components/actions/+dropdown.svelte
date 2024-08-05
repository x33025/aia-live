<script lang="ts">
    import { createEventDispatcher, onMount } from 'svelte';
    import { writable } from 'svelte/store';
    import { activeDropdown } from '$lib/stores/+dropdown';
    import { slide } from 'svelte/transition';
  
    export let options: DropdownOption[] = [];
    export let selectedOptionId: string | number | null = null;
    export let placeholder: string = 'Select an option';
    export let maxItemDisplayed: number = 3;
    export let dropdownId: string = Math.random().toString(36).substr(2, 9);
    export let allowNilSelection: boolean = true;
  
    const dispatch = createEventDispatcher();
    const showDropdown = writable(false);
    let dropdownElement: HTMLDivElement;
  
    function selectOption(id: string | number | null) {
        selectedOptionId = id;
        showDropdown.set(false);
        dispatch('select', id);
    }
  
    function toggleDropdown() {
        showDropdown.update(value => !value);
        if ($showDropdown) {
            activeDropdown.set(dropdownId);
        }
    }
  
    function handleClickOutside(event: MouseEvent) {
        if (dropdownElement && !dropdownElement.contains(event.target as Node)) {
            showDropdown.set(false);
        }
    }
  
    onMount(() => {
        document.addEventListener('click', handleClickOutside, true);
        const unsubscribe = activeDropdown.subscribe(id => {
            if (id !== dropdownId) {
                showDropdown.set(false);
            }
        });
        return () => {
            unsubscribe();
            document.removeEventListener('click', handleClickOutside, true);
        };
    });
  
    $: selectedOption = options.find(option => option.id === selectedOptionId);
  </script>
  
  <style>
    .dropdown-container {
      position: relative;
      display: inline-block;
      width: 100%;
      max-width: 400px; /* Set the maximum width */
    }
    
    .dropdown-trigger {
      background-color: var(--gray-1);
      border-radius: 0.5em;
      padding: 0.3em 0.5em;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 100%;
      max-width: 400px; /* Set the maximum width */
      transition: background-color 0.2s;
    }
    
    .dropdown-trigger:hover {
      background-color: var(--gray-2);
    }
    
    .dropdown-menu {
      position: absolute;
      top: 100%;
      left: 0; /* Adjusted to align with the dropdown trigger */
      background-color: rgba(255, 255, 255, 0.7); /* Adjusted for better visibility */
      border: 1px solid #ddd;
      border-radius: 0.5em;
      margin-top: 0.3em;
      z-index: 1000;
      max-height: calc(3 * var(--button-height));
      overflow-y: auto;
      box-sizing: border-box;
      width: 100%;
      max-width: 400px; /* Set the maximum width */
      display: flex;
      flex-direction: column;
      backdrop-filter: blur(0.2rem); /* Apply blur effect to the background */
    }
    
    .dropdown-item {
      margin: 0.3em;
      padding: 0.25em 0.5em;
      border-radius: 0.25em;
      cursor: pointer;
      text-align: left;
      white-space: nowrap;
      width: 100%;
      max-width: calc(100% - 0.6em); /* Ensure items stay within the menu */
      box-sizing: border-box; /* Include padding and borders in the width calculation */
    }
    
    .dropdown-item:hover {
      background-color: var(--gray-1);
    }
  </style>
  
  <div class="dropdown-container" bind:this={dropdownElement}>
    <button type="button" class="dropdown-trigger" on:click={toggleDropdown} aria-haspopup="listbox" aria-expanded={$showDropdown}>
      <span>{selectedOption ? selectedOption.name : placeholder}</span>
    </button>
    {#if $showDropdown}
      <div class="dropdown-menu vstack" transition:slide={{ duration: 200 }}>
        {#if allowNilSelection}
          <div class="dropdown-item" on:click={() => selectOption(null)}>
            None
            {selectedOptionId === null ? ' ✓' : ''}
          </div>
        {/if}
        {#each options as option (option.id)}
          <div class="dropdown-item" on:click={() => selectOption(option.id)}>
            {option.name}
            {selectedOptionId === option.id ? ' ✓' : ''}
          </div>
        {/each}
      </div>
    {/if}
  </div>
  