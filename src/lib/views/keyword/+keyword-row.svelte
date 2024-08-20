<script lang="ts">
  import NumericInput from '$lib/components/advanced-input/+numeric-input.svelte';
  import Picker from '$lib/components/actions/+dropdown-picker.svelte';
  import Input from '$lib/components/actions/+input.svelte';
  import { TextType, type Country, type Keyword } from '$lib/types';
  import { onMount, onDestroy } from 'svelte';

  export let keyword: Keyword;
  export let countries: Country[] = [];
  export let updateKeyword: (id: string, updatedFields: object) => void;

  let selectedCountry: Country | null = keyword.country || null;

  onMount(() => {
    console.log(`VIEW_KEYWORDS: Component mounted for keyword: ${JSON.stringify(keyword)}`);
  });

  onDestroy(() => {
    console.log(`VIEW_KEYWORDS: Component destroyed for keyword: ${keyword.keyword}`);
  });

  // Sync selected country with the keyword's country
  $: selectedCountry = keyword.country || null;

  function handleCountrySelect(event: CustomEvent<string | null>) {
    const selectedCountryId = event.detail;

    // Find the corresponding Country object based on the selected ID
    selectedCountry = countries.find(country => country.id === selectedCountryId) || null;
    
    // Update the keyword with the selected country's ID
    updateKeyword(keyword.id, { country: selectedCountryId });
  }

  function handleKeywordEnter(event: CustomEvent) {
    const newValue = event.detail.value;
    console.log(`VIEW_KEYWORDS: Keyword changed from "${keyword.keyword}" to "${newValue}"`);
    updateKeyword(keyword.id, { keyword: newValue });
  }

  function handleVolumeChange(event: CustomEvent) {
    const newVolume = event.detail.value;
    updateKeyword(keyword.id, { volume: newVolume });
  }

  function handleDensityChange(event: CustomEvent) {
    const newDensity = event.detail.value;
    updateKeyword(keyword.id, { density: newDensity });
  }

  function handleEvergreenToggle() {
    const newEvergreenState = !keyword.evergreen;
    updateKeyword(keyword.id, { evergreen: newEvergreenState });
  }
</script>


<tr>
  <!-- Text Input for Keyword -->
  <td>
    <Input
      value={keyword.keyword}
      placeholder="Enter keyword"
      on:enter={handleKeywordEnter}
      className="keyword-input"
    />
  </td>

  <!-- Checkbox for Evergreen -->
  <td>
    <input
      type="checkbox"
      checked={keyword.evergreen}
      on:change={handleEvergreenToggle}
    />
  </td>

  <!-- Picker for Country Selection -->
  <td>
    <Picker
      options={countries}
      selection={selectedCountry}
      placeholder="Select a country"
      on:select={handleCountrySelect}
      maxItemsDisplayed={5}
    />
  </td>
  

  <!-- Numeric Input for Volume -->
  <td>
    <NumericInput
      value={keyword.volume} 
      on:update={handleVolumeChange}
    />
  </td>

  <!-- Numeric Input for Density -->
  <td>
    <NumericInput
      value={keyword.density}
      on:update={handleDensityChange}
    />
  </td>
</tr>

<style>

  :global(.keyword-input) {
    background-color: var(--gray-1);
    border-radius: 0.5em;
    padding: 0.5em;
  }
  td {
    padding: 0.3em;
    text-align: left;
    border-bottom: 1px solid #ddd;
  }
</style>
