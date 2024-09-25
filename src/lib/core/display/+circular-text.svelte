<script lang="ts">
    import { onMount } from 'svelte';
    
    // Define the component's props with TypeScript
    export let text: string = 'Circular Text';
    export let fontSize: number = 0.001; // In rem units
    export let characterWidth: number = 0.001; // Default in "ch" units
  
    let totalChars: number = text.length;
    let fallbackRadius: number | null = null;
  
    // Fallback calculation in case CSS doesn't support trigonometric functions
    onMount(() => {
      const canTrig = CSS.supports('(top: calc(sin(1) * 1px))');
      if (!canTrig) {
        const innerAngle = 360 / totalChars;
        fallbackRadius = characterWidth / Math.sin(innerAngle / (180 / Math.PI));
      }
    });
  </script>
  
  <style>
    .text-ring {
      position: relative;
    }
  
    .text-ring span {
      font-size: calc(var(--font-size, 2) * 1rem);
      position: absolute;
      top: 50%;
      left: 50%;
      transform:
        translate(-50%, -50%)
        rotate(calc(360deg / var(--total) * var(--index)))
        translateY(var(--radius, -5ch));
    }
  
    @keyframes spin {
      to {
        rotate: -360deg;
      }
    }
  </style>
  
  <div
    class="text-ring"
    style="--total: {totalChars}; --character-width: {characterWidth}; --font-size: {fontSize}; --radius: {fallbackRadius || 'calc(1 / sin(360deg / var(--total)) * -1ch)'}"
  >
    {#each text.split('') as char, i}
      <span style="--index: {i}">{char}</span>
    {/each}
    <slot />
  </div>
  

  