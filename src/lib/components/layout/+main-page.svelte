<script lang="ts">
  import BaseLayout from './+base-layout.svelte';
  import Stack from './+stack.svelte';
  import { page } from '$app/stores';
  import { derived } from 'svelte/store';
  import { Direction } from '$lib/types';
  import Spacer from './+spacer.svelte';
  import { goto } from '$app/navigation';
  import Text from '$lib/components/display/+text.svelte';
  import { TextType } from '$lib/types';
  import PageTitle from './+page-title.svelte';

  // Extract title from the $page store
  const title = derived(page, $page => $page.data.title);
  const headTitle = derived(title, $title => $title || 'aia');

  // Function to handle the go back action
  const goBack = () => {
    history.back();
  }
</script>

<svelte:head>
  <title>{"aia • "} {$headTitle}</title>
</svelte:head>

<BaseLayout>
  <Stack direction={Direction.Horizontal} wrap={true} style="margin-bottom: 0.9em; position: relative;" slot="header">
    
    <!-- Leading Navigation -->
    <slot name="navigation-leading">
      <button on:click={goBack}>Go Back</button>
      <Stack direction={Direction.Horizontal} spacing={1}>
        <!-- Go Back Button -->
      
        <PageTitle />
      </Stack>
    </slot>
    
    <Spacer />
    
    <!-- Center Navigation -->
    <slot name="navigation-center"></slot>
    
    <Spacer />
    
    <!-- Trailing Navigation -->
    <slot name="navigation-trailing"></slot>
  </Stack>

  <slot />
</BaseLayout>
