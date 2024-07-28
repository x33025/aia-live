<script lang="ts">
  import type { Keyword } from '@prisma/client';

  export let keywords: Keyword[] = [];
</script>

<div class="keywords-container">
  {#each keywords as keyword (keyword.id)}
    <div class="keyword">{keyword.keyword}</div>
  {/each}
</div>

<style>
  .keywords-container {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5em;
    overflow-y: auto;
    max-height: 100%;
    background-color: white;
  }

  .keyword {
    padding: 0.5em;
    background-color: var(--gray-1);
    color: black;
    border-radius: 0.5em;
    white-space: nowrap;
    outline: none;
  }

  p {
    margin: 0;
  }
</style>
