<script lang="ts">
    import { contextMenuStore, closeContextMenu } from '$lib/stores/ui/+context-menu';
    import { onMount } from 'svelte';
    import type { ContextMenuState } from '$lib/stores/ui/+context-menu';
  
    let contextMenu: ContextMenuState;
    let menu: HTMLDivElement | null = null;
  
    // Subscribe to the store
    const unsubscribe = contextMenuStore.subscribe(value => {
      contextMenu = value;
    });
  
    // Handle clicks outside the menu to close it
    const handleClickOutside = (event: MouseEvent) => {
      if (menu && !menu.contains(event.target as Node)) {
        closeContextMenu();
      }
    };
  
    onMount(() => {
      document.addEventListener('click', handleClickOutside);
      return () => {
        document.removeEventListener('click', handleClickOutside);
        unsubscribe();
      };
    });
  </script>
  
  {#if contextMenu.show}
    <div bind:this={menu} class="context-menu" style="top: {contextMenu.y}px; left: {contextMenu.x}px;">
      <ul>
        {#each contextMenu.options as option (option.label)}
          <li on:click={() => { option.action(); closeContextMenu(); }}>{option.label}</li>
        {/each}
      </ul>
    </div>
  {/if}
  
  <style>
    .context-menu {
      position: absolute;
      background-color: white;
      border: 1px solid #ccc;
      z-index: 1000;
      width: 150px;
    }
  
    .context-menu ul {
      list-style: none;
      padding: 0;
      margin: 0;
    }
  
    .context-menu ul li {
      padding: 8px;
      cursor: pointer;
    }
  
    .context-menu ul li:hover {
      background-color: #f0f0f0;
    }
  </style>
  