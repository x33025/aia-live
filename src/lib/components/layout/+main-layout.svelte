<script lang="ts">
  import BaseLayout from './+base-layout.svelte';
  import Stack from './+stack.svelte';
  import { page } from '$app/stores';
  import { derived } from 'svelte/store';
  import { Direction } from '$lib/types';
  import Spacer from './+spacer.svelte';

  // Extract title from the $page store
  const title = derived(page, $page => $page.data.title);
  const headTitle = derived(title, $title => $title || 'aia');
</script>

<svelte:head>
  <title>{"aia • "} {$headTitle}</title>
</svelte:head>

<BaseLayout>

  <Stack direction={Direction.Horizontal} wrap={true} style="margin-bottom: 1em;" slot="header">
    {#if $title}
      <h1 >{$title}</h1>
    {/if}

    <Spacer />
    <slot name="navigation"></slot>
  </Stack>

  
    <slot />

</BaseLayout>
