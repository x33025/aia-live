<script lang="ts">
    import { onMount } from 'svelte';
  
    export let selectedDay: Date = new Date(); // The currently selected day
    export let onDaySelect: (day: Date) => void = () => {}; // Callback when a day is selected
  
    let currentYear: number;
    let currentMonth: number;
    let daysInMonth: Date[] = [];
  
    // Initialize currentYear and currentMonth based on selectedDay
    onMount(() => {
      currentYear = selectedDay.getFullYear();
      currentMonth = selectedDay.getMonth();
      generateCalendarDays();
    });
  
    // Generate days whenever currentMonth or currentYear changes
    $: generateCalendarDays();
  
    function generateCalendarDays() {
      daysInMonth = [];
  
      // Get the total days in the current month
      let totalDaysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  
      // Add days from the current month
      for (let i = 1; i <= totalDaysInMonth; i++) {
        daysInMonth.push(new Date(currentYear, currentMonth, i));
      }
    }
  
    function selectDay(day: Date) {
      selectedDay = day;
      onDaySelect(day);
    }
  
    function isSelected(day: Date) {
      return (
        day.getDate() === selectedDay.getDate() &&
        day.getMonth() === selectedDay.getMonth() &&
        day.getFullYear() === selectedDay.getFullYear()
      );
    }
  
    function isToday(day: Date) {
      const today = new Date();
      return (
        day.getDate() === today.getDate() &&
        day.getMonth() === today.getMonth() &&
        day.getFullYear() === today.getFullYear()
      );
    }
  
    function getDayClass(day: Date) {
      let classes = ['day'];
      if (isToday(day)) {
        classes.push('today');
      }
      if (isSelected(day)) {
        classes.push('selected');
      }
      return classes.join(' ');
    }
  

  </script>
  
  <style>
    .calendar {
      display: flex;
      flex-direction: column;
      align-items: center;
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
  
    .calendar-grid {
      display: grid;
      grid-template-columns: repeat(7, 2.5em);
      gap: 5px;
      align-items: center;
      justify-items: center;
    }
  
    .day {
      width: 2.5em;
      height: 2.5em;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      transition: background-color 0.3s ease;
    }
  
    .day.today {
      background-color: #e74c3c;
      color: white;
      border-radius: 50%;
    }
  
    .day.selected {
      background-color: var(--blue);
      color: white;
      border-radius: 50%;
    }
  
  </style>
  
  <div class="calendar"> 
    <!-- Days -->
    <div class="calendar-grid">
      {#each daysInMonth as day}
        <div class={getDayClass(day)} on:click={() => selectDay(day)}>
          {day.getDate()}
        </div>
      {/each}
    </div>
  </div>
