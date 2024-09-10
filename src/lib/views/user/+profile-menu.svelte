<script lang="ts">
    import { page } from '$app/stores';
    import { pb } from '$lib/config/pocketbase';
    import ImageComponent from "$lib/components/display/+image.svelte"; // Import the new image component
    import DropdownMenu from "$lib/components/actions/+dropdown-menu.svelte"; // Import the DropdownMenu component
    import Stack from '$lib/components/layout/+stack.svelte';
    import { wrap } from 'lodash-es';
  
    // Construct the avatar URL immediately since we have the user available
    let avatarUrl = `http://localhost:8090/api/files/users/${$page.data.user.id}/${$page.data.user.avatar}`;
  
    function logout() {
        pb.authStore.clear(); // Clear PocketBase authentication
        window.location.href = '/login'; // Redirect to login page
    }
</script>

<style>
    /* Add your custom styles */
    .avatar-wrapper {
        display: inline-block;
        width: 44px;
        height: 44px;
        padding: 2px; /* Space for the white border */
        border-radius: 50%;
        background-color: white; /* White border color */
        display: flex;
        justify-content: center;
        align-items: center;
        box-shadow: 0 0 4px rgba(0, 0, 0, 0.1);
    }
</style>

<DropdownMenu id="profile-menu" placeholder="Menu">
    <div slot="button" class="avatar-wrapper border-highlight">
        <!-- Use the new +image.svelte component for the avatar -->
        <ImageComponent image_url={avatarUrl} alt_text="User Avatar" width="2.25em" height="2.25em" style="border-radius: 50%;" />
    </div>
    <Stack wrap={true} spacing={0.5} style="padding: 0.5em;">
        <!-- <a href="/profile">Profile</a> -->
        <button on:click={logout}>Log out</button>

    </Stack>
   
</DropdownMenu>