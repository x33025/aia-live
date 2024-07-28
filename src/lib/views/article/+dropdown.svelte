<script lang="ts">
  import { createEventDispatcher } from 'svelte';

  export let items: { id: string | null, name: string | null | undefined }[] = [];
  export let selected: string | null = null;
  export let placeholder: string = 'Select an option';
  export let fallbackName: string = 'Unnamed';

  const dispatch = createEventDispatcher();

  function selectItem(itemId: string | null) {
    selected = itemId;
    dispatch('select', itemId);
    dropdownOpen = false;
  }

  let dropdownOpen = false;

  function toggleDropdown() {
    dropdownOpen = !dropdownOpen;
  }

  function handleKeydown(event: KeyboardEvent) {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      toggleDropdown();
    }
  }
</script>

<div class="dropdown">
  <button 
    type="button" 
    class="dropdown-trigger hstack" 
    on:click={toggleDropdown} 
    on:keydown={handleKeydown} 
    aria-haspopup="listbox" 
    aria-expanded={dropdownOpen}>
    <span>{selected ? (items.find(item => item.id === selected)?.name || fallbackName) : placeholder}</span>
    <span class="dropdown-chevron">›</span>
  </button>
  {#if dropdownOpen}
    <ul class="dropdown-menu vstack" role="listbox">
      <li role="option" aria-selected={selected === null}>
        <button type="button" class="dropdown-item" on:click={() => selectItem(null)}>None</button>
      </li>
      {#each items as item}
        <li role="option" aria-selected={selected === item.id}>
          <button type="button" class="dropdown-item" on:click={() => selectItem(item.id)}>
            {item.name || fallbackName}
          </button>
        </li>
      {/each}
    </ul>
  {/if}
</div>

<style>
  .dropdown {
    position: relative;
    display: inline-block;
    min-width: 150px; /* Ensure the dropdown has a minimum width */
  }

  .dropdown-trigger {
    background-color: var(--gray-1);
    border-radius: 0.5em;
    padding: 0.3em 0.5em; /* Adjust padding to reduce height */
    cursor: pointer;
    min-width: 150px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .dropdown-chevron {
    font-size: 1.2em; /* Adjust font size if needed */
    transform: rotate(90deg);
    padding-left: 0.3em;
  }

  .dropdown-menu {
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background-color: white;
    border: 1px solid #ddd;
    border-radius: 0.5em;
    margin-top: 0.3em; /* Adjust margin to control space */
    z-index: 1000;
    padding: 0.5em;
    list-style: none;
    margin: 0;
    padding: 0;
  }

  .dropdown-item {
    padding: 0.5em;
    cursor: pointer;
    width: 100%;
    text-align: left;
    background: none;
    border: none;
  }

  .dropdown-item:hover {
    background-color: #f0f0f0;
  }

  .hstack {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .vstack {
    display: flex;
    flex-direction: column;
  }
</style>
