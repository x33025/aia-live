<script lang="ts">
    import { users } from '$lib/stores/+users';
    import DropdownMenu from '$lib/components/actions/+dropdown-menu.svelte';
    import Text from '$lib/components/display/+text.svelte';
  
</script>
  
<DropdownMenu id="users-dropdown">
  <span slot="button" class="users-dropdown border-highlight">
    {"Active Users"}
  </span>

  {#each $users as user}
    <Text class="dropdown-item">{user.first_name} {user.last_name}</Text>
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