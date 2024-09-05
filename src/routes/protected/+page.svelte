<script lang="ts">
  import Stack from '$lib/components/layout/+stack.svelte';
  import { goto } from '$app/navigation';
  import Button from '$lib/components/actions/+button.svelte';
    import { Direction } from '$lib/types';

  
</script>



  <Stack direction={Direction.Horizontal} spacing={1}>
    <Stack spacing={0.5}>
      <Button class="label " on:click={() => goto('/protected/articles')}>Articles</Button>
      <Button class="label" on:click={() => goto('/protected/keywords')}>Keywords</Button>
      <Button class="label " on:click={() => goto('/protected/stream')}>Stream</Button>
    </Stack>

    <Stack spacing={0.5}>
      <Stack direction={Direction.Horizontal} spacing={0.5}>
        <Stack style="background-color: var(--gray-1); border-radius: 0.5em;">

        </Stack>
        <Stack style="background-color: var(--gray-1); border-radius: 0.5em;">

        </Stack>
      </Stack>

      <Stack style="background-color: var(--gray-1); border-radius: 0.5em;">

      </Stack>
    </Stack>
 
  </Stack>

