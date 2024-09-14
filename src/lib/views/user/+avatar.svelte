
<script lang="ts">
      import Text from "$lib/components/display/+text.svelte";
      import { TextType } from "$lib/types";
    import { page } from '$app/stores';
    import { get } from 'svelte/store';
    import ImageComponent from '$lib/components/display/+image.svelte';
    import type { User } from '$lib/types';
    export let userId: string;

    // Get the user data from the page store
    const users = $page.data.users;
    const user = users.find((u: User) => u.id === userId);

    // Check if user avatar exists
    const hasAvatar = user && user.avatar;
    const avatarUrl = hasAvatar ? `${import.meta.env.POCKETBASE_URL}/api/files/users/${user.id}/${user.avatar}` : '';

    // Function to get user initials
    const getUserInitials = (user: User) => {
        if (!user) return '';
        const initials = `${user.first_name[0]}${user.last_name[0]}`;
        return initials.toUpperCase();
    };

    const userInitials = getUserInitials(user);
</script>

<div class="avatar-wrapper border-highlight">
    {#if hasAvatar}
        <ImageComponent image_url={avatarUrl} alt_text="User Avatar" width="2.25em" height="2.25em" style="border-radius: 50%;" />
    {:else}
        <Text class="initials" type={TextType.Subheadline}>{userInitials}</Text>
    {/if}
</div>

<style>
  .avatar-wrapper {
    display: inline-block;
    width: 44px;
    height: 44px;
    padding: 2px;
    border-radius: 50%;
    background-color: white;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  :global(.initials) {
    font-weight: 750;
  }
</style>
