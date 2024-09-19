<script lang="ts">
    import { selectedDay, year, month } from '$lib/stores/util/+calendar';
    import { onMount } from 'svelte';
    import { get } from 'svelte/store';
    import Month from './+month.svelte';

    let currentYear: number;
    let currentMonth: number;

    // Initialize currentYear and currentMonth based on selectedDay
    onMount(() => {
        currentYear = get(selectedDay).getFullYear();
        currentMonth = get(selectedDay).getMonth();
    });

    // Callback when a day is selected
    function onDaySelect(day: Date) {
        selectedDay.set(day);
        year.set(day.getFullYear());
        month.set(day.getMonth() + 1);
    }

    // Helper function to get the date for a given month offset
    function getMonthOffset(year: number, month: number, offset: number) {
        let newMonth = month + offset;
        let newYear = year;

        if (newMonth > 11) {
            newMonth = 0;
            newYear += 1;
        } else if (newMonth < 0) {
            newMonth = 11;
            newYear -= 1;
        }

        return new Date(newYear, newMonth, 1);
    }

    // Functions to handle switching between months
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
        flex-direction: row;
        justify-content: space-between;
        align-items: flex-start;
    }
  
    .calendar-header {
        display: flex;
        justify-content: space-between;
        width: 100%;
        margin-bottom: 1rem;
    }
  
    .month-year {
        font-weight: bold;
        font-size: 1.2em;
    }
  
    .month-container {
        width: 30%;
    }

    .month-container.clickable {
        cursor: pointer;
    }
</style>

<div class="calendar-view">
    <!-- Previous Month -->
    <div class="month-container clickable" on:click={goToPreviousMonth}>
        <Month selectedDay={getMonthOffset(currentYear, currentMonth, -1)} onDaySelect={onDaySelect} />
    </div>

    <!-- Current Month -->
    <div class="month-container clickable" on:click={goToPreviousMonth}>
        <Month selectedDay={new Date(currentYear, currentMonth)} onDaySelect={onDaySelect} />
    </div>

    <!-- Next Month (non-clickable) -->
    <div class="month-container">
        <Month selectedDay={getMonthOffset(currentYear, currentMonth, 1)} onDaySelect={onDaySelect} />
    </div>
</div>
