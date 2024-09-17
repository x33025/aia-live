<script lang="ts">
  import Spacer from '$lib/components/layout/+spacer.svelte';
import Stack from '$lib/components/layout/+stack.svelte';
    import { Direction } from '$lib/types';
import { onMount } from 'svelte';
import Text from '$lib/components/display/+text.svelte';
import { TextType } from '$lib/types';

  let currentMonth = new Date().getMonth();
  let currentYear = new Date().getFullYear();
  let daysInMonth: Date[] = [];
  let data: { [key: string]: string } = {
    '2023-10-01': 'red',
    '2023-10-15': 'blue',
    '2023-10-20': 'green'
  };

  onMount(() => {
    generateDaysInMonth(currentYear, currentMonth);
  });

  function generateDaysInMonth(year: number, month: number) {
    daysInMonth = [];
    let date = new Date(year, month, 1);
    while (date.getMonth() === month) {
      daysInMonth.push(new Date(date));
      date.setDate(date.getDate() + 1);
    }
  }

  function getDayColor(date: Date) {
    let dateString = date.toISOString().split('T')[0];
    return data[dateString] || 'transparent';
  }
</script>

<style>
  .calendar {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    gap: 5px;
  }
  .day {
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid #ccc;
  }
</style>

<Stack direction={Direction.Vertical} spacing={0.5}>

<Text type={TextType.Title} >Calendar</Text>
<Stack wrap={true} direction={Direction.Horizontal} spacing={0.5}>
<Stack wrap={true} spacing={0.5}>
<div class="calendar">
  {#each daysInMonth as day}
    <div class="day" style="background-color: {getDayColor(day)}">
      {day.getDate()}
    </div>
  {/each}
</div>
</Stack>

</Stack>
<Spacer />
</Stack>