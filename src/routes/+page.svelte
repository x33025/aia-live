<script lang="ts">
  import { goto } from '$app/navigation';
  import InteractiveText from '$lib/views/login/+interactive-text.svelte';
  import ZStack from '$lib/components/layout/+z-stack.svelte';
  import AlignedItem from '$lib/components/layout/+aligned-item.svelte';
  import Button from '$lib/components/layout/+button.svelte';
  import { HorizontalAlignment, VerticalAlignment } from '$lib/types';

  function handleLoginClick() {
    console.log('Login button clicked');
    goto('/login');
  }
</script>

<ZStack>
  <InteractiveText text="aia" />
  <AlignedItem alignment={{ horizontal: HorizontalAlignment.Trailing, vertical: VerticalAlignment.Top }}>
    <Button className="login-button" on:click={handleLoginClick}>
      Login
    </Button>
  </AlignedItem>
 

</ZStack>


