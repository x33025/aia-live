<script lang="ts">
    import { page } from '$app/stores';
    import { pb } from '$lib/config/pocketbase';
    import DropdownMenu from "$lib/core/actions/+dropdown-menu.svelte"; 
    import Avatar from './+avatar.svelte';


    
    function logout() {
        pb.authStore.clear(); // Clear PocketBase authentication
        window.location.href = '/login'; // Redirect to login page
    }
</script>

<DropdownMenu id="profile-menu" placeholder="Menu">
    <svelte:fragment slot="button">
       <Avatar size={2.3} userId={$page.data.user.id} />
    </svelte:fragment>
    <div class="stack" style="padding: 0.5em;">
        <!-- <a href="/profile">Profile</a> -->
        <button on:click={logout}>Log out</button>

    </div>
   
</DropdownMenu>