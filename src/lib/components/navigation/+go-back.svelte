<script lang="ts">
    import { goto } from '$app/navigation';
    // Function to handle the go back action
    const goBack = () => {
      goto('/protected');
    }
  </script>
  

<button on:click={goBack}>Go Back</button>
