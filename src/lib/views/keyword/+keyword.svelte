<script lang="ts">
    import Input from '$lib/components/layout/+input.svelte';
    import type { Keyword } from '@prisma/client'; // Adjust import based on your actual model
    import { TextType } from '$lib/types';
  
    export let keyword: Keyword; // Ensure this matches your model
    const textType = TextType.Body;
  
    // Ensure keyword has necessary properties
    if (!keyword.keyword) {
        keyword.keyword = '';
    }
  </script>
  
  <Input 
      type={textType}
      className="custom-keyword-class"
      bind:value={keyword.keyword}
      placeholder="Keyword"
  />
  
  <style>
    :global(.custom-keyword-class) {
      background-color: #e0f7fa; /* Change color to distinguish it from the title */
      border-radius: 0.5em;
      padding: 0.5em;
      flex: 1;
      display: block;
    }
  </style>
  