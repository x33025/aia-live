<script lang="ts">
  import { onMount, tick, createEventDispatcher } from 'svelte';
  import { openDropdownId, openDropdown, closeDropdown } from '$lib/stores/ui/+dropdown-menu';


  let menuTop = 0;
  let menuRight = 0;
  let isOpen = false;
  export let id: string;
  export let placeholder: string = 'Select an option';
  export let selectedOption: string | null = null;

  let unsubscribe = openDropdownId.subscribe(value => {
    isOpen = value === id;
  });

  function toggleMenu(event: MouseEvent) {
    if (isOpen) {
      closeDropdown();
    } else {
      openDropdown(id);
      positionMenu(event);
    }
  }

  function handleClickOutside(event: MouseEvent) {
    const target = event.target as Element | null;
    if (target && !target.closest(`.menu-button-${id}`) && !target.closest(`.menu-content`)) {
      closeDropdown();
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

  onMount(() => {
    document.addEventListener('click', handleClickOutside, true);
    return () => {
      document.removeEventListener('click', handleClickOutside, true);
      unsubscribe();
    };
  });
</script>

<button class={`menu-button-${id}`} on:click={toggleMenu}>
  <slot name="button">
    {selectedOption || placeholder}
  </slot>
</button>

{#if isOpen}
  <div class="stack menu-content" style="--align: flex-start; --justify: flex-start; top: {menuTop}px; right: {menuRight}px;">
    <slot />
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
    display: flex;
    flex-direction: column;
    padding: 0.25em;
    margin-top: 0.35em;
    max-height: 25em;
    overflow-y: auto;
  }
</style>
