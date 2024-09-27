<script lang="ts">
    import { sidebarVisible, sidebarContent } from '$lib/stores/ui/+sidebar';
    import { fly, fade } from 'svelte/transition';
    import { SidebarOrientation } from '$lib/types';

    // Directly use the global store values
    $: visible = $sidebarVisible;
    $: SidebarComponent = $sidebarContent?.component || null;
    $: sidebarProps = $sidebarContent?.props || {};
    $: sidebarOrientation = $sidebarContent?.orientation || SidebarOrientation.Right;

    
</script>

{#if visible && SidebarComponent}
    <button class="sidebar-backdrop" 
         on:click={() => sidebarVisible.set(false)} 
         on:keydown={(e) => e.key === 'Enter' && sidebarVisible.set(false)}
         aria-label="Close sidebar"
         transition:fade>
    </button>
    <div class="sidebar {sidebarOrientation}" transition:fly="{{ x: 1000, duration: 400 }}">
        <svelte:component this={SidebarComponent} {...(sidebarProps || {})} />

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
        background-color: rgba(0, 0, 0, 0.5);
    }

    .sidebar.right {
        position: fixed;
        top: 0;
        right: 0;
        width: 25%;
        height: 100%;
        z-index: 700;
        overflow-y: auto;
        box-shadow: -2px 0 5px rgba(0, 0, 0, 0.1);

        background-color: white;
       
    }

    .sidebar.bottom  {
        position: fixed;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 25%;
        z-index: 700;
        overflow-y: auto;
        box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
        background-color: white;
    }
</style>