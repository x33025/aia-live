<script lang="ts">
  import Text from "$lib/core/display/+text.svelte";
  import { TextType } from "$lib/types";
  import { page } from '$app/stores';
  import ImageComponent from '$lib/core/display/+image.svelte';
  import type { User } from '$lib/types';
  import CircularText from '$lib/core/display/+circular-text.svelte';

  export let userId: string;
  export let size: number = 2.5; // Default size in em

  // Get the user data from the page store
  const users = $page.data.users;
  const user = users.find((u: User) => u.id === userId);

  // Check if user avatar exists
  const hasAvatar = user && user.avatar;
  const avatarUrl = hasAvatar ? `${import.meta.env.VITE_POCKETBASE_URL}/api/files/users/${user.id}/${user.avatar}` : '';

  // Function to get user initials
  const getUserInitials = (user: User) => {
      if (!user) return '';
      const initials = `${user.first_name[0]}${user.last_name[0]}`;
      return initials.toUpperCase();
  };

  const userInitials = getUserInitials(user);
</script>

<div class="avatar-wrapper border-highlight" style="width: {size+0.5}em; height: {size+0.5}em;">
  <CircularText >
  {#if hasAvatar}
      <ImageComponent image_url={avatarUrl} alt_text="User Avatar" size={size} aspect_ratio={1} maskShape="circle" />
  {:else}
      <Text style="font-weight: 650;" type={TextType.Callout}>{userInitials}</Text>
  {/if}
</CircularText>
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


</style>
