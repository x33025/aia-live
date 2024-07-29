<script lang="ts">
    import { onMount } from 'svelte';
    import { contextMenuStore } from '$lib/stores/+context-menu';
    
    let contextMenuElement: HTMLDivElement | null = null;
  
    let menuVisible = false;
    let menuItems: Array<{ label: string, action: () => void }> = [];
    let position = { top: 0, left: 0 };
    let data: any = null;
  
    // Subscribe to the context menu store
    const unsubscribe = contextMenuStore.subscribe(({ visible, items, pos, data: menuData }) => {
      menuVisible = visible;
      menuItems = items;
      position = pos;
      data = menuData;
      if (contextMenuElement) {
        contextMenuElement.style.top = `${position.top}px`;
        contextMenuElement.style.left = `${position.left}px`;
      }
    });
  
    onMount(() => {
      document.addEventListener('click', handleDocumentClick);
      return () => {
        document.removeEventListener('click', handleDocumentClick);
        unsubscribe();
      };
    });
  
    function handleDocumentClick(event: MouseEvent) {
      if (menuVisible && contextMenuElement && !contextMenuElement.contains(event.target as Node)) {
        contextMenuStore.hide();
      }
    }
  
    function handleItemClick(action: () => void) {
      action();
      contextMenuStore.hide();
    }
  </script>
  
  {#if menuVisible}
    <div class="context-menu" bind:this={contextMenuElement} style="top: {position.top}px; left: {position.left}px;">
      {#each menuItems as item}
        <div class="menu-item" role="button" tabindex="0" on:click={() => handleItemClick(item.action)}>
          {item.label}
        </div>
      {/each}
    </div>
  {/if}
  
  <style>
    .context-menu {
      position: absolute;
      background-color: white;
      border: 1px solid #ccc;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
      z-index: 1000;
      display: flex;
      flex-direction: column;
    }
  
    .menu-item {
      padding: 0.5em 1em;
      cursor: pointer;
    }
  
    .menu-item:hover, .menu-item:focus {
      background-color: #f0f0f0;
    }
  </style>
  