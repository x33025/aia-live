<script lang="ts">
  interface Form {
    email?: string;
    password?: string;
    error?: string;
  }

  let email = '';
  let password = '';
  let error = '';
  export let form: Form = {};
</script>

<style>
  .login-container {
    max-width: 400px;
    margin: 0 auto;
    padding: 1em;
    border: 1px solid var(--gray-1);
    border-radius: 2em;
    background-color: hsla(0, 0%, 100%, 0.4); /* Slightly transparent to see the blur effect */
    position: relative;
    z-index: 2;
  }
  .login-container h2 {
    text-align: center;
  }
  .login-container input {
    width: 100%;
    padding: 1em;
    border-radius: 1em;
    border: none;
    font-size: 1em;
    margin-top: 1em;
    border: 1px solid var(--gray-1);
  }
  .login-container input:focus {
    outline: none;
  }
  .login-container button {
    width: 100%;
    padding: 0.75em;
    margin-top: 1.5em;
    background-color: var(--blue);
    color: #fff;
    border: none;
    border-radius: 1em;
    cursor: pointer;
    font-size: 1em;
  }
  .login-container .error {
    margin-top: 1em;
    color: var(--red);
    text-align: center;
  }
  h2 {
    color: rgb(10, 10, 10);
  }
</style>

<svelte:head>
  <title>Login</title>
</svelte:head>

<div class="login-container">
  <h2>Login</h2>
  <form method="POST" action="?/login">
    <input type="email" id="email" name="email" bind:value={email} placeholder="Email" required />
    <input type="password" id="password" name="password" bind:value={password} placeholder="Password" required />
    {#if form?.error}
      <p class="error">{form.error}</p>
    {/if}
    <button type="submit">Login</button>
  </form>
</div>
