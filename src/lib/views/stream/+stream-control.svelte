<script lang="ts">
    let isStreaming: boolean = false;
  
    function toggleStream() {
      isStreaming = !isStreaming;
    }
  </script>
  
  <style>
    button {
      padding: 10px 20px;
      font-size: 16px;
      cursor: pointer;
    }
  </style>
  
  <div>
    <button on:click={toggleStream}>
      {isStreaming ? 'Pause' : 'Start'}
    </button>
  </div>
  