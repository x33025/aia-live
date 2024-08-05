<script lang="ts">
  import '../global.css';
  import { page } from '$app/stores';
  import { derived } from 'svelte/store';
  import ContextMenu from '$lib/components/actions/+context-menu.svelte';
  import Group from '$lib/components/layout/+group.svelte';
  import VStack from '$lib/components/layout/+v-stack.svelte';
  import { VerticalAlignment } from '$lib/types';

  // Extract title from the $page store
  const title = derived(page, $page => $page.data.title);

  // Debugging: Log the title when it changes
  $: console.log('Page title:', $title);
</script>

<svelte:head>
  <title>{$title}</title>
</svelte:head>

<main>
  <VStack alignment={VerticalAlignment.Top} spacing={1}>
    {#if $title}
      <h1 class="title">{$title}</h1>
    {/if}
    <Group className="content">
      <slot />
    </Group>
    <ContextMenu />
  </VStack>
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
  .title {
    margin-bottom: 0.3em;
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
