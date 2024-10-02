<script lang="ts">
  import type { Note } from "$lib/types";
  import NoteChip from "$lib/components/notes/+note-chip.svelte";
    export let notes: Note[] = [];
  </script>
  
  <style>
    :root {
      --item-width: 100%;
      --item-height: 1em;
      --item-spacing: 1.25em;
      --hover-height: calc((var(--item-height) + var(--item-spacing)) * 4);
    }
  
    .dropdown-stack {
      width: 300px;
      font-family: Arial, sans-serif;
      position: relative;
      height: var(--item-height);
      transition: height 0.3s ease;
      overflow: visible; /* Ensure overflow is visible for absolute positioning */
    }
  
    .dropdown-item {
      background-color: var(--gray-1);
      
      border-radius: 1em;
      position: absolute;
      left: 0;
      right: 0;
      height: var(--item-height);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1em;
      cursor: pointer;
      transition: top 0.3s ease, filter 0.3s ease, transform 0.3s ease;
    }
  
    .dropdown-item:nth-child(1) {
      top: 0;
      z-index: 3;
    }
  
    .dropdown-item:nth-child(2) {
      top: 0.3em; /* Adjusted for more compact idle stack */

      z-index: 2;
      filter: brightness(0.85); /* Adjusted for more compact idle stack */
      transform: scale(0.97);
    }
  
    .dropdown-item:nth-child(3) {
      top: 0.5em; /* Adjusted for more compact idle stack */
      z-index: 1;
      filter: brightness(0.7); /* Adjusted for more compact idle stack */
      transform: scale(0.95);
    }
  
  
    .dropdown-stack:hover {
      height: var(--item-height); /* Keep the height of one item */
    }
  
    .dropdown-stack:hover .dropdown-item {
      left: 0;
      right: 0;
      filter: brightness(1);
      transform: scale(1) translateY(0);
    }
  
    .dropdown-stack:hover .dropdown-item:nth-child(2) {
      top: calc(var(--item-height) + var(--item-spacing));
    }
  
    .dropdown-stack:hover .dropdown-item:nth-child(3) {
      top: calc((var(--item-height) + var(--item-spacing)) * 2);
    }
  
    .dropdown-stack:hover .dropdown-item:nth-child(4) {
      top: calc((var(--item-height) + var(--item-spacing)) * 3);
    }
  </style>
  
  <div class="dropdown-stack">
    {#each notes as note}
      <div class="dropdown-item" tabindex="0" role="button">
        <NoteChip note={note} />
      </div>
    {/each}
  </div>
