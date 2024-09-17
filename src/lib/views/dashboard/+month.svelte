<script lang="ts">
    export let selectedDay: Date = new Date();
    export let currentMonth: number = selectedDay.getMonth();
    export let currentYear: number = selectedDay.getFullYear();
    export let data: { [key: string]: string } = {};
    export let onDaySelect: (day: Date) => void = () => {};

    let daysInMonth: (Date | null)[] = [];
    let dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    let today = new Date();

    // Generate days in month on component mount
    $: generateDaysInMonth(currentYear, currentMonth);

    function generateDaysInMonth(year: number, month: number) {
      daysInMonth = [];
      let date = new Date(year, month, 1);
      let firstDayOfWeek = date.getDay();

      // Add nulls for days before the first day of the month
      for (let i = 0; i < firstDayOfWeek; i++) {
        daysInMonth.push(null);
      }

      // Fill days of the current month
      while (date.getMonth() === month) {
        daysInMonth.push(new Date(date));
        date.setDate(date.getDate() + 1);
      }
    }

    function getDayColor(date: Date) {
      let dateString = date.toISOString().split('T')[0];

      // If today, return red
      if (isToday(date)) {
        return 'var(--red)';
      }

      // Return color from data, or transparent by default
      return data[dateString] || 'transparent';
    }

    function isWeekend(date: Date) {
      let dayOfWeek = date.getDay();
      return dayOfWeek === 0 || dayOfWeek === 6; // Sunday or Saturday
    }

    function selectDay(day: Date) {
      onDaySelect(day);
    }

    function isToday(date: Date) {
      const today = new Date();
      return (
        date.getDate() === today.getDate() &&
        date.getMonth() === today.getMonth() &&
        date.getFullYear() === today.getFullYear()
      );
    }
</script>

<style>
  .calendar {
    display: grid;
    grid-template-columns: repeat(7, 2.5em);
    gap: 5px;
  }
  .day-name,
  .day {
    width: 2em;
    height: 2em;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
  }
  .day-name {
    font-weight: bold;
    border-bottom: 1px solid #ccc;
  }
  .day {
    transition: background-color 0.3s ease;
  }
  .day.empty {
    border: none;
    background-color: transparent;
    cursor: default;
  }
  .day.weekend {
    background-color: #f0f0f0;
  }
  .day.selected {
    border: none;
    background-color: var(--blue);
    color: white;
    border-radius: 50%;  /* Circular shape */
    width: 2em;
    height: 2em;
    line-height: 2.5em;
    text-align: center;
  }
  .day.today {
    background-color: var(--red);
    color: white;
    border-radius: 50%;
  }
</style>

<div class="calendar">
  <!-- Render day names -->
  {#each dayNames as dayName}
    <div class="day-name">{dayName}</div>
  {/each}

  <!-- Render days in the month -->
  {#each daysInMonth as day}
    {#if day}
      <div
        class="day {isWeekend(day) ? 'weekend' : ''} {day.getTime() === selectedDay.getTime() ? 'selected' : ''} {isToday(day) ? 'today' : ''}"
        style="background-color: {getDayColor(day)}"
        on:click={() => selectDay(day)}
      >
        {day.getDate()}
      </div>
    {:else}
      <!-- Empty day slots -->
      <div class="day empty"></div>
    {/if}
  {/each}
</div>
