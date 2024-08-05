<script lang="ts">
  import { fade } from 'svelte/transition';
  import type { LayoutData } from './$types';
  import ArticleRow from '$lib/views/article/+article-row.svelte';
  
  export let data: LayoutData;
  
  // Initialize writers as an empty array
  let writers: UserWithRole[] = [];

  $: {
    console.log('LayoutData:', data);
    console.log('All Users:', data.allUsers);
    
    if (Array.isArray(data.allUsers)) {
      writers = data.allUsers.filter((user: UserWithRole) => {
        console.log('User being checked:', user);
        if (user.role) {
          console.log('User role:', user.role);
          return user.role.name === 'Writer';
        } else {
          console.log('User has no role:', user);
          return false;
        }
      });
    } else {
      console.error('data.allUsers is not an array:', data.allUsers);
      writers = [];
    }

    console.log('Filtered Writers:', writers);
  }
</script>

<div class="container">
  <div class="article-list">
    {#if data.articles && data.articles.length > 0}
      {#each data.articles as article, index}
        <ArticleRow 
          {article} 
          {writers} 
          categories={data.categories} 
          statuses={data.statuses}
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