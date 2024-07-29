<script>
    import '../global.css';
    import ContextMenu from '$lib/components/actions/+context-menu.svelte';
    import Analytics from '$lib/components/site-data/+analytics.svelte'; // Import the custom analytics component
</script>

<svelte:head>
    <title>aia</title>
</svelte:head>

<main>
    <div class="content">
        <slot />
    </div>
    <ContextMenu />
    <Analytics /> <!-- Use the custom analytics component here -->
</main>

<style>
    main {
        padding: 1em;
        background-color: var(--gray-1);
        display: flex;
        flex-direction: column;
        align-items: stretch;
        min-height: 100%;
    }

    .content {
        background-color: white;
        border-radius: 1em;
        padding: 1em;
        flex: 1;
        display: flex;
        flex-direction: column;
    }
</style>
