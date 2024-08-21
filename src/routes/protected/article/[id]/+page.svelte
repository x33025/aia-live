<script lang="ts">
    import { page } from '$app/stores';
    import Stack from '$lib/components/layout/+stack.svelte';
    import Body from '$lib/views/article/[id]/+body.svelte';

    function publishUpdate(updatedContent: string) {
    // Handle the published update (e.g., send to backend)
    console.log("Publishing update:", updatedContent);
  }

</script>
  
<Stack>
   
    <p>{$page.data.article.title}</p>
   <Body content={$page.data.article.content} onPublishUpdate={publishUpdate} />
  
</Stack>
  
  
  