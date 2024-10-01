<script lang="ts">
    import { selectedDay, year, month } from '$lib/stores/ui/+calendar';
    import { onMount } from 'svelte';
    import { get } from 'svelte/store';
    import Month from './+month.svelte';
    import Text from '$lib/core/display/+text.svelte';
    import { TextType } from '$lib/types';

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

    function getMonthName(year: number, month: number) {
        return new Date(year, month).toLocaleString('default', { month: 'long' });
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

<div class="stack" style="--direction: row; --gap: 1em;">
    <div class="stack" style="--direction: row; --gap: 1em;">
        <Month selectedDay={new Date(currentYear, currentMonth)} onDaySelect={onDaySelect} />
    </div>

    <div class="stack" style="--direction: column; --gap: 2em;">
        <button on:click={goToPreviousMonth} style="color: var(--gray-6);">
            <Text type={TextType.Subheadline}>{getMonthName(currentYear, currentMonth - 1 < 0 ? 11 : currentMonth - 1)}</Text>
        </button>

        <Text type={TextType.Subheadline} style="position: relative; top: 0; left: 0;">
            {getMonthName(currentYear, currentMonth)}
        </Text>

        <button on:click={goToNextMonth} style="color: var(--gray-6);">
            <Text type={TextType.Subheadline}>{getMonthName(currentYear, currentMonth + 1 > 11 ? 0 : currentMonth + 1)}</Text>
        </button>
    </div>
</div>
