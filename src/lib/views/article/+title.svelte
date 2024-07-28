<!-- +title.svelte -->
<script lang="ts">
  import type { ArticleMetadata } from '@prisma/client'; // Assuming the Prisma types are generated here

  export let article: ArticleMetadata;

  // Ensure article has necessary properties
  if (!article.title) {
    article.title = '';
  }
</script>

<div class="title">
<input class="unstyled-input" type="text" bind:value={article.title} placeholder="Title" readonly />
</div>

<style>
.title {
  background-color: #ffecb3;
  border-radius: 0.5em;
  padding: 0.5em;
  flex: 1;
}

.unstyled-input {
  border: none;
  background-color: transparent;
  width: 100%;
  box-sizing: border-box;
  font-size: 1em;
  outline: none;
}

.unstyled-input::placeholder {
  color: black;
}
</style>
