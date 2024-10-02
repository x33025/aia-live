<script lang="ts">
  import NumericInput from '$lib/core/advanced-input/+numeric-input.svelte';
  import DropdownMenu from '$lib/core/actions/+dropdown-menu.svelte';
  import TextInput from '$lib/core/actions/+text-input.svelte';
  import { type Country, type Keyword } from '$lib/types';
  import NotesButton from '../notes/+notes-button.svelte';
  import { updateKeyword } from '$lib/api/keyword/+update-keyword';

  export let keyword: Keyword;
  export let countries: Country[] = [];

  $: selectedCountry = keyword.country ? countries.find(c => c.id === keyword.country) : null;

  function selectCountry(country: Country) {
    selectedCountry = country;
    updateKeyword(keyword.id, { country: country.id }); // Direct call to updateKeyword
  }

  function handleKeywordEnter(event: CustomEvent) {
    const newValue = event.detail.value;
    updateKeyword(keyword.id, { keyword: newValue }); // Direct call to updateKeyword
  }

  function handleVolumeChange(event: CustomEvent) {
    const newVolume = event.detail.value;
    updateKeyword(keyword.id, { volume: newVolume }); // Direct call to updateKeyword
  }

  function handleDensityChange(event: CustomEvent) {
    const newDensity = event.detail.value;
    updateKeyword(keyword.id, { density: newDensity }); // Direct call to updateKeyword
  }

  function handleEvergreenToggle() {
    const newEvergreenState = !keyword.evergreen;
    updateKeyword(keyword.id, { evergreen: newEvergreenState }); // Direct call to updateKeyword
  }

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


  $: sortedCountries = countries.slice().sort((a, b) => {
  if (a.name === "Global") return -1; // Global first
  if (b.name === "Global") return 1;
  if (a.name === "US") return -1; // US first
  if (b.name === "US") return 1;
  if (a.name === "UK") return -1; // UK second
  if (b.name === "UK") return 1;
  return a.name.localeCompare(b.name); // Sort the rest alphabetically
});

</script>

<tr>
  <td>
    <TextInput
      value={keyword.keyword}
      placeholder="Enter keyword"
      on:enter={handleKeywordEnter}
    />
  </td>
  <td>
    <input
      type="checkbox"
      checked={keyword.evergreen}
      on:change={handleEvergreenToggle}
    />
  </td>
  <td>
    <DropdownMenu 
      id={`country-dropdown-${keyword.id}`}
      selectedOption={selectedCountry?.id}
    >
      <svelte:fragment slot="button">
        {selectedCountry ? `${selectedCountry.name} ${getFlagEmoji(selectedCountry.name)}` : 'Select a country'}
      </svelte:fragment>

      <svelte:fragment let:selectOption>
        {#each sortedCountries as country}
          <div class="stack menu-item" style="--direction: row; --align: center;" on:click={() => { selectOption(country.id); selectCountry(country); }}>
            {country.name} 
            <spacer />
            {getFlagEmoji(country.name)}
          </div>
        {/each}
      </svelte:fragment>
    </DropdownMenu>
  </td>
  <td>
    <NumericInput
      value={keyword.volume}
      on:update={handleVolumeChange}
    />
  </td>
  <td>
    <NumericInput
      value={keyword.density}
      on:update={handleDensityChange}
    />
  </td>
  <td>
    <NotesButton
      notes={keyword.expand?.notes}
      activity={keyword.expand?.activity}
      parent={keyword}
      parent_collection="keywords"
    />
  </td>
</tr>

<style>
  :global(.keyword-input) {
    padding: var(--default-padding);
  }
  td {
    padding: 0.5em;
    text-align: left;
    border-bottom: 1px solid #ddd;
  }
  .menu-item {
    padding: var(--default-padding);
    cursor: pointer;
    border-radius: 0.3em;
    width: 100%;
  }
  .menu-item:hover {
    background-color: var(--gray-1);
  }
  tr:nth-child(even) {
    background-color: var(--gray-1); /* Light gray background for even rows */
  }
</style>
