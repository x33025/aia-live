<script lang="ts">
    import { sidebarVisible } from '$lib/stores/ui/+sidebar';
    import type { ComponentType } from 'svelte';
    import { fly } from 'svelte/transition';

    export let SidebarComponent: ComponentType;
    export let sidebarProps: Record<string, any> = {};

    $: visible = $sidebarVisible;
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
        z-index: 750;
    }

    .sidebar {
        position: fixed;
        top: 0;
        right: 0;
        width: 25%;
        height: 100%;
        z-index: 500;
        overflow-y: auto;
        box-shadow: -2px 0 5px rgba(0, 0, 0, 0.1);
        backdrop-filter: blur(0.30em);
        background-color: rgba(187, 187, 187, 0.061);
    }
</style>
