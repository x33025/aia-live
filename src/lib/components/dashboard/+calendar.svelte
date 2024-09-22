<script lang="ts">
    import { selectedDay, year, month } from '$lib/stores/util/+calendar';
    import { onMount } from 'svelte';
    import { get } from 'svelte/store';
    import Month from './+month.svelte';
    import Text from '$lib/core/display/+text.svelte';
    import { TextType } from '$lib/types';
    import Stack from '$lib/core/layout/+stack.svelte';
    import { Direction, Alignment } from '$lib/types'; 
    import Spacer from '$lib/core/layout/+spacer.svelte';

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


<Stack direction={Direction.Vertical} spacing={1} wrap={true}>
    <button  on:click={goToPreviousMonth}>
        <Text type={TextType.Subheadline}>{getMonthName(currentYear, currentMonth - 1 < 0 ? 11 : currentMonth - 1)}</Text>
  
    </button>
    <Stack direction={Direction.Horizontal}  spacing={1}>
   
        <Text type={TextType.Subheadline}>{getMonthName(currentYear, currentMonth)}</Text>
      
 

  
    <Month selectedDay={new Date(currentYear, currentMonth)} onDaySelect={onDaySelect} />
 


        
    </Stack>

    <button on:click={goToNextMonth}>
        <Text type={TextType.Subheadline}>{getMonthName(currentYear, currentMonth + 1 > 11 ? 0 : currentMonth + 1)}</Text>
        </button>


 
</Stack>