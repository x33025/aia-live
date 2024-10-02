<script lang="ts">
    import type { Note } from '$lib/types';
    import Text from '$lib/core/display/+text.svelte';
    import { TextType } from '$lib/types';
    import Avatar from '$lib/components/user/+avatar.svelte'; // Import Avatar component
    import { users, current_user } from '$lib/stores/data/+users';
    import DeleteButton from '$lib/components/actions/+delete-button.svelte';

    export let note: Note;


    
</script>

<div class="stack expand note-content" > 
    <div class="stack" style="--direction: row; --align: center; width: 100%; padding-right: 0.3em; " > 
        {#if note.expand?.activity}
    
         <Avatar size={1.5} userId={note.expand.activity.created_by} />
     
        <Text type={TextType.Callout} style="font-weight: bold;">{$users.filter((user) => user.id === note.expand?.activity?.created_by)[0].first_name} {$users.filter((user) => user.id === note.expand?.activity?.created_by)[0].last_name.charAt(0)}. </Text>
        <div class="spacer" />
        <DeleteButton activity={note.expand?.activity} />
    {/if}

    </div>
   

  
        <div contenteditable={note.expand?.activity?.created_by === $current_user?.id} class="stack expand">
            {@html note.content}
        </div>

</div>

<style>



div[contenteditable="true"] {
   
 
    z-index: 1000; /* Ensure it is above other elements */

}


.note-content {
    min-height: 125px;
    background-color: var(--gray-1); /* Transparent background */
    padding: 0.5em;
    border-radius: 1em;
}
</style>