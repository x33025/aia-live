<script lang="ts">

    function confirmCrop() {
        console.log("Confirming crop");
    }

    function closeModal() {
        console.log("Closing modal");
    }
</script>




<div class="stack" style="--direction: row; --justify: space-between;">
    <button type="button" on:click={closeModal}>Reset</button>
    <spacer />
    <button type="button" on:click={confirmCrop}>Crop</button>
</div>