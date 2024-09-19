<script lang="ts">
    import type { Notes } from '$lib/types';
    import Text from '$lib/core/display/+text.svelte';
    import { TextType } from '$lib/types';
    import { onMount } from 'svelte';

    export let note: Notes;


    
</script>

<Text type={TextType.Subheadline}>
    <div contenteditable="true">
        {@html note.content}
    </div>
</Text>


<style>
div[contenteditable="true"] {
    padding: 1em;
   
    border-radius: 1em;
    min-height: 125px;
    outline: none;
    background-color: var(--gray-1); /* Transparent background */
    z-index: 1000; /* Ensure it is above other elements */
    font-size: smaller;
}
  
    div[contenteditable="true"]:focus {
        border-color: var(--blue); /* Highlight border on focus */
    }
</style>
