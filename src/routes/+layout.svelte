<script lang="ts">
  import '../global.css';
  import '$lib/components/layout/config.css';
  import { page } from '$app/stores';
  import { derived } from 'svelte/store';
  import ContextMenu from '$lib/components/actions/+context-menu.svelte';
  import Stack from '$lib/components/layout/+stack.svelte';
  import { Alignment, Direction } from '$lib/types';
    import Group from '$lib/components/layout/+group.svelte';

  // Extract title from the $page store
  const title = derived(page, $page => $page.data.title);

  // Create a derived store for the head title with a default value
  const headTitle = derived(title, $title => $title || 'aia');

  // Debugging: Log the title when it changes
  $: console.log('Page title:', $title);
</script>

<svelte:head>
  <title>{$headTitle}</title>
</svelte:head>

<main>
  <Stack spacing={1}>
    {#if $title}
      <h1>{$title}</h1>
    {/if}

    
    <Group className="content">
      <slot />
    </Group>
 
  </Stack>

  <ContextMenu />
</main>

<style>
  main {
    padding: 1em;
    background-color: var(--gray-1);
    display: flex;
    flex-direction: column;
    align-items: stretch;
    min-height: 100vh;
    width: 100%;
  }
</style>
