<script lang="ts">
  import { page } from '$app/stores';
  import { users, current_user } from '$lib/stores/data/+users';
  import { onMount, onDestroy } from 'svelte';
  import { pb } from '$lib/config/pocketbase';
  import type { Image } from '$lib/types';
  import { images } from '$lib/stores/data/+images';

  onMount(() => {
    users.set($page.data.users);
    current_user.set($page.data.user);
    
    images.set($page.data.images);

    pb.collection('images').subscribe('*', (e) => { 
      console.log(`Action: ${e.action}`, e.record);
      
      if (e.action === 'create') {
        images.update((currentImages) => [...currentImages, e.record as unknown as Image]);
        console.log('Image uploaded successfully:', e.record);
      } else if (e.action === 'update') {
        images.update((currentImages) =>
          currentImages.map((image) => image.id === e.record.id ? e.record as unknown as Image : image)
        );
        console.log('Image updated successfully:', e.record);
      } else if (e.action === 'delete') {
        images.update((currentImages) =>
          currentImages.filter((image) => image.id !== e.record.id)
        );
        console.log('Image deleted successfully:', e.record);
      }
    }, { expand: 'activity,notes' });
  });

  onDestroy(() => {
    pb.collection('images').unsubscribe('*');
  });

</script>


  <slot />

