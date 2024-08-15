<script lang="ts">
  import KeywordRow from '$lib/views/keyword/+keyword-row.svelte';
  import { debounce } from 'lodash-es';
  import type { PageData } from './$types';
 
  export let data: PageData;
  const { keywords, countries } = data;
 
  // Debounced function to update keyword, declared in the parent
  const updateKeyword = debounce(async (id: string, updatedFields: object) => {
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
  }, 300);
 </script>
 
 <div class="table-container">
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
       {#each keywords as keyword (keyword.id)}
         <KeywordRow {keyword} {countries} {updateKeyword} />
       {/each}
     </tbody>
   </table>
 </div>

<style>
  .table-container {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    overflow: hidden;
    flex-grow: 1;
  }

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

  td, th {
    padding: 8px;
    border-top: 1px solid #ddd;
    border-bottom: 1px solid #ddd;
    text-align: left;
  }

  td {
    border-top: none;
  }
</style>
