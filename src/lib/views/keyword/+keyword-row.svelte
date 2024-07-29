<script lang="ts">
  import { debounce } from 'lodash-es';
  import Dropdown from '$lib/components/actions/+dropdown.svelte';
  import NumericInput from '$lib/components/input/+numeric-input.svelte';

  import type { Country } from '@prisma/client';

  export let keyword: KeywordWithData;
  export let countries: Country[] = [];

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

  function handleCountrySelect(event: CustomEvent<string | number>) {
    const selectedCountryId = event.detail;
    updateKeyword(keyword.id, { country_id: selectedCountryId });
  }

  const countryOptions: DropdownOption[] = countries.map(country => ({ id: country.id, name: country.name }));
</script>

<tr>
  <td>
    <input
      type="text"
      value={keyword.keyword.toLowerCase()}
      autocomplete="off"
      autocorrect="off"
      on:input={(event) => handleKeywordChange(event, keyword.id)}
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
    <Dropdown 
      options={countryOptions}
      selectedOptionId={keyword.country_id}
      placeholder="Select a country"
      on:select={handleCountrySelect}
      menuWidth={150}
      buttonHeight={50}
      maxItemDisplayed={3}
      dropdownId={`country-dropdown-${keyword.id}`}
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
