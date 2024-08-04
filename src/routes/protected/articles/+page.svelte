<script lang="ts">
    import { fade } from 'svelte/transition';
    import type { LayoutData } from './$types';
    import ArticleRow from '$lib/views/article/+article-row.svelte'; // Adjust the import path as needed
    
    export let data: LayoutData;
    
  </script>
  
  
  <div class="container">
    <div class="article-list">
      {#if data.articles && data.articles.length > 0}
        {#each data.articles as article, index}
          <ArticleRow
            {article}
          
            categoryList={data.categories}
            statusList={data.statuses}
          />
          {#if index < data.articles.length - 1}
            <div class="divider"></div>
          {/if}
        {/each}
      {:else}
        <p>No articles available.</p>
      {/if}
    </div>
  </div>
  
  <style>
    .container {
      display: flex;
      flex-direction: column;
      height: 100vh;
    }
  
    .article-list {
      display: flex;
      flex-direction: column;
      gap: 1em;
      overflow-y: auto;
      flex-grow: 1;
    }
  
    .divider {
      height: 1px;
      background-color: #ddd;
      margin: 0.25em 0;
    }
  </style>
  