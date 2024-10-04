<script lang="ts">
  import NumericInput from '$lib/core/advanced-input/+numeric-input.svelte';
  import DropdownMenu from '$lib/core/actions/+dropdown-menu.svelte';
  import TextInput from '$lib/core/actions/+text-input.svelte';
  import { type Country, type Keyword } from '$lib/types';
  import NotesButton from '../notes/+notes-button.svelte';
  import { updateKeyword } from '$lib/api/keyword/+update-keyword';
  import CountryDropdown from '../actions/+country-dropdown.svelte';
  import { countries } from '$lib/stores/data/+countries';

  export let keyword: Keyword;

  $: selectedCountry = keyword.country ? $countries.filter(c => c.id === keyword.country)[0] : null;

  function selectCountry(country: Country) {
    console.log("selectCountry", country);
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


</script>

<tr>
  <td style="width: 30%; padding-left: 2em;">
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
   <CountryDropdown
   selectedCountry={selectedCountry}
   on:countrySelected={(e) => selectCountry(e.detail.country)}
   />
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
 
  }

  tr:nth-child(even) {
    background-color: var(--gray-1); /* Light gray background for even rows */
  }
</style>
