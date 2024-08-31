<script lang="ts">
    import type { Notes } from '$lib/types';
  
    export let note: Notes;
</script>

<div contenteditable="true">
    {@html note.content}
</div>

<style>
div[contenteditable="true"] {
    padding: 0.5em;
    border: 1px solid #ccc;
    border-radius: 0.7em;
    min-height: 125px;
    outline: none;
    background-color: #ebebebde; /* Transparent background */
    z-index: 1000; /* Ensure it is above other elements */
    font-size: smaller;
}
  
    div[contenteditable="true"]:focus {
        border-color: var(--blue); /* Highlight border on focus */
    }
</style>
