<script lang="ts">

    import { Direction, type ActivityData } from '$lib/types';
    import Avatar from '$lib/components/user/+avatar.svelte';


    export let activity: ActivityData;
</script>


{#if activity}
<div class="stack" style="--direction: column; --gap: 0.5em;">
  

  
    <Avatar userId={activity.created_by ?? ''} size={2.3}/>


    
</div>
 {/if}