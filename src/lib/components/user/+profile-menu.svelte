<script lang="ts">
    import { page } from '$app/stores';
    import { pb } from '$lib/config/pocketbase';
    import ImageComponent from "$lib/core/display/+image.svelte"; // Import the new image component
    import DropdownMenu from "$lib/core/actions/+dropdown-menu.svelte"; // Import the DropdownMenu component
    import Stack from '$lib/core/layout/+stack.svelte';
    import Avatar from './+avatar.svelte';
    import { current_user } from '$lib/stores/data/+users';




    function logout() {
        pb.authStore.clear(); // Clear PocketBase authentication
        window.location.href = '/login'; // Redirect to login page
    }
</script>

<DropdownMenu id="profile-menu" placeholder="Menu">
    <svelte:fragment slot="button">
       <Avatar size={2.3} userId={$page.data.user.id} />
    </svelte:fragment>
    <Stack wrap={true} spacing={0.5} style="padding: 0.5em;">
        <!-- <a href="/profile">Profile</a> -->
        <button on:click={logout}>Log out</button>

    </Stack>
   
</DropdownMenu>