<script lang="ts">
    import { selectedDay, year, month } from '$lib/stores/ui/+calendar';
    import { get } from 'svelte/store';
    import Calendar from './+calendar.svelte';



</script>

<div class="stack expand" style="--direction: column; --align: flex-start; --justify: flex-start;" >
    <p class="title">Calendar</p>
    <p class="body" style="font-weight: bold;">{$selectedDay.toDateString()}</p>
    <Calendar/>

</div>