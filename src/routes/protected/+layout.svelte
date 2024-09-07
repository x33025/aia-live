<script lang="ts">
  import { page } from '$app/stores';
  import MainLayout from '$lib/components/layout/+main-layout.svelte';
  import { onMount } from 'svelte';
  import { users } from '$lib/stores/+users';
  import Users from '$lib/views/user/+users.svelte';
    import { derived } from 'svelte/store';


  // Set users on mount
  onMount(() => {
    users.set($page.data.users);
  });

  const title = derived(page, $page => $page.data.title);
</script>

<MainLayout>


  <svelte:fragment slot="navigation-trailing">
      <Users />
</svelte:fragment>

  <!-- Render the main content -->
  <slot />


</MainLayout>
