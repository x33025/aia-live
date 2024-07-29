<script>
  import InteractiveText from '$lib/views/login/+interactive-text.svelte';
</script>

<a href="/login" class="login">Login</a>
<InteractiveText text="aia" />

<style>
  .login {
      position: relative;
      top: 0; /* Adjust as needed */
      right: 0; /* Adjust as needed */
      z-index: 1;
      font-weight: 700;
      font-size: 1.25em;
      text-decoration: none; /* Remove strikethrough */
      color: rgb(10, 10, 10); /* Set the color to constant gray */
  }
</style>
