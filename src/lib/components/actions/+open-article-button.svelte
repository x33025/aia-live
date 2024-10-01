<script lang="ts">

    export let articleId: string | null = null;
  
  </script>

  <a href={`/protected/article/${articleId}`} class="open-article-button">
    Open Article
  </a>
  
  <style>
  .open-article-button {
      background-color: var(--blue);
      padding: var(--default-padding);
      border-radius: 0.5em;
      color: white;
      user-select: none; /* Prevent text selection */
    }
  </style>
  