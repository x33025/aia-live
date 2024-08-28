<script lang="ts">
    import { page } from '$app/stores';
    import Layout from '$lib/components/layout/+main-layout.svelte';
    import { onMount } from 'svelte';
    import { users } from '$lib/stores/+users';
    import Users from '$lib/views/user/+users.svelte';

  
    onMount(() => { users.set($page.data.users); });
  
  </script>
  
  <Layout>
    <!-- Navigation content for the 'navigation' slot -->
    <span slot="navigation">
      <Users />
  
    </span>
  
    <slot />
  </Layout>
  
