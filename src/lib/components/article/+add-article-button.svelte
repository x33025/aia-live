<script lang="ts">
  import PlusIcon from "$lib/core/ui/icons/+plus.svelte";
  function addArticle() {
    // Logic to add an article
    console.log("Article added!");
  }
</script>

<button on:click={addArticle}>
  <PlusIcon color="var(--blue)" size={1} />
</button>