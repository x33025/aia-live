<script lang="ts">
    import { createEventDispatcher, onMount, onDestroy } from 'svelte';
    import { writable } from 'svelte/store';
    import { activeDropdown } from '$lib/stores/+dropdown';

    export let options: DropdownOption[] = [];
    export let selectedOptionId: string | number | null = null;
    export let placeholder: string = 'Select an option';
    export let menuWidth: number = 150;
    export let buttonHeight: number = 50;
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
  .dropdown {
    position: relative;
    display: inline-block;
    min-width: 150px;
  }
  .dropdown-trigger {
    background-color: var(--gray-1);
    border-radius: 0.5em;
    padding: 0.3em 0.5em;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .dropdown-chevron {
    font-size: 1.2em;
    transform: rotate(0deg);
    transition: transform 0.2s;
    margin: 0 0.5em;
  }
  .dropdown-chevron.open {
    transform: rotate(180deg);
  }
  .dropdown-menu {
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background-color: white;
    border: 1px solid #ddd;
    border-radius: 0.5em;
    margin-top: 0.3em;
    z-index: 1000;
    max-height: calc(3 * var(--button-height));
    overflow-y: auto;
  }
  .dropdown-item {
    padding: 0.5em;
    cursor: pointer;
    text-align: left;
  }
  .dropdown-item:hover {
    background-color: #f0f0f0;
  }
  .vstack {
    display: flex;
    flex-direction: column;
  }
</style>

<div class="dropdown" bind:this={dropdownElement}>
  <button type="button" class="dropdown-trigger" on:click={toggleDropdown} aria-haspopup="listbox" aria-expanded={$showDropdown}>
    <span>{selectedOption ? selectedOption.name : placeholder}</span>
    <span class="dropdown-chevron" class:open={$showDropdown}>›</span>
  </button>
  {#if $showDropdown}
    <div class="dropdown-menu vstack">
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
