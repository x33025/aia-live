<script lang="ts">
    import { page } from '$app/stores';
    import { derived } from 'svelte/store';

    const title = derived(page, $page => $page.data.title);
</script>

<style>
  h1 {
    
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
</style>

<div class="stack">
  <h1>{$title}</h1>
</div>