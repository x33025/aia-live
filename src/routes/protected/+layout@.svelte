<script lang="ts">
    import { page } from '$app/stores';
    import MainLayout from '$lib/components/layout/+main-layout.svelte';
    import { onMount } from 'svelte';
    import { users } from '$lib/stores/+users';
    import Users from '$lib/views/user/+users.svelte';

  
    onMount(() => { users.set($page.data.users); });
  
  </script>
  
  <MainLayout>
    <!-- Navigation content for the 'navigation' slot -->
    <span slot="navigation">
      <Users />
  
    </span>
  
    <slot />
  </MainLayout>
  
