<script lang="ts">
  import BaseLayout from './+base-layout.svelte';
  import Stack from './+stack.svelte';
  import { page } from '$app/stores';
  import { derived } from 'svelte/store';
  import { Direction } from '$lib/types';
  import Spacer from './+spacer.svelte';
  import { goto } from '$app/navigation';

  // Extract title from the $page store
  const title = derived(page, $page => $page.data.title);
  const headTitle = derived(title, $title => $title || 'aia');

  const goBack = () => {
    history.back();
  };
</script>

<style>
  h1, .back-button {
    margin: 0;
    padding: 0;
    display: inline-block;
    cursor: pointer;
  }

  .navigation-container {
    position: relative;
  }

  .back-button {
    display: none; /* Initially hide the back button */
    background-color: transparent;
    border: none;
color: var(--blue);
  }

  .title-wrapper:hover h1 {
    display: none; /* Hide the title on hover */
  }

  .title-wrapper:hover .back-button {
    display: inline-block; /* Show the back button on hover */
  }
</style>

<svelte:head>
  <title>{"aia • "} {$headTitle}</title>
</svelte:head>

<BaseLayout>
  <Stack direction={Direction.Horizontal} wrap={true} style="margin-bottom: 0.5em; position: relative;" slot="header">
    
    <!-- Leading Navigation -->
    <slot name="navigation-leading">
      {#if $title}
        <Stack direction={Direction.Horizontal} wrap={true} spacing={0.5} align="center" class="navigation-container">
          <span class="title-wrapper">
            <h1>{$title}</h1>
            <h1 class="back-button" on:click={goBack}>Back</h1>
          </span>
        </Stack>
      {:else}
        <h1 class="back-button" on:click={goBack}>Back</h1>
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
