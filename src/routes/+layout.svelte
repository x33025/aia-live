<script lang="ts">
  import '../styles/index.css';
  import '@x33025/components/styles/index.css';
  import { Sidebar } from '@x33025/components';
  import { Modal } from '@x33025/components';
  import { ContextMenu } from '@x33025/components';
    import { onMount } from 'svelte';


onMount(() => {

  alert('UNDER MAINTENANCE');
});
</script>



    <slot />
 

    <Sidebar  />



    <Modal />

    <ContextMenu />
