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
  
    <Avatar userId={activity.created_by ?? ''} size={2.3}/>

 {/if}
    
</Stack>