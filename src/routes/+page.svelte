<script>
    import InteractiveText from '$lib/views/login/+interactive-text.svelte';
  </script>
  
  <InteractiveText text="aia" />
  
  <p class="login-container">
    <a href="/login" class="login">Login</a>
  </p>
  
  <style>
    .login-container {
      text-align: right; /* Align the link to the right */
      margin: 2em; /* Add some space around the link */
    }
  
    .login {
      position: relative;
      z-index: 1;
      font-weight: 600;
      font-size: 1.25em;
      text-decoration: none; /* Remove strikethrough */
      color: rgb(10, 10, 10); /* Set the color to constant gray */
    }
  </style>
  