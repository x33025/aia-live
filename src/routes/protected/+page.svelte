<script lang="ts">
  import Stack from '$lib/components/layout/+stack.svelte';
  import { goto } from '$app/navigation';
  import Button from '$lib/components/actions/+button.svelte';
    import { page } from '$app/stores';
    import Layout from '$lib/components/layout/+layout.svelte';
    import { onMount } from 'svelte';
    import { users } from '$lib/stores/+users';
    import Users from '$lib/views/user/+users.svelte';

    onMount(() => { users.set($page.data.users); });
</script>



  <Stack spacing={0.5}>
    <Button className="label" on:click={() => goto('/protected/keywords')}>Keywords</Button>
    <Button className="label" on:click={() => goto('/protected/articles')}>Articles</Button>
  </Stack>


<style>

</style>
