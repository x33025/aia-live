<script>

    import MainLayout from "$lib/components/layout/+main-layout.svelte";
    import Spacer from "$lib/components/layout/+spacer.svelte";
    import Stack from "$lib/components/layout/+stack.svelte";
    import { Direction } from "$lib/types";
    import StreamControl from "$lib/views/stream/+stream-control.svelte";

</script>


<MainLayout>
<Stack direction={Direction.Horizontal} wrap={true} slot="navigation">
<StreamControl />

</Stack>

  <slot />
</MainLayout>

  