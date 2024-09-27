<script lang="ts">
    import type { Note } from '$lib/types';
    import Text from '$lib/core/display/+text.svelte';
    import { TextType } from '$lib/types';
    import { onMount } from 'svelte';
    import Avatar from '$lib/components/user/+avatar.svelte'; // Import Avatar component

    export let note: Note;


    
</script>

<div class="note-container">
    {#if note.expand?.activity}
        <div class="avatar-overlay">
            <Avatar size={2} userId={note.expand.activity.created_by} />
        </div>
    {/if}

    <Text type={TextType.Subheadline}>
        <div contenteditable="true">
            {@html note.content}
        </div>
    </Text>
</div>

<style>
.note-container {
    position: relative;
}

.avatar-overlay {
    position: absolute;
    bottom: 0.5em;
    right: 0.5em;
    z-index: 1001; /* Ensure it is above the contenteditable div */
}

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
