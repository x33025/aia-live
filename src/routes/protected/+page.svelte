<script lang="ts">
  import Stack from '$lib/components/layout/+stack.svelte';
  import { goto } from '$app/navigation';
  import Button from '$lib/components/actions/+button.svelte';

  
</script>



  <Stack spacing={0.5}>
    <Button className="label" on:click={() => goto('/protected/keywords')}>Keywords</Button>
    <Button className="label" on:click={() => goto('/protected/articles')}>Articles</Button>
  </Stack>


<style>

</style>
