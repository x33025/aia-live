<script lang="ts">
    import { users } from '$lib/stores/+users';
    import DropdownMenu from '$lib/components/actions/+dropdown-menu.svelte';
    import Text from '$lib/components/display/+text.svelte';
  
</script>
  
<DropdownMenu id="users-dropdown">
  <span slot="button" style="background-color: white; padding: 0.5em; border-radius: 0.5em;">
    {"Active Users"}
  </span>

  {#each $users as user}
    <Text >{user.first_name} {user.last_name}</Text>
  {/each}
</DropdownMenu>
