<script lang="ts">
  
    import { Direction } from "$lib/types";
    import { timer, startTimer, stopTimer } from "$lib/stores/logic/+timer";
    import { onDestroy } from 'svelte';

    let elapsedTime = 0;
    let isStreaming = false;

    // Subscribe to the timer store to update values
    const unsubscribe = timer.subscribe(value => {
        elapsedTime = value.elapsedTime;
        isStreaming = value.isStreaming;
    });

    function toggleStream(): void {
        if (!isStreaming) {
            startTimer(); // Start the timer
        } else {
            stopTimer(); // Stop the timer
        }
    }

    // Clean up subscription on destroy to avoid memory leaks
    onDestroy(() => {
        unsubscribe();
        stopTimer(); // Ensure timer is stopped when component is destroyed
    });
</script>

<style>
    button {
        padding: 1em;
        cursor: pointer;
    }
</style>

<div class="stack" style="--direction: row;">
    <div class="timer-display">{elapsedTime}s</div>
    <button on:click={toggleStream}>
        {isStreaming ? 'Pause' : 'Start'}
    </button>
</div>