<script lang="ts">
  export let promise: Promise<any>;

  let status = 'loading';
  let result: any = null;
  let error: any = null;

  $: if (promise) {
    status = 'loading';
    promise
      .then(res => {
        result = res;
        status = 'success';
      })
      .catch(err => {
        error = err;
        status = 'error';
      });
  }
</script>

{#if status === 'loading'}
  <div class="spinner">Loading...</div>
{:else if status === 'success'}
  <div class="success">Success: {result}</div>
{:else if status === 'error'}
  <div class="error">Error: {error.message}</div>
{/if}

<style>
  .spinner {
    /* Add your spinner styles here */
  }
  .success {
    /* Add your success styles here */
  }
  .error {
    /* Add your error styles here */
  }
</style>
