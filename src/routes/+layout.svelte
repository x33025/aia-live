<script lang="ts">
  import '../global.css';

</script>

<main>
  
  <slot />
</main>




<style>
  main {
    height: 100%;
    width: 100%;
    padding: 1em;
    background-color: var(--gray-1);
    display: flex;
    flex-direction: column;
    align-items: stretch;
  }
</style>