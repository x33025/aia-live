<script lang="ts">
    import { onMount } from 'svelte';
    import TrashIcon from '$lib/core/ui/icons/+trash.svelte';
    import type { BaseModel } from '$lib/types';

    import { markDeleted } from '$lib/api/activity/+mark-deleted';
    import { current_user } from '$lib/stores/data/+users';

    export let activity: string;

    const handleDelete = async () => {
        console.log('delete', activity);


   
     markDeleted(activity, $current_user.id);
  
    }
</script>


<button on:click={handleDelete}>  
    <TrashIcon color="var(--red)" size={1} />
</button>

