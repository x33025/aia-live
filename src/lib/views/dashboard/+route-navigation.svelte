<script lang="ts">
    import Text from '$lib/components/display/+text.svelte'; // Adjust the path as necessary
    import { goto } from '$app/navigation'; // Ensure you have the goto function imported
    import { TextType } from '$lib/types';
    import Button from '$lib/components/actions/+button.svelte';
    import Stack from '$lib/components/layout/+stack.svelte';
  
    export let route: string;
    export let emojis: string[];
    export let text: string;

    const emojiSize = 60; // Emoji size in pixels
    const containerSize = 100; // Container size in percentage
    const radius = (emojiSize / containerSize) * 100; // Minimum distance between emojis in percentage

    // Function to generate non-overlapping positions and rotations
    function getNonOverlappingStyles(count: number) {
        const positions = [];

        for (let i = 0; i < count; i++) {
            let top, left;
            let collision;
            do {
                collision = false;
                top = Math.random() * 80 + 10; // Random top position between 10% and 90%
                left = Math.random() * 80 + 10; // Random left position between 10% and 90%

                // Check for collisions with existing positions
                for (const pos of positions) {
                    const dx = left - pos.left;
                    const dy = top - pos.top;
                    if (Math.sqrt(dx * dx + dy * dy) < radius) {
                        collision = true;
                        break;
                    }
                }
            } while (collision);

            const rotation = (Math.random() * 90 - 45) + 'deg'; // Random rotation between -45 and 45 degrees
            positions.push({ top, left, rotation });
        }

        return positions.map(pos => `top: ${pos.top}%; left: ${pos.left}%; transform: rotate(${pos.rotation});`);
    }

    const styles = getNonOverlappingStyles(Math.min(emojis.length, 5));
</script>

<style>
  :global(.visual-container) {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: var(--gray-1); 
    border-radius: 0.5em;  
    padding: 1.25em;
    overflow: hidden; 
  }

  .emoji-bg {
    position: absolute;
    font-size: 3em; /* Adjust size */
    opacity: 0.2;
    pointer-events: none;
  }


</style>
  


   <Stack wrap={true} class="visual-container">
    <Button on:click={() => goto(route)}>
      {#each emojis.slice(0, 5) as emoji, i}
        <div class="emoji-bg" style={styles[i]}>{emoji}</div>
      {/each}

        <Text type={TextType.Title}>{text}</Text>
    </Button>
    </Stack>

