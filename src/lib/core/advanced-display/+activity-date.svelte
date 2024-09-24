<script lang="ts">
    import Text from '$lib/core/display/+text.svelte'; // Adjust the import path as necessary
    import { TextType } from '$lib/types';
    
    export let updated: Date | string;
    export let created: Date | string;
    let showUpdated: boolean = true;
  
    function toggleTime() {
      showUpdated = !showUpdated;
    }
  
    function formatDate(date: Date | string): string {
      const timeOptions: Intl.DateTimeFormatOptions = { hour: '2-digit', minute: '2-digit' }; // Corrected types
      const dateOptions: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' }; // Corrected types
      return new Date(date).toLocaleDateString(undefined, dateOptions) + ' at ' + new Date(date).toLocaleTimeString(undefined, timeOptions);
    }
  </script>
  
  <div on:click={toggleTime}>
    <Text type={TextType.Callout} style="color: var(--gray-6);">
      {#if showUpdated}
        <strong>Updated:</strong> {formatDate(updated)}
      {:else}
        <strong>Created:</strong> {formatDate(created)}
      {/if}
    </Text>
  </div>
  
  <style>
    div {
      cursor: pointer;
      user-select: none;
    }
  </style>
  