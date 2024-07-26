<script lang="ts">
    import { createEventDispatcher } from 'svelte';
    import { writable } from 'svelte/store';
    import type { Country } from '@prisma/client';
  
    export let countries: Country[] = [];
    export let id: string;
  
    let selectedCountry: Country | null = null;
    const dispatch = createEventDispatcher();
    const openDropdownId = writable<string | null>(null);
  
    function selectCountry(country: Country | null) {
      selectedCountry = country;
      dispatch('select', country);
      closeDropdown();
    }
  
    function openDropdown() {
      openDropdownId.set(id);
    }
  
    function closeDropdown() {
      openDropdownId.set(null);
    }
  
    $: isOpen = $openDropdownId === id;
  
    function handleKeydown(event: KeyboardEvent, country: Country | null) {
      if (event.key === 'Enter' || event.key === ' ') {
        selectCountry(country);
      }
    }
  </script>
  
  <style>
    .dropdown {
      position: relative;
      display: inline-block;
      width: 200px;
    }
  
    .dropdown-button {
      width: 100%;
      padding: 10px;
      font-size: 16px;
      border: 1px solid #ccc;
      border-radius: 5px;
      background-color: white;
      cursor: pointer;
      text-align: left;
    }
  
    .dropdown-content {
      display: none;
      position: absolute;
      background-color: #f9f9f9;
      width: 100%;
      box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
      z-index: 1;
      max-height: 200px;
      overflow-y: auto;
    }
  
    .dropdown-content button {
      width: 100%;
      padding: 12px 16px;
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
  
  <div class="dropdown" class:open={isOpen}>
    <button type="button" class="dropdown-button" on:click={openDropdown} aria-haspopup="listbox">
      {selectedCountry ? selectedCountry.name : 'Select a country'}
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
      {#each countries as country}
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
  