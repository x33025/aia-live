<script lang="ts">
import { onMount } from 'svelte';
import { article } from '$lib/stores/data/+articles'; 
import { page } from '$app/stores';
import { pb } from '$lib/config/pocketbase';
import type { Article } from '$lib/types';



onMount(() => {
  article.set($page.data.article);

  // Subscribe to real-time changes in the articles collection
  pb.collection('articles').subscribe('*', (e) => {
    if (e.action === 'update' && e.record.id === $page.data.article.id) {
      console.log('update', e.record);
      article.set(e.record as unknown as Article); // Update only if it's the current article
    } 
  });
});

</script>





<slot />

