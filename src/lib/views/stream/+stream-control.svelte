<script lang="ts">
    let isStreaming: boolean = false;
    let elapsedTime: number = 0;
    let intervalId: NodeJS.Timeout | null = null;
  
    function toggleStream(): void {
      isStreaming = !isStreaming;
      
      if (isStreaming) {
        startTimer();
      } else {
        stopTimer();
      }
    }
  
    function startTimer(): void {
      elapsedTime = 0; // Reset timer when stream starts
      intervalId = setInterval(() => {
        elapsedTime += 1; // Increment by 1 second
      }, 1000);
    }
  
    function stopTimer(): void {
      if (intervalId) {
        clearInterval(intervalId); // Clear the interval when the stream is paused
        intervalId = null;
      }
    }
  </script>
  
  <style>
    .timer-view {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 10px;
    }
  
    .timer-display {
      font-size: 24px;
      font-weight: bold;
    }
  
    button {
      padding: 10px 20px;
      font-size: 16px;
      cursor: pointer;
    }
  </style>
  
  <div class="timer-view">
    <div class="timer-display">{elapsedTime} seconds</div>
    <button on:click={toggleStream}>
      {isStreaming ? 'Pause' : 'Start'}
    </button>
  </div>
  