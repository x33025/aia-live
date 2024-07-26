<script lang="ts">
  import { debounce } from 'lodash-es';
  import NumericInput from '$lib/views/input/+numeric-input.svelte';
  import CountryDropdown from '$lib/views/keyword/+country-dropdown.svelte';

  import type { Country, GetInfo } from '@prisma/client';
  type KeywordWithCountry = {
    id: string;
    keyword: string;
    evergreen: boolean;
    volume: number;
    keyword_density: number;
    country: Country | null;
    get_info: GetInfo;
  };

  export let keyword: KeywordWithCountry;
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

  function handleCountrySelect(event: CustomEvent) {
    const selectedCountry: Country | null = event.detail;
    updateKeyword(keyword.id, { countryId: selectedCountry ? selectedCountry.id : null });
  }
</script>

<tr>
  <td></td>
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
    <CountryDropdown {countries} id={`dropdown-${keyword.id}`} on:select={handleCountrySelect} />
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
