<script lang="ts">
  export let selectedDay: Date = new Date(); 
  export let onDaySelect: (day: Date) => void = () => {};

  let currentYear: number;
  let currentMonth: number;
  let daysInMonth: Date[] = [];

  $: {
      currentYear = selectedDay.getFullYear();
      currentMonth = selectedDay.getMonth();
      generateCalendarDays();
  }

  function generateCalendarDays() {
      daysInMonth = [];
      const totalDaysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

      for (let i = 1; i <= totalDaysInMonth; i++) {
          daysInMonth.push(new Date(currentYear, currentMonth, i));
      }
  }

  function selectDay(day: Date) {
      selectedDay = day; // Update the selected day
      onDaySelect(day);
  }

  function isSelected(day: Date) {
      return day.getDate() === selectedDay.getDate() &&
          day.getMonth() === selectedDay.getMonth() &&
          day.getFullYear() === selectedDay.getFullYear() &&
          day.getMonth() === currentMonth && // Ensure the day is in the current month
          day.getFullYear() === currentYear; // Ensure the day is in the current year
  }

  function isToday(day: Date) {
      const today = new Date();
      return day.getDate() === today.getDate() &&
          day.getMonth() === today.getMonth() &&
          day.getFullYear() === today.getFullYear();
  }

  function getDayClass(day: Date) {
      let classes = ['day'];
      if (isToday(day)) classes.push('today');
      if (isSelected(day)) classes.push('selected');
      return classes.join(' ');
  }
</script>

<style>
  .calendar-grid {
      display: grid;
      grid-template-columns: repeat(7, 2.5em);
      gap: 5px;
  }

  .day {
      width: 2.5em;
      height: 2.5em;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      transition: background-color 0.3s ease;
      border-radius: 50%; /* Ensure border-radius is applied to all days */
  }

  .day.today {
      background-color: var(--red);
      color: white;
  }

  .day.selected {
      background-color: var(--blue);
      color: white;
  }
</style>

<div class="calendar-grid">
  {#each daysInMonth as day (day.toISOString())}
      <div class={getDayClass(day)} on:click={() => selectDay(day)}>
          {day.getDate()}
      </div>
  {/each}
</div>
