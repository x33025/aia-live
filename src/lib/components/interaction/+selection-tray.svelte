<script lang="ts">
    import { selectedKeywords } from '$lib/stores/data/+keywords';
    import TrayIcon from '$lib/core/ui/icons/+tray.svelte';
    import TrayFullIcon from '$lib/core/ui/icons/+tray-full.svelte';
</script>

<div class="stack tray-container border-highlight" >
    {#if $selectedKeywords.length > 0}
        <div class="stack" >
            <TrayFullIcon size={1.3} color="var(--gray-6)"/>
            <p class="selected-keywords-count callout">{$selectedKeywords.length}</p>
        </div>
    {:else}
        <TrayIcon size={1.3} color="var(--gray-6)"/>
    {/if}
   
    
    
</div>


<style>
    .tray-container {
       
        background-color: white;
        padding: var(--default-padding);
        border-radius: 0.5em;

    }
    .selected-keywords-count {
      
        color: var(--blue);
        font-weight: bold;
        position: relative;
    }
</style>