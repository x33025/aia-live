<script lang="ts">
  import { activeUsers, sortedUsers } from '$lib/stores/data/+users';
  import DropdownMenu from '$lib/core/actions/+dropdown-menu.svelte';
  import Text from '$lib/core/display/+text.svelte';
  import Avatar from './+avatar.svelte';

  import { Direction } from '$lib/types';
</script>

<DropdownMenu id="users-dropdown">
  <span slot="button" class="users-dropdown border-highlight">
    {"Active Users"}
  </span>

  {#each $sortedUsers as user}
    <div class="dropdown-item" >
      <Avatar userId={user.id} size={1.75} /> 
      <Text> {user.first_name} {user.last_name}</Text>
      {#if $activeUsers.includes(user)}
        <span class="green-dot"></span>
      {/if}
    </div>
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

  :global(.green-dot) {
    display: inline-block;
    width: 0.5em;
    height: 0.5em;
    background-color: var(--green);
    border-radius: 50%;
    margin-left: 0.25em;
  }
</style>
