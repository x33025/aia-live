<script lang="ts">
    import { selectedDay, year, month } from '$lib/stores/util/+calendar';
    import { onMount } from 'svelte';
    import { get } from 'svelte/store';
    import Month from './+month.svelte';

    let currentYear: number;
    let currentMonth: number;

    onMount(() => {
        const initialDay = get(selectedDay);
        currentYear = initialDay.getFullYear();
        currentMonth = initialDay.getMonth();
    });

    function onDaySelect(day: Date) {
        selectedDay.set(day);
        year.set(day.getFullYear());
        month.set(day.getMonth() + 1);
    }

    function getMonthOffset(year: number, month: number, offset: number) {
        const newMonth = month + offset;
        let newYear = year;
        if (newMonth > 11) {
            newYear += 1;
            return new Date(newYear, 0, 1);
        } else if (newMonth < 0) {
            newYear -= 1;
            return new Date(newYear, 11, 1);
        }
        return new Date(newYear, newMonth, 1);
    }

    function goToPreviousMonth() {
        currentMonth -= 1;
        if (currentMonth < 0) {
            currentMonth = 11;
            currentYear -= 1;
        }
    }

    function goToNextMonth() {
        currentMonth += 1;
        if (currentMonth > 11) {
            currentMonth = 0;
            currentYear += 1;
        }
    }
</script>

<style>
    .calendar-view {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: flex-start;
        gap: 1rem;
    }

    .month-container {
        width: 30%;
        cursor: pointer;
    }

    @media (max-width: 768px) {
        .calendar-view {
            flex-direction: column;
        }

        .month-container {
            width: 100%;
        }
    }
</style>

<div class="calendar-view">
    <div class="month-container" on:click={goToPreviousMonth}>
        {getMonthOffset(currentYear, currentMonth, -1)} 
    </div>

    <div class="month-container">
        <Month selectedDay={new Date(currentYear, currentMonth)} onDaySelect={onDaySelect} />
    </div>

    <div class="month-container" on:click={goToNextMonth}>
        {getMonthOffset(currentYear, currentMonth, 1)} 
    </div>

</div>
