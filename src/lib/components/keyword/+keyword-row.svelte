<script lang="ts">
  import NumericInput from '$lib/core/advanced-input/+numeric-input.svelte';
  import DropdownMenu from '$lib/core/actions/+dropdown-menu.svelte';
  import { type Country, type Keyword } from '$lib/types';
  import NotesButton from '../notes/+notes-button.svelte';
  import { updateKeyword } from '$lib/api/keyword/+update-keyword';
  import CountryDropdown from '../actions/+country-dropdown.svelte';
  import { countries } from '$lib/stores/data/+countries';
  import { debounce } from 'lodash-es';
  import CircleIcon from '$lib/core/ui/icons/+circle.svelte';
  import { selectedKeywords } from '$lib/stores/data/+keywords';
    import CircleFillIcon from '$lib/core/ui/icons/+circle-fill.svelte';
  export let keyword: Keyword;

  $: selectedCountry = keyword.country ? $countries.filter(c => c.id === keyword.country)[0] : null;

  function selectCountry(country: Country) {
    selectedCountry = country;
    updateKeyword(keyword.id, { country: country.id });
  }

  // Handle input change for keyword name
  async function handleKeywordChange(event: Event) {
    const input = event.target as HTMLInputElement;
    keyword.keyword = input.value;

    // Update keyword with new value
    try {
      await updateKeyword(keyword.id, { keyword: keyword.keyword });
    } catch (error) {
      console.error('Failed to update keyword:', error);
    }
  }

  // Debounced function to handle input changes
  const debouncedHandleKeywordChange = debounce(handleKeywordChange, 300);

  const debouncedUpdateVolume = debounce((volume: number) => {
    updateKeyword(keyword.id, { volume: volume });
  }, 600);

  const debouncedUpdateDensity = debounce((density: number) => {
    updateKeyword(keyword.id, { density: density });
  }, 600);

  // Event handlers for volume and density changes
  function handleVolumeChange(volume: number) {
    debouncedUpdateVolume(volume);
  }

  function handleDensityChange(density: number) {
    debouncedUpdateDensity(density);
  }

  function handleEvergreenToggle() {
    const newEvergreenState = !keyword.evergreen;
    updateKeyword(keyword.id, { evergreen: newEvergreenState });
  }


  function selectKeyword() {
    console.log('select keyword');
    selectedKeywords.update((keywords) => {
      if (keywords.some(k => k.id === keyword.id)) {
        return keywords.filter(k => k.id !== keyword.id);
      } else {
        return [...keywords, keyword];
      }
    });
  }
</script>

<tr>
  <td style="padding-left: 1.5em;">
    <button class="stack" on:click={selectKeyword}>
      {#if $selectedKeywords.some(k => k.id === keyword.id)}
      <CircleFillIcon size={1} color="var(--blue)" />
    {:else}
      <CircleIcon size={1} color="var(--gray-6)" />
    {/if}
    
    </button>
  </td>
  <td style="width: 25%; ">
    <!-- Input field with debounced keyword change handler -->
    <input
      class="keyword-input"
      style="width: 100%"
      type="text"
      bind:value={keyword.keyword}
      on:input={debouncedHandleKeywordChange}
      placeholder="Enter keyword"
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
      on:update={(e) => handleVolumeChange(e.detail.value)}
    />
  </td>
  <td>
    <NumericInput
      value={keyword.density}
      on:update={(e) => handleDensityChange(e.detail.value)}
    />
  </td>
  <td style="margin-right: 1.5em;">
    <NotesButton
      notes={keyword.expand?.notes}
      activity={keyword.expand?.activity}
      parent={keyword}
      parent_collection="keywords"
    />
  </td>
</tr>

<style>

  td {
    padding: 0.5em;
    text-align: left;
  }

  tr:nth-child(even) {
    background-color: var(--gray-1);
  }
</style>
