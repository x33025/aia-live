<script lang="ts">
  import { debounce } from 'lodash-es';
  import NumericInput from '$lib/views/input/+numeric-input.svelte';
  import CountryDropdown from '$lib/views/keyword/+country-dropdown.svelte';
  import type { Country } from '@prisma/client';

  export let keyword: KeywordWithData;
  export let countries: Country[];

  const updateKeyword = debounce(async (id: string, updatedFields: object) => {
    console.log(`Updating keyword ${id} with fields:`, updatedFields); // Logging the update fields
    const response = await fetch('/protected/keywords', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id, ...updatedFields }),
    });

    if (!response.ok) {
      console.error('Failed to update keyword');
    } else {
      console.log(`Successfully updated keyword ${id}`);
    }
  }, 300);

  function handleKeywordChange(event: Event, id: string) {
    const input = event.target as HTMLInputElement;
    input.value = input.value.toLowerCase();
    console.log(`Keyword changed to: ${input.value}`); // Logging keyword change
    updateKeyword(id, { keyword: input.value });
  }

  function handleVolumeChange(event: CustomEvent, id: string) {
    console.log(`Volume changed to: ${event.detail.value}`); // Logging volume change
    updateKeyword(id, { volume: event.detail.value });
  }

  function handleDensityChange(event: CustomEvent, id: string) {
    console.log(`Keyword density changed to: ${event.detail.value}`); // Logging density change
    updateKeyword(id, { keyword_density: event.detail.value });
  }

  function handleEvergreenToggle(id: string) {
    console.log(`Evergreen toggled to: ${!keyword.evergreen}`); // Logging evergreen toggle
    updateKeyword(id, { evergreen: !keyword.evergreen });
  }

  function handleCountrySelect(event: CustomEvent) {
    const selectedCountry: Country | null = event.detail;
    console.log(`Country selected:`, selectedCountry); // Logging country selection
    updateKeyword(keyword.id, { country: selectedCountry });
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
    <CountryDropdown {countries} on:select={handleCountrySelect} />
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
