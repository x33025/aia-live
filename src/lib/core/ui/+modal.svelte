<script lang="ts">
    import { modalVisible, modalContent } from '$lib/stores/ui/+modal';
    import Text from '$lib/core/display/+text.svelte';
    import { TextType } from '$lib/types';
    import XMark from '$lib/core/ui/icons/+x-mark.svelte';

    // Access global store values
    $: visible = $modalVisible;
    $: ModalComponent = $modalContent?.component || null;
    $: modalProps = $modalContent?.props || {};
    $: modalHeader = $modalContent?.header || '';
    $: ModalFooter = $modalContent?.footer || null; // New footer property
    $: modalFooterProps = $modalContent?.footerProps || {};
</script>

{#if visible && ModalComponent}
    <button
        class="modal-backdrop"
        on:click={() => modalVisible.set(false)}
        on:keydown={(e) => e.key === 'Escape' && modalVisible.set(false)}
        aria-label="Close modal">
    </button>

    <div class="modal">
        <!-- Header -->
        <div class="modal-header">
            <div class="header-content">
                <Text type={TextType.Title}>{modalHeader}</Text>
                <spacer />
                <button class="close-button" on:click={() => modalVisible.set(false)}>
                    <XMark size={1} />
                </button>
            </div>
        </div>

        <!-- Content -->
        <div class="modal-content">
            <svelte:component this={ModalComponent} {...(modalProps || {})} />
        </div>

        <!-- Footer -->
        {#if ModalFooter}
            <div class="modal-footer">
                <svelte:component this={ModalFooter} {...(modalFooterProps || {})} />
            </div>
        {/if}
    </div>
{/if}

<style>
    .modal-backdrop {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.5);
        z-index: 500;
        border: none;
        padding: 0;
    }

    .modal {
        position: fixed;
        top: 10%;
        left: 10%;
        width: 80%;
        height: 80%;
        z-index: 700;
        background-color: white;
        box-shadow: 0 4px 10px rgba(0, 0, 0, 0.5);
        border-radius: 1em;
        display: flex;
        flex-direction: column;
    }

    /* Header and Footer Styling */
    .modal-header,
    .modal-footer {
        background-color: white;
      
        z-index: 1;
        padding: 1em;
    }

    .modal-header {
        border-radius: 1em 1em 0 0;
    }

    .modal-footer {
        border-radius: 0 0 1em 1em;
    }

    .modal-header {
        position: sticky;
        top: 0;
    }

    .modal-footer {
        position: sticky;
        bottom: 0;
        /* Add a shadow to visually separate footer from content */
        box-shadow: 0 -4px 8px rgba(0, 0, 0, 0.1);
    }

    /* Content Styling */
    .modal-content {
        flex: 1;
        overflow-y: auto;
        padding: 1em;
    }

    /* Header Content Alignment */
    .header-content {
        display: flex;
        align-items: center;
    }

    .header-content .spacer {
        flex: 1;
    }

    /* Close Button Styling */
    .close-button {
        background: none;
        border: none;
        cursor: pointer;
    }
</style>
