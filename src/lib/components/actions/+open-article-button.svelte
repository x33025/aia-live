<script lang="ts">
    import { goto } from '$app/navigation';
    export let articleId: string | null = null;
  
    function openArticle() {
      if (articleId) {
        goto(`/protected/article/${articleId}`);
      } else {
        console.warn('Article ID is missing');
      }
    }
  </script>
  
  <button on:click={openArticle} class="open-article-button">
    Open Article
  </button>
  
  <style>
    :global(.open-article-button) {
      background-color: var(--blue);
      padding: var(--default-padding);
      border-radius: 0.5em;
      color: white;
    }
  </style>
  