<script lang="ts">
    import { sidebarVisible, closeSidebar } from '$lib/stores/ui/+sidebar';
    import { onMount } from 'svelte';
    import { fade, fly } from 'svelte/transition';

    $: visible = $sidebarVisible;

    // Handle body overflow based on sidebar visibility
    // Run only in the browser
    onMount(() => {
        $: {
            if (visible) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = 'auto';
            }
        }
    });
</script>

{#if visible}
    <!-- Optional: If you want to keep the click-to-close functionality, but without a visible backdrop -->
    <div class="sidebar-backdrop" on:click={closeSidebar}></div>
    
    <div class="sidebar" transition:fly|local={{ x: 1000, duration: 300 }}>
        <slot />
    </div>
{/if}

<style>
    /* Removed the background color from the backdrop */
    .sidebar-backdrop {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 999;
        /* No background color, so it will be invisible */
    }

    .sidebar {
        position: fixed;
        top: 0;
        right: 0;
        width: 25%; /* Set to 1/4th of the screen width */
        height: 100%;
        z-index: 1000;
        overflow-y: auto;
        box-shadow: -2px 0 5px rgba(0, 0, 0, 0.1);
        backdrop-filter: blur(10px); /* Apply blur only to the sidebar */
        background-color: rgba(255, 255, 255, 0.6); /* Optional: translucent color */
    }
</style>
