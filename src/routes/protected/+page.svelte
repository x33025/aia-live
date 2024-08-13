<script lang="ts">
  import Stack from '$lib/components/layout/+stack.svelte';
  import { page } from '$app/stores';
    import Text from '$lib/components/display/+text.svelte';

  
  let firstName: string | undefined;

  $: {
    firstName = $page.data.user?.first_name;
  }
</script>

<Stack>
  <Text>Welcome, {firstName}!</Text>
  <a href="/protected/keywords">Keywords</a>
  <a href="/protected/articles">Articles</a>
</Stack>
