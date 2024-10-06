<script lang="ts">
    import type { Keyword } from '$lib/types';
    import Text from '$lib/core/display/+text.svelte';
    import { TextType } from '$lib/types';
    import StarFillIcon from '$lib/core/ui/icons/+star-fill.svelte';


    export let keyword: Keyword;
    export let is_main: boolean = false;
</script>

<div class="stack keyword-chip" style="--direction: row; --align: center;">
    {#if is_main}
        <StarFillIcon size={1} color="var(--yellow)" />
    {/if}
    <Text type={TextType.Callout} style="font-weight: bold;">{keyword.keyword}</Text>
</div>

<style>
    .keyword-chip {
        border-radius: 0.5em;
        background-color: var(--gray-1);
        padding: 0.5em;
 
    }
</style>