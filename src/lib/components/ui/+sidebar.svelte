<script lang="ts">
    import { sidebarVisible, sidebarContent } from '$lib/stores/ui/+sidebar';
    import { fly } from 'svelte/transition';

    // Directly use the global store values
    $: visible = $sidebarVisible;
    $: SidebarComponent = $sidebarContent?.component || null;
    $: sidebarProps = $sidebarContent?.props || {};

    console.log("SidebarComponent:", SidebarComponent);
    console.log("sidebarProps:", sidebarProps);
    console.log("Sidebar visibility status:", visible);
</script>

{#if visible && SidebarComponent}
    <div class="sidebar-backdrop" on:click={() => sidebarVisible.set(false)}></div>
    <div class="sidebar" transition:fly="{{ x: 1000, duration: 400 }}">
        <svelte:component this={SidebarComponent} {...sidebarProps} />
    </div>
{/if}

<style>
    .sidebar-backdrop {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 500;
    }

    .sidebar {
        position: fixed;
        top: 0;
        right: 0;
        width: 25%;
        height: 100%;
        z-index: 700;
        overflow-y: auto;
        box-shadow: -2px 0 5px rgba(0, 0, 0, 0.1);
        backdrop-filter: blur(0.30em);
        background-color: rgba(145, 145, 145, 0.127);
       
    }
</style>
