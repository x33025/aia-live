<script lang="ts">
    import Spacer from '$lib/components/layout/+spacer.svelte';
    import Stack from '$lib/components/layout/+stack.svelte';
    import { Direction } from '$lib/types';
    import { onMount } from 'svelte';
    import Text from '$lib/components/display/+text.svelte';
    import { TextType } from '$lib/types';
    import MonthCalendar from '$lib/views/dashboard/+month.svelte';

    let selectedDay: Date = new Date();
    let currentMonth = selectedDay.getMonth();
    let currentYear = selectedDay.getFullYear();
    let formattedDate = formatDate(selectedDay);

    let data: { [key: string]: string } = {
      '2023-10-01': 'red',
      '2023-10-15': 'blue',
      '2023-10-20': 'green'
    };

    function formatDate(date: Date): string {
      const options: Intl.DateTimeFormatOptions = {
        weekday: 'short',
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      };
      return date.toLocaleDateString('en-US', options);
    }

    function selectDay(day: Date) {
      selectedDay = day;
      formattedDate = formatDate(selectedDay);
    }
</script>

<Stack direction={Direction.Vertical} spacing={0.5}>
    <Text type={TextType.Title}>Calendar</Text>
    <Text type={TextType.Body} style="font-weight: bold;">{formattedDate}</Text>
    
    <MonthCalendar
      {selectedDay}
      {currentMonth}
      {currentYear}
      {data}
      onDaySelect={selectDay}
    />
    
    <Spacer />
</Stack>
