<script>
    import TextEditor from '$lib/components/advanced-input/editor/+text-editor.svelte';
    let inputText = '';

    function handleButtonClick() {
        // Add your AI detection logic here
        console.log('Button clicked with input:', inputText);
    }

    function handlePublishUpdate(updatedContent) {
        inputText = updatedContent;
    }

    function handleSelectionChange(selection) {
        console.log('Selection changed:', selection);
    }
</script>


    <TextEditor 
        bind:content={inputText} 
        placeholder="Enter text here..." 
        onPublishUpdate={handlePublishUpdate} 
        onSelectionChange={handleSelectionChange} 
    />
    <button on:click={handleButtonClick}>Detect</button>


<style>

    button {
        margin-top: 1rem;
    }
</style>