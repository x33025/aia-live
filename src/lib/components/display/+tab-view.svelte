<script lang="ts">
    import { writable } from 'svelte/store';
    import { setContext } from 'svelte';
    import Stack from '../layout/+stack.svelte';
    import { Direction } from '$lib/types';
  
    export let defaultTab: string;
  
    let activeTab = writable(defaultTab);
  
    function showTab(tab: string) {
      activeTab.set(tab);
    }
  
    setContext('activeTab', activeTab);
    setContext('showTab', showTab);
  </script>
  
  <Stack direction={Direction.Vertical}>
    <Stack wrap={true} direction={Direction.Horizontal}  >
        <slot name="header"></slot>
     
    </Stack>
     
     <Stack style="border: 1px solid var(--gray-2); padding: 1em; border-radius: 0.5em;" >
        <slot name="content"></slot>
      </Stack>

  </Stack>

  
  <style>
  
    .tab-header {
      display: flex;
      justify-content: flex-start;
      gap: 0.5em;
      padding: 0.5em;
      margin-bottom: 1em;
      background-color: white;
      border-radius: 1em;
    }
  
    .tab-content {
      flex: 1;
      overflow: hidden;
      border-radius: 1em;
      background-color: white;
      margin-bottom: 1em;
    }
  </style>