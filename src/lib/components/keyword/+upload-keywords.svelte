<script lang="ts">
    import ArrowUpDocument from '$lib/core/ui/icons/+arrow-up-document.svelte';

    let file: File | null = null;

    function handleFileChange(event: Event) {
        const input = event.target as HTMLInputElement;
        if (input.files && input.files.length > 0) {
            file = input.files[0];
        }
    }
    
</script>

<button class="stack upload-keywords" on:click={handleFileChange}>
    <ArrowUpDocument size={1.35} color="white" />
</button>

<style>
    .upload-keywords {
       background-color: var(--blue);
       padding: 0.5em;
       border-radius: 0.5em;
    }
</style>