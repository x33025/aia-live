<script lang="ts">
    import '../global.css';
    import { onMount } from 'svelte';
    import { page } from '$app/stores';
    import { derived } from 'svelte/store';
    import ContextMenu from '$lib/components/actions/+context-menu.svelte';
  
    // Extract title from the $page store
    const title = derived(page, $page => $page.data.title);
  
    // Debugging: Log the title when it changes
    $: console.log('Page title:', $title);
  </script>
  
  <svelte:head>
    <title>{$title}</title>
  </svelte:head>
  
  <main>
    {#if $title}
      <h1 class="title">{$title}</h1>
    {/if}
    <div class="content">
      <slot />
    </div>
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
    }
    .content {
      background-color: white;
      border-radius: 1em;
      padding: 1em;
      flex: 1;
      display: flex;
      flex-direction: column;
    }
    .title {
        margin-bottom: 0.3em;
    }
  </style>
  