<!-- src/routes/keywords/KeywordRow.svelte -->
<script lang="ts">
  import { createEventDispatcher, onMount, onDestroy } from 'svelte';
  import { page } from '$app/stores';
  import { derived, get } from 'svelte/store';
  import type { Country } from '@prisma/client';
  import { openDropdownId } from '$lib/stores/+country-dropdown';

  export let keyword: KeywordWithData;

  const countries = derived(page, $page => $page.data.countries as Country[]);
  const dispatch = createEventDispatcher();

  let selectedCountry: Country | null = keyword.country || null;
  let dropdownElement: HTMLDivElement | null = null;

  function selectCountry(country: Country | null) {
    selectedCountry = country;
    dispatch('select', { keywordId: keyword.id, country });
    closeDropdown();
  }

  function openDropdown() {
    const currentDropdownId = get(openDropdownId);
    if (currentDropdownId === keyword.id) {
      closeDropdown();
    } else {
      openDropdownId.set(keyword.id);
    }
  }

  function closeDropdown() {
    openDropdownId.set(null);
  }

  $: isOpen = get(openDropdownId) === keyword.id;

  function handleKeydown(event: KeyboardEvent, country: Country | null) {
    if (event.key === 'Enter' || event.key === ' ') {
      selectCountry(country);
    }
  }

  function handleClickOutside(event: MouseEvent) {
    if (dropdownElement && !dropdownElement.contains(event.target as Node)) {
      closeDropdown();
    }
  }

  onMount(() => {
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  });
</script>

<style>
  .dropdown {
    position: relative;
    display: inline-block;
    width: 200px;
  }

  .dropdown-button {
    width: 100%;
    padding: 0.5em;
    background-color: var(--gray-1);
    border-radius: 0.5em;
    cursor: pointer;
    text-align: left;
  }

  .dropdown-content {
    display: none;
    position: absolute;
    background-color: #f9f9f9;
    width: 100%;
    box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
    z-index: 10;
    max-height: 250px;
    overflow-y: auto;
  }

  .dropdown-content button {
    width: 100%;
    padding: 1em;
    text-align: left;
    border: none;
    background: none;
    cursor: pointer;
  }

  .dropdown-content button:hover {
    background-color: #f1f1f1;
  }

  .dropdown.open .dropdown-content {
    display: block;
  }
</style>

<div class="dropdown" bind:this={dropdownElement} class:open={isOpen}>
  <button type="button" class="dropdown-button" on:click={openDropdown} aria-haspopup="listbox">
    {selectedCountry ? selectedCountry.name : 'Select a Country'}
  </button>
  <div class="dropdown-content" role="listbox">
    <button
      type="button"
      role="option"
      aria-selected={selectedCountry === null}
      on:click={() => selectCountry(null)}
      on:keydown={(event) => handleKeydown(event, null)}
    >
      None
    </button>
    {#each $countries as country}
      <button
        type="button"
        role="option"
        aria-selected={selectedCountry && selectedCountry.id === country.id}
        on:click={() => selectCountry(country)}
        on:keydown={(event) => handleKeydown(event, country)}
      >
        {country.name}
      </button>
    {/each}
  </div>
</div>
