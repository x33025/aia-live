<script lang="ts">
  import { pb } from '$lib/config/pocketbase';
  import type { Article, Image, Keyword } from '$lib/types';
  import { articles } from '$lib/stores/data/+articles';
  import { keywords } from '$lib/stores/data/+keywords';
  import { images } from '$lib/stores/data/+images';
  import { onMount, onDestroy } from 'svelte';
  import { users, current_user } from '$lib/stores/data/+users';
  import { page } from '$app/stores';
  import { countries } from '$lib/stores/data/+countries';
let intervalId: number;

// Function to update the last_active status
async function updateLastActive() {
  try {
    const response = await fetch('/api/data/update', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        collection: 'users',
        id: $current_user.id,
        data: { last_active: new Date().toISOString() }
      }),
    });

    if (!response.ok) {
      console.error('Failed to update last active status');
    }
  } catch (error) {
    console.error('Error updating last active status:', error);
  }
}

// Set users and update presence
onMount(() => {
  countries.set($page.data.countries);
  users.set($page.data.users);
  current_user.set($page.data.user);

  // Subscribe to real-time changes in the articles collection
  pb.collection('articles').subscribe('*', (e) => {
    if (e.action === 'create') {
      console.log('REALTIME CREATE', e.record);
      articles.update(currentArticles => [...currentArticles, e.record as unknown as Article]); // Add new article
    } else if (e.action === 'update') {
      console.log('REALTIME UPDATE', e.record);
      articles.update(currentArticles => currentArticles.map(article => article.id === e.record.id ? e.record as unknown as Article : article)); // Update existing article
    }
  }, { expand: 'keywords,activity,main_image,main_keyword,notes.activity' });

  // Subscribe to real-time changes in the keywords collection
  pb.collection('keywords').subscribe('*', (e) => {
    if (e.action === 'create') {
      console.log('REALTIME CREATE', e.record);
      keywords.update(currentKeywords => [...currentKeywords, e.record as unknown as Keyword]); // Add new keyword
    } else if (e.action === 'update') {
      console.log('REALTIME UPDATE', e.record);
      keywords.update(currentKeywords => currentKeywords.map(keyword => keyword.id === e.record.id ? e.record as unknown as Keyword : keyword)); // Update existing keyword
    }
  }, { expand: 'activity,notes.activity'});

  pb.collection('images').subscribe('*', (e) => { 
  
  if (e.action === 'create') {
    console.log('REALTIME CREATE', e.record);
    images.update((currentImages) => [...currentImages, e.record as unknown as Image]);
  } else if (e.action === 'update') {
    console.log('REALTIME UPDATE', e.record);
    images.update(currentImages => currentImages.map(image => image.id === e.record.id ? e.record as unknown as Image : image));
  } 
}, { expand: 'activity,notes.activity'});

  updateLastActive();

  intervalId = window.setInterval(() => {
    updateLastActive();
  }, 5 * 60 * 1000);  // 5 minutes
});

onDestroy(() => {
  clearInterval(intervalId);
  pb.collection('articles').unsubscribe('*');
  pb.collection('keywords').unsubscribe('*');
  pb.collection('images').unsubscribe('*');
});
</script>


<slot />