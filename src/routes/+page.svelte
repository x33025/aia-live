<script lang="ts">
  import InteractiveText from '$lib/views/login/+interactive-text.svelte';
  import ZStack from '$lib/components/layout/+z-stack.svelte';
  import AlignedItem from '$lib/components/layout/+aligned-item.svelte';
  import { HorizontalAlignment, VerticalAlignment } from '$lib/types';
</script>

<ZStack spacing={0}>
  <AlignedItem alignment={{ horizontal: HorizontalAlignment.Trailing, vertical: VerticalAlignment.Top }}>
    <a href="/login" class="login">Login</a>
  </AlignedItem>
  <AlignedItem alignment={{ horizontal: HorizontalAlignment.Center, vertical: VerticalAlignment.Center }}>
    <InteractiveText text="aia" />
  </AlignedItem>
</ZStack>

<style>
  .login {
    position: absolute;
    top: 0;
    right: 0;
    z-index: 1;
    font-weight: 700;
    font-size: 1.25em;
    text-decoration: none;
    color: rgb(10, 10, 10);
  }
</style>
