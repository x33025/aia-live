<script lang="ts">
  import { page } from '$app/stores';
  import MainLayout from '$lib/components/layout/+main-layout.svelte';
  import { onMount } from 'svelte';
  import { users } from '$lib/stores/+users';
  import Users from '$lib/views/user/+users.svelte';
  import Sidebar from '$lib/components/ui/+sidebar.svelte'; // Updated import
  import { sidebarContent, sidebarVisible } from '$lib/stores/ui/+sidebar';

  $: SidebarComponent = $sidebarContent?.component || null;
  $: sidebarProps = $sidebarContent?.props || {};

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

  <!-- Render the sidebar only if there is a SidebarComponent -->
  {#if SidebarComponent}
    <Sidebar {SidebarComponent} {sidebarProps} />
  {/if}
</MainLayout>
