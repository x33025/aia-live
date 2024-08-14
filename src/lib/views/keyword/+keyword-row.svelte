<script lang="ts">
  import { debounce } from 'lodash-es';
  import NumericInput from '$lib/components/advanced-input/+numeric-input.svelte';
  import Picker from '$lib/components/actions/+dropdown-menu.svelte';
  import { onMount } from 'svelte';

  export let keyword: Keyword;
  export let countries: Country[] = [];

  console.log('Rendering keyword:', keyword);

  interface Identifiable {
    id: number | string;
    name: string;
  }

  const updateKeyword = debounce(async (id: string, updatedFields: object) => {
    const response = await fetch('/protected/keywords', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id, ...updatedFields }),
    });
    if (!response.ok) {
      console.error('Failed to update keyword');
    }
  }, 300);

  function handleKeywordChange(event: Event, id: string) {
    const input = event.target as HTMLInputElement;
    input.value = input.value.toLowerCase();
    updateKeyword(id, { keyword: input.value });
  }

  function handleVolumeChange(event: CustomEvent, id: string) {
    updateKeyword(id, { volume: event.detail.value });
  }

  function handleDensityChange(event: CustomEvent, id: string) {
    updateKeyword(id, { keyword_density: event.detail.value });
  }

  function handleEvergreenToggle(id: string) {
    updateKeyword(id, { evergreen: !keyword.evergreen });
  }

  // function handleCountrySelect(event: CustomEvent<Identifiable | null>) {
  //   const selectedCountry = event.detail;
  //   const selectedCountryId = selectedCountry ? selectedCountry.id : null;
  //   updateKeyword(keyword.id, { country_id: selectedCountryId });
  // }

</script>

<tr>
  <td>
   {keyword.keyword}
  </td>
  <td>
    <input
      type="checkbox"
      checked={keyword.evergreen}
      on:change={() => handleEvergreenToggle(keyword.id)}
    />
  </td>
  <td>
    <!-- <Picker 
      options={countryOptions}
      selection={selectedOption}
      placeholder="Select a country" 
      on:select={handleCountrySelect}
      maxItemsDisplayed={5}
    /> -->

    {keyword.country}
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
