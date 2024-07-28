<script lang="ts">
    import { fade } from 'svelte/transition';
    import type { ArticleMetadata } from '@prisma/client';
    import ArticleRow from '$lib/views/article/+article-row.svelte'; // Adjust the import path as needed
  
    export let data: { articles: ArticleMetadata[] };
  </script>
  
  <main>
    <div class="vstack">
    <h1>Articles</h1>
  

        <div class="article-list">
          {#if data.articles.length > 0}
            {#each data.articles as article, index}
              <ArticleRow {article} />
              {#if index < data.articles.length - 1}
                <div class="divider"></div>
              {/if}
            {/each}
          {:else}
            <p>No articles available.</p>
          {/if}
        </div>
      </div>
  </main>
  
  <style>
    main {
      display: flex;
      flex-direction: column;
      gap: 1em;

      position: relative;

    }
  
    .vstack {
      display: flex;
      flex-direction: column;
      gap: 1em;
      height: 100%;
    }    
    .article-list {
      display: flex;
      flex-direction: column;
      gap: 1em;
      overflow-y: auto;
      -webkit-overflow-scrolling: touch;
      width: 100%;
      height: 100%;
    }
  
    .divider {
      height: 1px;
      background-color: #ddd;
      margin: 0.25em 0;
    }
  
  </style>
  