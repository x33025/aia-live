<script lang="ts">
  import BaseLayout from './+base-layout.svelte';
  import { page } from '$app/stores';
  import { derived } from 'svelte/store';


  // Extract title from the $page store
  const title = derived(page, $page => $page.data.title);
  const headTitle = derived(title, $title => $title || 'aia');

</script>

<svelte:head>
  <title>{"aia • "} {$headTitle}</title>
</svelte:head>

<BaseLayout>

  <div class="stack expand" slot="header" style="--direction: row; --justify: space-between;">

    <slot name="navigation-leading" />


    <slot name="navigation-trailing" />
  </div>

  
  <slot />

</BaseLayout>
