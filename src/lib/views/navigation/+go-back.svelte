<script lang="ts">
    
    // Function to handle the go back action
    const goBack = () => {
      history.back();
    }
  </script>
  

<button on:click={goBack}>Go Back</button>
