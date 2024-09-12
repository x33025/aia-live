<script lang="ts">
  import { page } from '$app/stores';
  import MainLayout from '$lib/components/layout/+main-layout.svelte';
  import { onMount } from 'svelte';
  import { users } from '$lib/stores/+users';
  import Users from '$lib/views/user/+users.svelte';
    import { derived } from 'svelte/store';
    import ProfileMenu from '$lib/views/user/+profile-menu.svelte';
    import Stack from '$lib/components/layout/+stack.svelte';
    import { Direction } from '$lib/types';


  // Set users on mount
  onMount(() => {
    users.set($page.data.users);
  });

</script>

<MainLayout>


  <svelte:fragment slot="navigation-trailing" >
<Stack direction={Direction.Horizontal} wrap={true} spacing={1}>

  <Users />
  <ProfileMenu  />
</Stack>
  
  
</svelte:fragment>

  <!-- Render the main content -->
  <slot />


</MainLayout>
