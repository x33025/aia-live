<script lang="ts">
    import { sidebarVisible, closeSidebar } from '$lib/stores/ui/+sidebar';
    import { onMount } from 'svelte';
    import { fade, fly } from 'svelte/transition';

    export let SidebarComponent;  // The specific sidebar component to render
    export let sidebarProps = {}; // Props to pass to the sidebar component

    $: visible = $sidebarVisible;

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
    <div class="sidebar-backdrop" on:click={closeSidebar}></div>
    <div class="sidebar" transition:fly|local={{ x: 1000, duration: 420 }}>
        <svelte:component this={SidebarComponent} {...sidebarProps} />
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
        z-index: 500;
        /* No background color, so it will be invisible */
    }

    .sidebar {
        position: fixed;
        top: 0;
        right: 0;
        width: 25%; /* Set to 1/4th of the screen width */
        height: 100%;
        z-index: 750;
        overflow-y: auto;
        box-shadow: -2px 0 5px rgba(0, 0, 0, 0.1);
        backdrop-filter: blur(0.30em); /* Apply blur only to the sidebar */
        background-color: rgba(187, 187, 187, 0.061); /* Optional: translucent color */
    }
</style>
