<script lang="ts">
    import { users } from '$lib/stores/+users';
    import DropdownMenu from '$lib/core/actions/+dropdown-menu.svelte';
    import Text from '$lib/core/display/+text.svelte';
    import Avatar from './+avatar.svelte';
    import Stack from '$lib/core/layout/+stack.svelte';
    import { Direction } from '$lib/types';
  
    // Sort users by last_active
    $: sortedUsers = $users.slice().sort((a, b) => {
        const dateA = new Date(a.last_active ?? 0).getTime();
        const dateB = new Date(b.last_active ?? 0).getTime();
        return dateB - dateA;
    });
</script>
  
<DropdownMenu id="users-dropdown">
  <span slot="button" class="users-dropdown border-highlight">
    {"Active Users"}
  </span>

  {#each sortedUsers as user}
  <Stack class="dropdown-item" direction={Direction.Horizontal} wrap={true} spacing={0.5}>
    <Avatar userId={user.id} size={1.75} /> 
    <Text> {user.first_name} {user.last_name}</Text>
  </Stack>
  {/each}
</DropdownMenu>

<style>

    :global(.dropdown-item) {
        padding: 0.5em;
        border-radius: 0.3em;
        cursor: pointer;
    }

    :global(.dropdown-item:hover) {
        background-color: var(--gray-1);
    }

    :global(.users-dropdown) {
      background-color: white;    
      padding: var(--default-padding);
      border-radius: 0.5em;
    }

    :global(.never-logged-in) {
        color: var(--gray-2);
    }
</style>