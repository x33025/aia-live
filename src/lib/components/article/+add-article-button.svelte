<script lang="ts">
  import PlusIcon from "$lib/core/ui/icons/+plus.svelte";
  import { articles } from "$lib/stores/data/+articles";
  import { current_user } from "$lib/stores/data/+users";

  async function createArticle() {
    console.log($current_user);
    try {
      const response = await fetch("/api/data/create/article", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ user_id: $current_user.id }),
      });

      // const newArticle = await response.json();
      // console.log(newArticle);
      // articles.update((articles) => [...articles, newArticle]);
    } catch (error) {
      console.error(error);
    }
  }
</script>

<button on:click={createArticle}>
  <PlusIcon color="var(--blue)" size={1} />
</button>