<script lang="ts">
  import { onMount } from 'svelte';
  import { page } from '$app/stores';
  import Stack from '$lib/components/layout/+stack.svelte';
  import Text from '$lib/components/display/+text.svelte';
  import TextInput from '$lib/components/actions/+text-input.svelte';
  import SearchBar from '$lib/views/search/+search-bar.svelte';
  import DropdownMenu from '$lib/components/actions/+dropdown-menu.svelte';
  import KeywordRow from '$lib/views/keyword/+keyword-row.svelte';
  import { keywords } from '$lib/stores/+keywords';
  import { Direction, SortOptions, type Keyword } from '$lib/types';

  const headers = ["Keyword", "Evergreen", "Country", "Volume", "Density", "Notes"];

  // Default sort option
  let selectedSortOption: SortOptions = SortOptions.DateCreatedDesc;

  // Function to log sorting updates
  function logSorting(action: string, details: any = null) {
    console.log(`🔄 [Sort Log] ${action}`, details ? JSON.stringify(details, null, 2) : '');
  }

  // Function to fetch the sorted list of keywords
  async function updateKeywordList() {
    logSorting('Updating keyword list', { selectedSortOption });

    try {
      const fetchUrl = `/protected/keywords?sort=${selectedSortOption}`;
      logSorting('Fetch URL', { fetchUrl });

      const response = await fetch(fetchUrl);
      const sortedKeywords = await response.json();

      logSorting('Fetched keywords', { sortedKeywords });

      keywords.set(sortedKeywords); // Update the store with sorted keywords

      logSorting('Keyword store updated');
    } catch (error) {
      console.error('❌ [Sort Log] Failed to fetch sorted keywords:', error);
    }
  }

  // Use onMount to ensure this only runs on the client
  onMount(() => {
    logSorting('Component mounted, fetching initial keywords');
    updateKeywordList();
  });

  // Handle sorting option change from the dropdown
  function handleSortChange(option: SortOptions) {
    logSorting('Sort option selected', { option });

    // Update selectedSortOption and fetch sorted data
    selectedSortOption = option;
    logSorting('Selected sort option updated', { selectedSortOption });

    updateKeywordList();
  }

  // Handle search input changes
  function handleSearch(value: string) {
    logSorting('Search input', { searchValue: value });
  }

  // Handle keyword updates
  function updateKeyword(id: string, updatedFields: object) {
    logSorting('Keyword updated', { id, updatedFields });
  }
</script>

<Stack direction={Direction.Vertical} spacing={1}>
  <Stack direction={Direction.Horizontal} wrap={true}>
    <SearchBar onSearch={handleSearch} />

    <!-- Dropdown for Sorting -->
    <DropdownMenu id="sort" placeholder="Sort by">
      <svelte:fragment slot="button">{selectedSortOption}</svelte:fragment>

      <!-- Sorting Options -->
      <div>
        {#each Object.entries(SortOptions) as [key, option]}
          <div on:click={() => handleSortChange(option)}>
            {key}
          </div>
        {/each}
      </div>
    </DropdownMenu>
  </Stack>

  <!-- Table for Displaying Keywords -->
  <Stack spacing={1} class="table-container">
    <table>
      <thead>
        <tr>
          {#each headers as header}
            <th>
              <Text>{header}</Text>
            </th>
          {/each}
        </tr>
      </thead>
      <tbody>
        {#each $keywords as keyword (keyword.id)}
          <KeywordRow {keyword} countries={$page.data.countries} {updateKeyword} />
        {/each}
      </tbody>
    </table>
  </Stack>
</Stack>



<style>
  table {
    width: 100%;
    min-width: 66.67%;
    border-collapse: collapse;
  }

  th {
    position: sticky;
    top: 0;
    background-color: white;
    z-index: 1;
    text-align: left;
    border-right: none;
    padding: 0.5em;
    border-top: 1px solid #ddd;
    border-bottom: 1px solid #ddd;
  }

  :global(.table-container) {
    flex: 1;
    overflow-y: auto;
    overflow-x: auto; /* Add horizontal scroll if needed */
  }

  :global(.search-bar) {
    padding: var(--default-padding);
    background-color: var(--gray-1);
    border-radius: 0.5em;
    position: sticky;
  }
</style>
