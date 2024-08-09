<script lang="ts">
  import Input from '$lib/components/actions/+input.svelte';
  import type { Keyword } from '@prisma/client';
  import { TextType } from '$lib/types';

  export let keyword: Keyword;
  const textType = TextType.Body;

  async function updateKeyword() {
    try {
      const response = await fetch(`/protected/keywords`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: keyword.id,
          keyword: keyword.keyword,
        }),
      });

      const result = await response.json();

      if (!result.success) {
        console.error('Error updating keyword:', result.error);
      } else {
        console.log('Keyword updated successfully');
      }
    } catch (error) {
      console.error('Error processing update:', error);
    }
  }

  function handleKeydown(event: CustomEvent) {
    const keyboardEvent = event.detail as KeyboardEvent;

    if (keyboardEvent.key === 'Enter') {
      (keyboardEvent.target as HTMLInputElement).blur();
      updateKeyword();

    }
  }
</script>

<Input 
  type={textType}
  className="keyword"
  bind:value={keyword.keyword}
  placeholder="Keyword"
  on:keydown={handleKeydown} 
/>

<style>
  :global(.keyword) {
    background-color: var(--gray-1);
    border-radius: 0.5em;
    padding: 0.5em;
    flex: 1;
    display: block;
  }
</style>
