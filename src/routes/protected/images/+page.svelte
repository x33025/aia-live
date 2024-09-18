<script lang="ts">  
import Stack from '$lib/components/layout/+stack.svelte';
import { Direction } from '$lib/types';
import ImageChooser from '$lib/views/images/+image-chooser.svelte';
import { page } from '$app/stores';
import { derived } from 'svelte/store';

const title = derived(page, $page => $page.data.title);
</script>



<Stack direction={Direction.Vertical} spacing={1} style="padding: 2em;">
    <h1>{$title}</h1>
 <ImageChooser />
  
</Stack>