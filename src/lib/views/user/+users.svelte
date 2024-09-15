<script lang="ts">
    import { users } from '$lib/stores/+users';
    import DropdownMenu from '$lib/components/actions/+dropdown-menu.svelte';
    import Text from '$lib/components/display/+text.svelte';
    import Avatar from './+avatar.svelte';
    import Stack from '$lib/components/layout/+stack.svelte';
    import { Direction } from '$lib/types';
  
</script>
  
<DropdownMenu id="users-dropdown">
  <span slot="button" class="users-dropdown border-highlight">
    {"Active Users"}
  </span>

  {#each $users as user}
  <Stack direction={Direction.Horizontal} wrap={true} spacing={0.3}>
    <Avatar userId={user.id} size={1.5} /> 
    <Text class="dropdown-item"> {user.first_name} {user.last_name}</Text>
  </Stack>
  {/each}
</DropdownMenu>

<style>

    :global(.dropdown-item) {
        padding: 0.5em;
        border-radius: 0.3em;
    }

    :global(.dropdown-item:hover) {
        background-color: var(--gray-1);
    }

    :global(.users-dropdown) {
      background-color: white;    
      padding: var(--default-padding);
      border-radius: 0.5em;
    }
</style>