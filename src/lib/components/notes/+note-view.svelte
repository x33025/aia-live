<script lang="ts">
    import type { Note } from '$lib/types';
    import Text from '$lib/core/display/+text.svelte';
    import { TextType } from '$lib/types';
    import Avatar from '$lib/components/user/+avatar.svelte'; // Import Avatar component
    import { current_user } from '$lib/stores/data/+users';


    export let note: Note;


    
</script>

<div class="note-container">
    {#if note.expand?.activity}
        <div class="avatar-overlay">
            <Avatar size={2} userId={note.expand.activity.created_by} />
        </div>
    {/if}

   <Text type={TextType.Subheadline}>    <!--  TextType for review -->
        <div contenteditable={note.expand?.activity?.created_by === $current_user?.id} class="note-content">
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
   
 
    z-index: 1000; /* Ensure it is above other elements */

}


.note-content {
    min-height: 125px;
    background-color: var(--gray-1); /* Transparent background */
    padding: 0.5em;
    border-radius: 0.5em;
}
</style>