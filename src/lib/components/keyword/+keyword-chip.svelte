<script lang="ts">
    import type { Keyword } from '$lib/types';
    import { openContextMenu } from '$lib/stores/ui/+context-menu';
    import StarFillIcon from '$lib/core/ui/icons/+star-fill.svelte';


    export let keyword: Keyword;
    export let is_main: boolean = false;


    function handleRightClick(event: MouseEvent) {
        event.preventDefault();
        openContextMenu(event.clientX, event.clientY, [
          { label: 'Option 1', action: () => console.log('Option 1 clicked') },
          { label: 'Option 2', action: () => console.log('Option 2 clicked') },
          { label: 'Option 3', action: () => console.log('Option 3 clicked') },
        ]);
      }
</script>

<div class="stack keyword-chip" style="--direction: row; --align: center;" on:contextmenu={handleRightClick}>
    {#if is_main}
        <StarFillIcon size={1} color="var(--yellow)" />
    {/if}
    
    <p class="callout" style="font-weight: bold;">{keyword.keyword}</p>
</div>

<style>
    .keyword-chip {
        border-radius: 0.5em;
        background-color: var(--gray-1);
        padding: 0.5em;
 
    }
</style>