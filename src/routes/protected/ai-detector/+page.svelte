<script lang="ts">
    import TextEditor from '$lib/core/advanced-input/editor/+text-editor.svelte';
    import Stack from '$lib/core/layout/+stack.svelte';
    import { Direction } from '$lib/types';
    import { v4 as uuidv4 } from 'uuid'; // Import the uuid generator
    let inputText = '';
    let detectionResult = '';

    async function detectAIContent() {
        try {
            const response = await fetch('/protected/ai-detector', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ textToCheck: inputText })
            });

            if (!response.ok) {
                throw new Error('Failed to detect AI content');
            }

            const result = await response.json();
            detectionResult = JSON.stringify(result, null, 2); // Store the result for display
        } catch (error: any) {
            detectionResult = 'Error: ' + error.message;
        }
    }

    function handlePublishUpdate(updatedContent: string) {
        inputText = updatedContent;
    }

    function handleSelectionChange(selection: { text: string; start: number; end: number; } | null) {
        if (selection) {
            console.log('Selection changed:', selection.text);
        } else {
            console.log('Selection cleared');
        }
    }
</script>

<Stack direction={Direction.Horizontal}>
    <Stack direction={Direction.Vertical}>
        <TextEditor 
        bind:content={inputText} 
        placeholder="Enter text here..." 
        onPublishUpdate={handlePublishUpdate} 
        onSelectionChange={handleSelectionChange} 
    />
    {#if detectionResult}
    {detectionResult}
{/if}
    </Stack>

<button on:click={detectAIContent}>Detect</button>



</Stack>


<style>
    button {
        margin-top: 1rem;
    }
</style>
