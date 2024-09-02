<script lang="ts">
    import Modal from '$lib/components/ui/+modal.svelte';
    import Sidebar from '$lib/components/ui/+sidebar.svelte';
  

  </script>
  
  <!-- Render the sidebar if a component is provided -->

    <Sidebar  />



  <Modal />

  
  <!-- Slot for main content -->
  <slot />
  