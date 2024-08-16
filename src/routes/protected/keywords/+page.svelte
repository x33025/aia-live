<script lang="ts">
  import KeywordRow from '$lib/views/keyword/+keyword-row.svelte';
  import Stack from '$lib/components/layout/+stack.svelte';
    import { page } from '$app/stores';

  // Direct function to update keyword
  async function updateKeyword(id: string, updatedFields: object) {
    try {
      console.log(`KEYWORD_ROW: Updating keyword with ID ${id}`, updatedFields);
      const response = await fetch(`/protected/keywords`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id, ...updatedFields }), // Include ID in the request body
      });

      if (!response.ok) {
        console.error('KEYWORD_ROW: Failed to update keyword with ID', id, 'Status:', response.status);
        const errorText = await response.text();
        console.error('KEYWORD_ROW: Error response:', errorText);
        throw new Error('Failed to update keyword');
      }

      const result = await response.json();
      console.log('KEYWORD_ROW: Keyword updated successfully:', result);
    } catch (error) {
      console.error('KEYWORD_ROW: Error updating keyword:', error);
    }
  }
</script>

<Stack>
  <table>
    <thead>
      <tr>
        <th>Keyword</th>
        <th>Evergreen</th>
        <th>Country</th>
        <th>Volume</th>
        <th>Density</th>
      </tr>
    </thead>
    <tbody>
      {#each $page.data.keywords as keyword (keyword.id)}
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
</style>
