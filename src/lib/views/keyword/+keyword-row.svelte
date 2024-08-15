<script lang="ts">
  import NumericInput from '$lib/components/advanced-input/+numeric-input.svelte';
  import Picker from '$lib/components/actions/+dropdown-menu.svelte';
  import Input from '$lib/components/actions/+input.svelte';
  import { TextType } from '$lib/types';
  import { onMount, onDestroy } from 'svelte';
 
  export let keyword: Keyword;
  export let countries: Country[] = [];
  export let updateKeyword: (id: string, updatedFields: object) => void;
 
  // selectedCountry is the string country ID, not the object
  let selectedCountry: string | null = keyword.country || null;
 
  onMount(() => {
    console.log(`VIEW_KEYWORDS: Component mounted for keyword: ${keyword.keyword}`);
  });
 
  onDestroy(() => {
    console.log(`VIEW_KEYWORDS: Component destroyed for keyword: ${keyword.keyword}`);
  });

  // Ensure selectedCountry is updated when keyword.country changes
  $: selectedCountry = keyword.country || null;

  function handleCountrySelect(event: CustomEvent<Identifiable | null>) {
    const selectedCountry = event.detail;
    const selectedCountryId = selectedCountry ? selectedCountry.id : null;
    console.log(`VIEW_KEYWORDS: Country selected for keyword ${keyword.keyword}:`, selectedCountryId);
    
    // Update keyword.country with the selected country ID
    updateKeyword(keyword.id, { country: selectedCountryId });
  }
 
  function handleKeywordChange(event: CustomEvent) {
    const newValue = event.detail.value;
    console.log(`VIEW_KEYWORDS: Keyword changed from "${keyword.keyword}" to "${newValue}"`);
    updateKeyword(keyword.id, { keyword: newValue });
  }
 
  function handleVolumeChange(event: CustomEvent, id: string) {
    const newVolume = event.detail.value;
    console.log(`VIEW_KEYWORDS: Volume changed for keyword ${keyword.keyword}:`, newVolume);
    updateKeyword(id, { volume: newVolume });
  }
 
  function handleDensityChange(event: CustomEvent, id: string) {
    const newDensity = event.detail.value;
    console.log(`VIEW_KEYWORDS: Density changed for keyword ${keyword.keyword}:`, newDensity);
    updateKeyword(id, { density: newDensity });
  }
 
  function handleEvergreenToggle(id: string) {
    const newEvergreenState = !keyword.evergreen;
    console.log(`VIEW_KEYWORDS: Evergreen toggled for keyword ${keyword.keyword}:`, newEvergreenState);
    updateKeyword(id, { evergreen: newEvergreenState });
  }
</script>

<!-- Updated Country Dropdown (Picker) -->
<tr>
  <td>
    <Input
      type={TextType.Body}
      value={keyword.keyword}
      placeholder="Enter keyword"
      on:input={(event) => handleKeywordChange(event)}
    />
  </td>
  <td>
    <input
      type="checkbox"
      checked={keyword.evergreen}
      on:change={() => handleEvergreenToggle(keyword.id)}
    />
  </td>
  <td>
    <Picker
      options={countries}
      selection={countries.find(c => c.id === selectedCountry) || null}
      placeholder="Select a country"
      on:select={handleCountrySelect}
      maxItemsDisplayed={5}
    />
  </td>
  <td>
    <NumericInput value={keyword.volume} on:update={(event) => handleVolumeChange(event, keyword.id)} />
  </td>
  <td>
    <NumericInput value={keyword.density} on:update={(event) => handleDensityChange(event, keyword.id)} />
  </td>
</tr>

<style>
  td {
    padding: 8px;
    text-align: left;
    border-bottom: 1px solid #ddd;
  }
</style>
