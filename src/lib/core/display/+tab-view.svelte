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
    <Stack wrap={true} direction={Direction.Horizontal} spacing={0.5} style="margin-bottom: 0.5em;" >
        <slot name="header"></slot>
     
    </Stack>
     
     <Stack style="padding: 1em; " >
        <slot name="content"></slot>
      </Stack>

  </Stack>

  
  <style>
  

  </style>