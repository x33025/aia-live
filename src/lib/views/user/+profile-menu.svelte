<script lang="ts">
    import { page } from '$app/stores';
    import { pb } from '$lib/config/pocketbase';
    import ImageComponent from "$lib/components/display/+image.svelte"; // Import the new image component
  
    // Construct the avatar URL immediately since we have the user available
    let avatarUrl = `http://localhost:8090/api/files/users/${$page.data.user.id}/${$page.data.user.avatar}`;
  
    function logout() {
        pb.authStore.clear(); // Clear PocketBase authentication
        window.location.href = '/login'; // Redirect to login page
    }
  </script>
  
  <style>
      /* Add your custom styles */
      .dropdown {
          position: relative;
          display: inline-block;
          /* Ensure the content is centered */
          display: flex;
          justify-content: center;
          align-items: center;
      }
  
      .dropdown-content {
          display: none;
          position: absolute;
          background-color: white;
          min-width: 160px;
          box-shadow: 0px 8px 16px rgba(0,0,0,0.2);
          z-index: 1;
      }
  
      .dropdown:hover .dropdown-content {
          display: block;
      }
  
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
  
  <div class="dropdown">
      <!-- Add a wrapper to simulate the white inner border -->
      <div class="avatar-wrapper border-highlight">
          <!-- Use the new +image.svelte component for the avatar -->
          <ImageComponent image_url={avatarUrl} alt_text="User Avatar" width="2.25em" height="2.25em" style="border-radius: 50%;" />
      </div>
  
      <div class="dropdown-content">
          <!-- Dropdown menu -->
          <a href="/profile">Profile</a>
          <button on:click={logout}>Log out</button>
      </div>
  </div>
  