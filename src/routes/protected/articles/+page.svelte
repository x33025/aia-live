<script lang="ts">
    import { fade } from 'svelte/transition';
    import type { ArticleMetadata } from '@prisma/client';
    import ArticleRow from '$lib/views/article/+article-row.svelte'; // Adjust the import path as needed
  
    export let data: { articles: ArticleMetadata[] };
  </script>
  
  <main>
    <div class="vstack">
      <div class="header">
        <h1>Articles</h1>
      </div>
      <div class="content" transition:fade={{ duration: 300 }}>
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
    </div>
  </main>
  
  <style>
    main {
      display: flex;
      flex-direction: column;
      gap: 1em;
      height: 100vh;
      position: relative;
      background-color: var(--gray-1);
      padding: 1em;
    }
  
    .vstack {
      display: flex;
      flex-direction: column;
      gap: 1em;
      height: 100%;
    }
  
    .header {
      padding: 1em;
      background-color: var(--gray-2);
      border-radius: 1em;
    }
  
    .content {
      display: flex;
      flex-direction: column;
      gap: 1em;
      height: 100%;
      background-color: white;
      border-radius: 1em;
      padding: 1em;
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
      margin: 0.5em 0;
    }
  
    p {
      margin: 0;
    }
  </style>
  