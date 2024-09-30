<script lang="ts">
  import { activeUsers, sortedUsers } from '$lib/stores/data/+users';
  import DropdownMenu from '$lib/core/actions/+dropdown-menu.svelte';
  import Text from '$lib/core/display/+text.svelte';
  import Avatar from './+avatar.svelte';

  import { TextType } from '$lib/types';
</script>

<DropdownMenu id="users-dropdown">
  <div slot="button" class="users-dropdown border-highlight">
    {"Active Users"}
  </div>

  {#each $sortedUsers as user}
    <div class="stack dropdown-item" style="--direction: row; --gap: 0.5em; --align: center; --justify: flex-start;">
      <Avatar userId={user.id} size={1.75} /> 
      <Text type={TextType.Callout}> {user.first_name} {user.last_name}</Text>
      <div class="spacer"/>
      {#if $activeUsers.includes(user)}
        <div class="green-dot"></div>
      {/if}
    </div>
  {/each}
</DropdownMenu>

<style>
  .dropdown-item {
      padding: 0.5em;
      border-radius: 0.3em;
      cursor: pointer;
  width: 100%;
  }

  .dropdown-item:hover {
      background-color: var(--gray-1);
  }

  .users-dropdown {
    background-color: white;    
    padding: var(--default-padding);
    border-radius: 0.5em;
  }

  .green-dot {
    display: inline-block;
    width: 0.5em;
    height: 0.5em;
    background-color: var(--green);
    border-radius: 50%;
    margin-left: 0.25em;
  }
</style>
