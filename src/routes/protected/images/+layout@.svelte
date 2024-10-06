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
  
      if (e.action === 'create') {
        console.log('REALTIME CREATE', e.record);
        images.update((currentImages) => [...currentImages, e.record as unknown as Image]);
      } else if (e.action === 'update') {
        console.log('REALTIME UPDATE', e.record);
        images.update(currentImages => currentImages.map(image => image.id === e.record.id ? e.record as unknown as Image : image));
      } 
    }, { expand: 'activity,notes.activity' });
  });

  onDestroy(() => {
    pb.collection('images').unsubscribe('*');
  });

</script>


  <slot />

