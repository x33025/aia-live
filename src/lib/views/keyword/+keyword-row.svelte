<script lang="ts">
  import { debounce } from 'lodash-es';
  import NumericInput from '$lib/components/advanced-input/+numeric-input.svelte';
  import Keyword from './+keyword.svelte';
  import Picker from '$lib/components/actions/picker/+picker.svelte';

  export let keyword: KeywordWithRelations;
  export let countries: Country[];

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

  function handleCountrySelect(event: CustomEvent<MenuItem | null>) {
    const selectedCountry = event.detail;
    const selectedCountryId = selectedCountry ? selectedCountry.id : null;
    updateKeyword(keyword.id, { country_id: selectedCountryId });
  }

  $: countryOptions = countries.map(country => ({ id: country.id, label: country.name }));
</script>

<tr>
  <td>
    <Keyword
      keyword={keyword} 
      on:keywordChange={(event) => handleKeywordChange(event.detail.value, keyword.id)}
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
      options={countryOptions}
      selectedOption={countryOptions.find(option => option.id === keyword.country_id) || null}
      placeholder="Select a country" 
      on:select={handleCountrySelect}
      maxItemDisplayed={3}
    />
  </td>
  <td>
    <NumericInput value={keyword.volume} on:update={(event) => handleVolumeChange(event, keyword.id)} />
  </td>
  <td>
    <NumericInput value={keyword.keyword_density} on:update={(event) => handleDensityChange(event, keyword.id)} />
  </td>
</tr>

<style>
  td {
    padding: 8px;
    text-align: left;
    border-bottom: 1px solid #ddd;
  }
</style>
