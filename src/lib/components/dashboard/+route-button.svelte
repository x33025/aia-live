<script lang="ts">
    import * as d3 from 'd3';
    import Text from '$lib/core-components/display/+text.svelte';
    import { goto } from '$app/navigation';
    import { TextType } from '$lib/types';
    import { tweened } from 'svelte/motion';
    import { cubicOut } from 'svelte/easing';

    export let route: string;
    export let emojis: string[];
    export let text: string;

    interface Position {
        x: number;
        y: number;
    }

    const emojiSize = 60;  // This is the size of each emoji in pixels
    const containerSize = 100; // Container size in percentage

    let styles: string[] = []; // Emoji styles for positioning

    // Function to get random non-overlapping styles within the text container
    function getNonOverlappingStyles(count: number) {
        const minPosition = -50;  // Minimum percentage for top and left
        const maxPosition = 100;  // Maximum percentage for top and left
        const minDistance = 50;   // Minimum distance between emojis to avoid overlap

        const positions: Position[]  = [];

        // Helper function to check if a new emoji position overlaps with existing ones
        function isOverlapping(newX: number, newY: number) {
            return positions.some(({ x, y }) => {
                const distX = Math.abs(newX - x);
                const distY = Math.abs(newY - y);
                return distX < minDistance && distY < minDistance;
            });
        }

        return d3.range(count).map((d, i) => {
            let x, y;

            // Generate random positions until no overlap is found
            do {
                x = Math.random() * (maxPosition - minPosition) + minPosition; // Random x between 0% and 100%
                y = Math.random() * (maxPosition - minPosition) + minPosition; // Random y between 0% and 100%
            } while (isOverlapping(x, y)); // Retry if overlapping

            // Save the position to prevent future overlaps
            positions.push({ x, y });

            const rotation = (Math.random() * 90 - 45) + 'deg'; // Random rotation between -45deg and 45deg

            return `top: ${y}%; left: ${x}%; transform: rotate(${rotation});`;
        });
    }

    // Gradual loading of emoji positions
    function loadEmojiStyles() {
        styles = []; // Clear existing styles
        emojis.forEach((emoji, i) => {
            setTimeout(() => {
                styles = [...styles, getNonOverlappingStyles(emojis.length)[i]];
            }, i * 150); // Add a delay for each emoji
        });
    }

    // Trigger the loading of styles when component mounts
    loadEmojiStyles();
</script>

<style>
  .visual-container {
    position: relative;
    display: flex;
    align-items: center;
    background-color: var(--gray-1);
    border-radius: 0.5em;
    padding: var(--large-padding);
    overflow: hidden;
    cursor: pointer;
  }

  .emoji-bg {
    position: absolute;
    font-size: 3em;
    opacity: 0;
    pointer-events: none;
    transition: opacity 0.5s ease-in-out, transform 0.5s cubic-bezier(0.68, -0.55, 0.27, 1.55);
  }

  .emoji-bg.show {
    opacity: 0.2; /* Set opacity to 0.2 when emoji is shown */
  }

  .text-container {
    z-index: 1; /* Ensure the text is on top of the emojis */
    position: relative; /* Ensure text-container is the reference for absolute positioning */
    width: 100%;
  }
</style>

<!-- Stack is now clickable, no need for a Button -->
<button class="visual-container" on:click={() => goto(route)} on:keydown={(e) => e.key === 'Enter' && goto(route)}>
    {#each emojis as emoji, i}
        <div class="emoji-bg" style="{styles[i]}" class:show={styles[i]}>{emoji}</div>
    {/each}
    <div class="text-container">
      <Text type={TextType.Title}>{text}</Text>
    </div>
</button>
