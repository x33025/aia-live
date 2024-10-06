<script lang="ts">
  import '../styles/index.css';
  import Sidebar from '$lib/core/ui/+sidebar.svelte';
  import Modal from '$lib/core/ui/+modal.svelte';
  import ContextMenu from '$lib/core/ui/+context-menu.svelte';

</script>



    <slot />
 

    <Sidebar  />



    <Modal />

    <ContextMenu />
