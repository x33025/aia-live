<script lang="ts">
    import { users } from '$lib/stores/+users';
    import DropdownMenu from '$lib/components/actions/+dropdown-menu.svelte'; // Import the dropdown menu component
    import { onMount } from 'svelte';
    import type { User } from '$lib/types';
    import Text from '$lib/components/display/+text.svelte';
  
    // Helper function to get user initials
    function getInitials(user: User) {
      return `${user.first_name.charAt(0)}${user.last_name.charAt(0)}`;
    }
  
    onMount(() => {
      console.log(users);
    });
</script>
  
<!-- Button to display initials and dropdown -->
<DropdownMenu id="users-dropdown">
  <span slot="button" class="label">
    {"Active Users"}
  </span>

  {#each $users as user}
    <Text >{user.first_name} {user.last_name}</Text>
  {/each}
</DropdownMenu>
  
<style>


  :global(.initials) {

    display: inline-flex;
    justify-content: center;
    align-items: center;
    width: 2em;
    height: 2em;
    background-color: #ffffff; /* Adjust to your preferred background color */
    border-radius: 50%; /* Makes it a circle */
    font-weight: bold;
    color: #333; /* Adjust to your preferred text color */
  }

  .more-initials {
    font-weight: bold;
    color: #333;
  }
</style>
