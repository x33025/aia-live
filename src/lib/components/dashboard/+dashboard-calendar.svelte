<script lang="ts">
    import { selectedDay, year, month } from '$lib/stores/util/+calendar';
    import { get } from 'svelte/store';
    import Calendar from './+calendar.svelte';
    import Stack from '$lib/core/layout/+stack.svelte';
    import Text from '$lib/core/display/+text.svelte';
    import Spacer from '$lib/core/layout/+spacer.svelte';
    import { TextType, Direction } from '$lib/types';

</script>

<div class="stack expand" style="--direction: column;" >
    <Text type={TextType.Title}>Calendar</Text>
    <Text type={TextType.Body} style="font-weight: bold;">{$selectedDay.toDateString()}</Text>
    <Calendar/>
    <div class="spacer" />
</div>