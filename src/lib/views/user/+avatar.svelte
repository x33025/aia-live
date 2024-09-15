<script lang="ts">
  import Text from "$lib/components/display/+text.svelte";
  import { TextType } from "$lib/types";
  import { page } from '$app/stores';
  import { get } from 'svelte/store';
  import ImageComponent from '$lib/components/display/+image.svelte';
  import type { User } from '$lib/types';

  export let userId: string;
  export let size: number = 2.5; // Default size in em

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

<div class="avatar-wrapper border-highlight" style="width: {size+0.5}em; height: {size+0.5}em;">
  {#if hasAvatar}
      <ImageComponent image_url={avatarUrl} alt_text="User Avatar" size={size} aspect_ratio={1} maskShape="circle" />
  {:else}
      <Text class="initials" type={TextType.Subheadline}>{userInitials}</Text>
  {/if}
</div>

<style>
.avatar-wrapper {
  display: inline-block;
  padding: 0.5em;
  border-radius: 50%;
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: center;
}

:global(.initials) {
  font-weight: 800;
}
</style>
