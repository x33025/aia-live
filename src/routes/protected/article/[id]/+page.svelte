<script lang="ts">
    import { page } from '$app/stores';
    import Stack from '$lib/components/layout/+stack.svelte';

</script>
  
<Stack spacing={1}>
   
    <p>{$page.data.article.title}</p>
    <p>{$page.data.article.content}</p>
  
</Stack>
  
  
  