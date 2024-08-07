<script lang="ts">
  import { onMount } from 'svelte';
  import { supabase } from '$lib/config/supabase';
  import Input from '$lib/components/actions/+input.svelte';
  import type { Keyword } from '@prisma/client'; // Adjust import based on your actual model
  import { TextType } from '$lib/types';

  export let keyword: Keyword; // Ensure this matches your model
  const textType = TextType.Body;

  // Ensure keyword has necessary properties
  if (!keyword.keyword) {
      keyword.keyword = '';
  }

  onMount(() => {
    const keywordSubscription = supabase
      .channel('public:Keyword')
      .on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'Keyword' }, payload => {
        console.log('Change received!', payload);
        // Update the keyword state based on the payload received
        if (payload.new.id === keyword.id) {
          keyword.keyword = payload.new.keyword;
        }
      })
      .subscribe();

    return () => {
      // Clean up subscription on component unmount
      supabase.removeChannel(keywordSubscription);
    };
  });
</script>

<Input 
  type={textType}
  className="keyword"
  bind:value={keyword.keyword}
  placeholder="Keyword"
/>

<style>
  :global(.keyword) {
    background-color: var(--gray-1); /* Change color to distinguish it from the title */
    border-radius: 0.5em;
    padding: 0.5em;
    flex: 1;
    display: block;
  }
</style>
