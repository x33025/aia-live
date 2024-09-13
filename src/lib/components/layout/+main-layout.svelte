<script lang="ts">
  import BaseLayout from './+base-layout.svelte';
  import Stack from './+stack.svelte';
  import { page } from '$app/stores';
  import { derived } from 'svelte/store';
  import { Direction } from '$lib/types';
  import Spacer from './+spacer.svelte';
  import { goto } from '$app/navigation';
  import Text from '$lib/components/display/+text.svelte';
import {TextType} from '$lib/types';
  // Extract title from the $page store
  const title = derived(page, $page => $page.data.title);
  const headTitle = derived(title, $title => $title || 'aia');

  const goBack = () => {
    history.back();
  };
</script>




<svelte:head>
  <title>{"aia • "} {$headTitle}</title>
</svelte:head>

<BaseLayout>
  <Stack direction={Direction.Horizontal} wrap={true} style="margin-bottom: 0.9em; position: relative;" slot="header">
    
    <!-- Leading Navigation -->
    <slot name="navigation-leading">
      {#if $title}
       
  
            <h1>{$title}</h1>
    
 

      {/if}
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
