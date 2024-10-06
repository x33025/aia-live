<script lang="ts">
    import type { Note } from '$lib/types';
    import Text from '$lib/core/display/+text.svelte';
    import { TextType } from '$lib/types';
    import Avatar from '$lib/components/user/+avatar.svelte'; // Import Avatar component
    import { users, current_user } from '$lib/stores/data/+users';
    import DeleteButton from '$lib/components/actions/+delete-button.svelte';
    import { debounce } from 'lodash-es'; // Import debounce

    export let note: Note;

    // Function to update the note
    const updateNote = debounce(async (content: string) => {
        try {
            const response = await fetch('/api/data/update', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    collection: 'notes',
                    id: note.id,
                    data: { content }
                })
            });

            if (!response.ok) {
           
                console.error('Failed to update the note');
            }
        } catch (error) {
            console.error('Error while updating note:', error);
        }
    }, 600); // 600ms debounce delay

    // Handle input event in contenteditable
    function handleInput(event: Event) {
        const content = (event.target as HTMLDivElement).innerHTML;
        updateNote(content);
    }
</script>

<div class="stack expand note-content"> 
    <div class="stack" style="--direction: row; --align: center; width: 100%; padding-right: 0.3em;"> 
        {#if note.expand?.activity}
            <Avatar size={1.5} userId={note.expand.activity.created_by} />
            <Text type={TextType.Callout} style="font-weight: bold;">
                {$users.filter((user) => user.id === note.expand?.activity?.created_by)[0].first_name} 
                {$users.filter((user) => user.id === note.expand?.activity?.created_by)[0].last_name.charAt(0)}.
            </Text>
            <div class="spacer" />
            <DeleteButton activity={note.activity} />
        {/if}
    </div>

    <div
        contenteditable={note.expand?.activity?.created_by === $current_user?.id}
        class="stack expand"
        on:input={handleInput}
    >
        {@html note.content}
    </div>
</div>

<style>
div[contenteditable="true"] {
    z-index: 1000; /* Ensure it is above other elements */
}

.note-content {
    max-height: 125px;
    background-color: var(--gray-1);
    padding: 0.5em;
    border-radius: 1em;
    aspect-ratio: 1;
}
</style>
