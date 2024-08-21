<script lang="ts">
  import '../global.css';
  // import '$lib/components/layout/config.css';
  import { page } from '$app/stores';
  import { derived } from 'svelte/store';
  import ContextMenu from '$lib/components/actions/+context-menu.svelte';
  import Stack from '$lib/components/layout/+stack.svelte';

  // Extract title from the $page store
  const title = derived(page, $page => $page.data.title);

  // Create a derived store for the head title with a default value
  const headTitle = derived(title, $title => $title || 'aia');

  // Debugging: Log the title when it changes
  $: console.log('Page title:', $headTitle);
</script>

<svelte:head>
  <title>{"aia • "} {$headTitle}</title>
</svelte:head>

<main>
  <Stack>
    {#if $title}
      {#if $title !== 'Login'}
        <h1>{$title}</h1>
      {/if}
    {/if}

    <Stack className="content">
      <slot />
    </Stack>
  </Stack>

  <ContextMenu />
</main>

<style>
  main {
    height: 100%;
    width: 100%;
    padding: 1em;
    background-color: var(--gray-1);
    display: flex;
    flex-direction: column;
    align-items: stretch;

  }
</style>
