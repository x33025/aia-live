<script lang="ts">
    import { writable } from 'svelte/store';
    import { setContext } from 'svelte';

    import { Direction } from '$lib/types';
  
    export let defaultTab: string;
  
    let activeTab = writable(defaultTab);
  
    function showTab(tab: string) {
      activeTab.set(tab);
    }
  
    setContext('activeTab', activeTab);
    setContext('showTab', showTab);
  </script>
  
  <div class="stack" style="--direction: column; --justify: flex-start; --align: flex-start; " >
    <div class="stack"  style="margin-bottom: 0.5em;" >
        <slot name="header"></slot>
     
    </div>
     
     <div class="stack"  style="padding: 1em; " >
        <slot name="content"></slot>
      </div>

  </div>

  
  <style>
  

  </style>