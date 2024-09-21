<script lang="ts">
    import Stack from '$lib/core/layout/+stack.svelte';
    import { Direction, type ActivityData } from '$lib/types';
    import Avatar from '../user/+avatar.svelte';
    import Text from '$lib/core/display/+text.svelte';
    import { TextType } from '$lib/types';

    export let activity: ActivityData;
</script>

<style>

</style>

<Stack direction={Direction.Vertical} spacing={0.5}>
    {#if activity}

    <Text type={TextType.Callout}> <strong>Created:</strong> {new Date(activity.created).toLocaleString()}</Text>
   
    <Avatar userId={activity.created_by ?? ''} size={2.3}/>
      {#if activity.updated !== activity.created}
       <Text type={TextType.Callout}> <strong>Updated:</strong> {new Date(activity.updated).toLocaleString()}</Text>
      
        <Stack direction={Direction.Horizontal} wrap={true} spacing={0.5}>
       
            {#each activity.updated_by as user}
            <Avatar userId={user} size={2.3}/>
        {/each}
        </Stack>
        {#if activity.deleted}
            <Text type={TextType.Callout}> <strong>Deleted:</strong> {activity.deleted}</Text>
            <Avatar userId={activity.deleted_by ?? ''} size={2.3}/>
        {/if}
      {/if}
    {/if}
    
</Stack>