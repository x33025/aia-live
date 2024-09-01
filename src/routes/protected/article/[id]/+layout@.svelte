<script lang="ts">
    import Sidebar from '$lib/components/ui/+sidebar.svelte';
    import { sidebarContent, sidebarVisible } from '$lib/stores/ui/+sidebar';
  
    // Reactive variables for the current sidebar component and its props
    $: SidebarComponent = $sidebarContent?.component || null;
    $: sidebarProps = $sidebarContent?.props || {};
  </script>
  
  <!-- Render the sidebar if a component is provided -->
  {#if SidebarComponent}
    <Sidebar {SidebarComponent} {sidebarProps} />
  {/if}
  
  <!-- Slot for main content -->
  <slot />
  