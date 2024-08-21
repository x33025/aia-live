<script lang="ts">
  import { onMount, tick, createEventDispatcher } from 'svelte';
  import { openDropdownId, openDropdown, closeAllDropdowns } from '$lib/stores/ui/+dropdown-menu';
  import { get } from 'svelte/store'; // To read store value synchronously
  
  const dispatch = createEventDispatcher();

  let menuTop = 0;
  let menuRight = 0;
  let isOpen = false;

  export let id: string;
  export let placeholder: string = 'Select an option';
  export let selectedOption: string | null = null;

  // Subscribe to the store
  let unsubscribe = openDropdownId.subscribe(value => {
    isOpen = value === id; // Set isOpen based on the current dropdown ID
  });

  function toggleMenu(event: MouseEvent) {
    if (isOpen) {
      closeAllDropdowns(); // Close the dropdown if it's already open
    } else {
      openDropdown(id); // Open the dropdown if it's not open
      positionMenu(event);
    }
  }

  function handleClickOutside(event: MouseEvent) {
    const target = event.target as Element | null;
    if (target && !target.closest(`.menu-button-${id}`) && !target.closest(`.menu-content`)) {
      closeAllDropdowns(); // Close if clicking outside the dropdown
    }
  }

  async function positionMenu(event: MouseEvent) {
    await tick();
    const buttonRect = (event.target as Element).getBoundingClientRect();
    if (buttonRect) {
      menuTop = buttonRect.bottom;
      menuRight = window.innerWidth - buttonRect.right;
    }
  }

  function selectOption(option: string) {
    selectedOption = option; // Update the selected option
    closeAllDropdowns(); // Close the dropdown after selecting
    dispatch('select', { id, selectedOption }); // Dispatch a custom select event
  }

  // On mount, add event listener for outside clicks
  onMount(() => {
    document.addEventListener('click', handleClickOutside, true);
    return () => {
      document.removeEventListener('click', handleClickOutside, true);
      unsubscribe(); // Unsubscribe from store when component is destroyed
    };
  });
</script>

<button class={`menu-button-${id}`} on:click={toggleMenu}>
  <slot name="button">
    {selectedOption || placeholder}
  </slot>
</button>

{#if isOpen}
  <div class="menu-content" style="top: {menuTop}px; right: {menuRight}px;">
    <slot {selectOption}></slot>
  </div>
{/if}

<style>
  .menu-content {
    background-color: #ffffff;
    border: 1px solid #ccc;
    border-radius: 0.5em;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    position: fixed;
    z-index: 9999;
    flex-direction: column;
    padding: 0.25em;
    margin-top: 0.35em;
  }
</style>
