<script lang="ts">
  import KeywordRow from '$lib/views/keyword/+keyword-row.svelte';
  import Stack from '$lib/components/layout/+stack.svelte';
  import Text from '$lib/components/display/+text.svelte';
  import { Direction, TextType } from '$lib/types';
  import { keywords } from '$lib/stores/+keywords'; // Import the store
  import { onMount } from 'svelte';
    import { page } from '$app/stores';
    import Layout from '$lib/components/layout/+layout.svelte';
    import Input from '$lib/components/actions/+input.svelte';

  const headers = ["Keyword", "Evergreen", "Country", "Volume", "Density"];

  // Function to update a keyword and the local store
  async function updateKeyword(id: string, updatedFields: object) {
    try {
      const response = await fetch(`/protected/keywords`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id, ...updatedFields }),
      });

      if (!response.ok) {
        throw new Error('Failed to update keyword');
      }

      const updatedKeyword = await response.json();

      // Update the keyword in the local store
      keywords.update(currentKeywords => {
        return currentKeywords.map(kw =>
          kw.id === id ? { ...kw, ...updatedFields } : kw
        );
      });

      console.log('Keyword updated successfully:', updatedKeyword);
    } catch (error) {
      console.error('Error updating keyword:', error);
    }
  }

  // Set keywords in the store on component mount
  onMount(() => {
    keywords.set($page.data.keywords); // Populate the store with initially fetched keywords
  });
</script>

<Stack spacing={"1"}>
  <Stack direction={Direction.Horizontal} wrap={true}>
    <Input className="search-bar" fullWidth={true} placeholder="Search Keywords"/>

  </Stack>
  <table>
    <thead>
      <tr>
        {#each headers as header}
          <th>
            <Text type={TextType.Subheadline}>{header}</Text>
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
  }

  th {
    padding: 0.3em;
    border-top: 1px solid #ddd;
    border-bottom: 1px solid #ddd;
    text-align: left;
  }

  :global(.search-bar) {
    padding: 0.5em;
background-color: var(--gray-1);
border-radius: 0.5em;
  }
</style>
