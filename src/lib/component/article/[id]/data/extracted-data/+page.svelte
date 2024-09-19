<!-- <script lang="ts">
  import { filteredRawData } from '$lib/stores/+article';
  import { extractionPromise } from '$lib/api/+promises';
  import DataPointView from '../data-point/+page.svelte';
  import Spinner from '$lib/components/+spinner.svelte';
  import { onDestroy } from 'svelte';
  import { get } from 'svelte/store';

  let promise: Promise<any> | null = get(extractionPromise);
  let extractedData: any[] = [];
  
  const unsubscribeFilteredRawData = filteredRawData.subscribe((data) => {
    extractedData = data;
  });
  
  const unsubscribePromise = extractionPromise.subscribe(value => {
    promise = value;
  });

  onDestroy(() => {
    unsubscribeFilteredRawData();
    unsubscribePromise();
  });
</script>

<Spinner {promise} awaitText="Extracting Data...">
  <p slot="catch" let:error class="error-message">
    Data extraction failed: {error.message}
  </p>
</Spinner>

<div class="extracted-data">
  {#if extractedData.length > 0}
    {#each extractedData as data, dataIndex (dataIndex)}
      {#each Object.entries(data) as [key, value]}
        <DataPointView {key} {value} />
      {/each}
    {/each}
  {:else if !promise}
    <p class="placeholder">Please extract data from the source.</p>
  {/if}
</div>

<style>
  .error-message {
    color: var(--red);
  }
  .placeholder {
    color: var(--gray-5);
  }
</style> -->
