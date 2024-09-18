<script lang="ts">
    import { selectedDay, year, month } from '$lib/stores/util/+calendar';
    import { get } from 'svelte/store';
    import Calendar from './+calendar.svelte';
    import Stack from '$lib/components/layout/+stack.svelte';
    import Text from '$lib/components/display/+text.svelte';
    import Spacer from '$lib/components/layout/+spacer.svelte';
    import { TextType, Direction } from '$lib/types';

</script>

<Stack direction={Direction.Vertical} spacing={0.5}>
    <Text type={TextType.Title}>Calendar</Text>
    <Text type={TextType.Body} style="font-weight: bold;">{$selectedDay.toDateString()}</Text>
    <Calendar/>
    <Spacer />
</Stack>
