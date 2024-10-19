<script lang="ts">
    import {DropdownMenu} from '@x33025/components';
    import type { Country } from '$lib/types';
    import { v4 as uuidv4 } from 'uuid';
    import { createEventDispatcher } from 'svelte'; // Import the dispatcher
    import { countries } from '$lib/stores/data/+countries';
    import { closeDropdown } from '@x33025/components';

    export let selectedCountry: Country | null = null;

    const dispatch = createEventDispatcher(); // Create the dispatcher

    function getFlagEmoji(countryCode: string) {
        if (countryCode === "Global") {
            return "🌍"; // Globe emoji for Global
        }
        if (countryCode === "UK") {
            countryCode = "GB"; // Correct UK to GB
        }
        const codePoints = countryCode
            .toUpperCase()
            .split('')
            .map(char => 127397 + char.charCodeAt(0));
        return String.fromCodePoint(...codePoints);
    }



    function selectCountry(country: Country) {
        console.log("selectCountry", country);
        selectedCountry = country;
        dispatch('countrySelected', { country }); // Dispatch the event
        closeDropdown();
    }




    $: sortedCountries = $countries.slice().sort((a, b) => {
        if (a.name === "Global") return -1; // Global first
        if (b.name === "Global") return 1;
        if (a.name === "US") return -1; // US first
        if (b.name === "US") return 1;
        if (a.name === "UK") return -1; // UK second
        if (b.name === "UK") return 1;
        return a.name.localeCompare(b.name); // Sort the rest alphabetically
    });
</script>




<DropdownMenu 
>
<svelte:fragment slot="button">
  {selectedCountry ? `${selectedCountry.name} ${getFlagEmoji(selectedCountry.name)}` : 'Select a country'}
</svelte:fragment>

<svelte:fragment>
  {#each sortedCountries as country}
    <button class="stack menu-item" style="--direction: row; --align: center;" on:click={() => selectCountry(country)}>
      {country.name} 
      <div class="spacer" />
      {getFlagEmoji(country.name)}
    </button>
  {/each}
</svelte:fragment>
</DropdownMenu>

<style>
      .menu-item {
    padding: var(--default-padding);
    cursor: pointer;
    border-radius: 0.3em;
    width: 100%;
  }
  .menu-item:hover {
    background-color: var(--gray-1);
  }
</style>