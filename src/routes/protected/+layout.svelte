<script lang="ts">
    import { page } from '$app/stores';
    import Layout from '$lib/components/layout/+layout.svelte';
    import { onMount } from 'svelte';
    import { users } from '$lib/stores/+users';
    import Users from '$lib/views/user/+users.svelte';
    import Button from '$lib/components/actions/+button.svelte';
    import Gear from '$lib/components/ui/icons/+gear.svelte';
    import DropdownMenu from '$lib/components/actions/+dropdown-menu.svelte';
  
    onMount(() => { users.set($page.data.users); });
  
    function handleLogout() {
      console.log("logging out");
    }
  </script>
  
  <Layout>
    <!-- Navigation content for the 'navigation' slot -->
    <span slot="navigation">
      <Users />
  
      <!-- <DropdownMenu id="user-menu">
        <span slot="button">
          <Gear size={"1.5em"} color={"var(--gray-4)"} />
        </span>
  
        <Button on:click={handleLogout}>Log Out</Button>
      </DropdownMenu> -->
    </span>
  
    <slot />
  </Layout>
  
