<script lang="ts">
    import { selectedDay, year, month } from '$lib/stores/ui/+calendar';
    import { get } from 'svelte/store';
    import Calendar from './+calendar.svelte';

    import Text from '$lib/core/display/+text.svelte';

    import { TextType, Direction } from '$lib/types';

</script>

<div class="stack expand" style="--direction: column;" >
    <Text type={TextType.Title}>Calendar</Text>
    <Text type={TextType.Body} style="font-weight: bold;">{$selectedDay.toDateString()}</Text>
    <Calendar/>
    <div class="spacer" />
</div>