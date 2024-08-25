<script lang="ts">
    import Stack from './+stack.svelte';
    import { page } from '$app/stores';
    import { derived } from 'svelte/store';
    import { Direction } from '$lib/types';
  
    // Extract title from the $page store
    const title = derived(page, $page => $page.data.title);
    const headTitle = derived(title, $title => $title || 'aia');
  </script>
  
  <svelte:head>
    <title>{"aia • "} {$headTitle}</title>
  </svelte:head>
  

    <Stack>
      <Stack direction={Direction.Horizontal} wrap={true} style="margin-bottom: 1em;">
        {#if $title}
          {#if $title !== 'Login'}
            <h1>{$title}</h1>
          {/if}
        {/if}
        
        <div style="flex-grow: 1;"></div>
        <!-- Navigation slot -->
        <slot name="navigation"></slot>
      </Stack>
      
      <Stack className="content">
        <!-- Main content slot -->
        <slot />
      </Stack>
    </Stack>

  

  