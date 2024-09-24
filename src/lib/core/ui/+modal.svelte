<script lang="ts">
    import { modalVisible, modalContent } from '$lib/stores/ui/+modal';
    import { fly } from 'svelte/transition';
    import Text from '$lib/core/display/+text.svelte';
    import { Direction, TextType } from '$lib/types';
    import Stack from '$lib/core/layout/+stack.svelte';
    import Spacer from '$lib/core/layout/+spacer.svelte';
    import XMark from '$lib/core/ui/icons/+x-mark.svelte';
    // Directly use the global store values
    $: visible = $modalVisible;
    $: ModalComponent = $modalContent?.component || null;
    $: modalProps = $modalContent?.props || {};
    $: modalHeader = $modalContent?.header || ''; // New header property

</script>

{#if visible && ModalComponent}
    <button class="modal-backdrop" 
            on:click={() => modalVisible.set(false)} 
            on:keydown={(e) => e.key === 'Escape' && modalVisible.set(false)} 
            aria-label="Close modal">
    </button>
   
      
        <div class="modal">
     <Stack direction={Direction.Vertical}  wrap={true}>

    
            <Stack direction={Direction.Horizontal}  wrap={true}>
                <Text type={TextType.Title}>{modalHeader}</Text> 
                <Spacer />
                <button on:click={() => modalVisible.set(false)}>
                   <XMark size={1} />
                </button>
            </Stack>
            <svelte:component this={ModalComponent} {...(modalProps || {})} />
        </Stack>
        </div>
  
 
{/if}

<style>
    .modal-backdrop {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.5); /* Dim background */
        z-index: 500;
        border: none; /* Remove default button border */
        padding: 0; /* Remove default button padding */
    }

    .modal {
        position: fixed;
        top: 10%;
        left: 10%;
        width: 80%;  /* 80% of screen width */
        height: 80%; /* 80% of screen height */
        z-index: 700;
        background-color: white;
        box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
        border-radius: 1em;
        overflow-y: auto; /* Re-enabled to allow scrolling */
       padding: 1em;
    }


</style>