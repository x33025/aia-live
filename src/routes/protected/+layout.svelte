<script lang="ts">
  import { page } from '$app/stores';
  import MainLayout from '$lib/components/layout/+main-layout.svelte';
  import { onMount } from 'svelte';
  import { users } from '$lib/stores/+users';
  import Users from '$lib/views/user/+users.svelte';
  import Sidebar from '$lib/components/ui/+sidebar.svelte';
  import Modal from '$lib/components/ui/+modal.svelte';


  // Set users on mount
  onMount(() => {
    users.set($page.data.users);
  });
</script>

<MainLayout>
  <span slot="navigation">
      <Users />
  </span>

  <!-- Render the main content -->
  <slot />

    <Sidebar />



    <Modal />

</MainLayout>
