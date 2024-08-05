<!-- +title.svelte -->
<script lang="ts">
  import Input from '$lib/components/layout/+input.svelte';
  import type { ArticleMetadata } from '@prisma/client';
  import { TextType } from '$lib/types';
  
  export let article: ArticleMetadata;
  const textType = TextType.Body;
  
  // Ensure article has necessary properties
  if (!article.title) {
      article.title = '';
  }
  </script>
  
  <Input 
      type={textType}
      className="metadata-title"
      bind:value={article.title}
      placeholder="Title"
  />
  
  <style>
  :global(.metadata-title) {
      background-color: #ffecb3;
      border-radius: 0.5em;
      padding: 0.5em;
      flex: 1;
      display: block;
      width: 100%;
  }
  </style>