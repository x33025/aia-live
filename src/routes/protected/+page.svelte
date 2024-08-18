<script lang="ts">
  import Stack from '$lib/components/layout/+stack.svelte';
  import { page } from '$app/stores';
  import Text from '$lib/components/display/+text.svelte';
    import { TextType } from '$lib/types';


</script>

<Stack>
  <Text type={TextType.Title}>Welcome, {$page.data.user.first_name}!</Text>
  <a href="/protected/keywords">Keywords</a>
  <a href="/protected/articles">Articles</a>
</Stack>
