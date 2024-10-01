<script lang="ts">
import { onMount } from 'svelte';
import { article } from '$lib/stores/data/+articles'; 
import { page } from '$app/stores';

onMount(() => {

  
      article.set($page.data.article);
  
  });
</script>





<slot />

