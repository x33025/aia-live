<script lang="ts">
  import '../global.css';
  import '$lib/components/layout/config.css';
  import { page } from '$app/stores';
  import { derived } from 'svelte/store';
  import ContextMenu from '$lib/components/actions/+context-menu.svelte';
  import Stack from '$lib/components/layout/+stack.svelte';
  import { Alignment, Direction } from '$lib/types';

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
  <Stack direction={Direction.Column} alignment={Alignment.Start} spacing={1}>
    {#if $title}
      <h1>{$title}</h1>
    {/if}

    
    <div class="content">
      <slot />
    </div>
 
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
  .content {
    background-color: white;
    border-radius: 1em;
    padding: 1em;
    flex: 1;
    display: flex;
    width: 100%;
    height: 100%;
  }
</style>
