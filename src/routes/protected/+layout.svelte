<script lang="ts">
    import Layout from '$lib/components/layout/+layout.svelte';
    import Users from '$lib/views/user/+users.svelte';
  
  </script>
  
  <Layout>
    <!-- Navigation content for the 'navigation' slot -->
    <span slot="navigation">
      <Users />
  
    </span>
  
    <slot />
  </Layout>
  
