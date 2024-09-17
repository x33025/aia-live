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

  let selectedSortOption: SortOptions = SortOptions.DateCreatedDesc; // Default to DateCreated Descending

  // Function to toggle the sort option
  function toggleSortOption(option: SortOptions) {
    if (selectedSortOption === option) {
      selectedSortOption = option.includes('Asc') ? (option.replace('Asc', 'Desc') as SortOptions) : (option.replace('Desc', 'Asc') as SortOptions);
    } else {
      selectedSortOption = option;
    }
    console.log("Selected sort option:", selectedSortOption);
    updateKeywordList();
  }

  // Handle sorting option change from DropdownMenu
  function handleSortChange(event: CustomEvent<{ selectedOption: SortOptions }>) {
    toggleSortOption(event.detail.selectedOption);
  }

  // Fetch the sorted list of keywords
  async function updateKeywordList() {
    try {
      console.log('updateKeywordList called with sort option:', selectedSortOption);
      const response = await fetch(`/protected/keywords?sort=${selectedSortOption}`);
      const sortedKeywords = await response.json();
      console.log('updateKeywordList response:', sortedKeywords);
      keywords.set(sortedKeywords); // Update the store with sorted keywords
    } catch (error) {
      console.error('Failed to fetch sorted keywords:', error);
    }
  }

  // Set initial keywords in the store
  onMount(() => {
    const unsubscribe = page.subscribe(($page) => {
      if ($page.data.keywords) {
        keywords.set($page.data.keywords);
      }
    });

    // Optional: unsubscribe when the component is destroyed
    return () => {
      unsubscribe();
    };
  });

  function handleSearch(value: string) {
    console.log('Search value:', value);
  }

  function updateKeyword(id: string, updatedFields: object) {
    console.log('Keyword updated:', id, updatedFields);
  }
</script>

<Stack direction={Direction.Vertical} spacing={1}>
  <Stack direction={Direction.Horizontal} wrap={true}>
    <SearchBar onSearch={handleSearch} />

    <!-- Dropdown for Sorting -->
    <DropdownMenu id="sort" placeholder="Sort by" on:select={handleSortChange}>
      <svelte:fragment slot="button">{selectedSortOption}</svelte:fragment>
    
      <div on:click={() => toggleSortOption(SortOptions.DateCreatedAsc)}>
        Date Created
      </div>
      <div on:click={() => toggleSortOption(SortOptions.DateUpdatedAsc)}>
        Date Updated
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
