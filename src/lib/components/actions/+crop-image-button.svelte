<script lang="ts">
    import Stack from '$lib/core/layout/+stack.svelte';
    import Spacer from '$lib/core/layout/+spacer.svelte';
    import { Direction } from '$lib/types';

    function confirmCrop() {
        console.log("Confirming crop");
    }

    function closeModal() {
        console.log("Closing modal");
    }
</script>




<Stack direction={Direction.Horizontal}>
    <button type="button" on:click={closeModal}>Reset</button>
    <Spacer />
    <button type="button" on:click={confirmCrop}>Crop</button>
</Stack>